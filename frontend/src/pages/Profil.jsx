import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Récupération des infos utilisateur depuis localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
        navigate("/login"); // redirige si pas connecté
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3001/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.length === 0) {
          setError("Aucune commande trouvée.");
        } else {
          setOrders(response.data);
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement des commandes.");
      }
    };

    fetchOrders();
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Utilisateur non connecté.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="mt-24 max-w-md mx-auto p-6 border rounded shadow bg-white text-black">
        <h2 className="text-2xl font-bold mb-4">Profil</h2>
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role}</p>

        {error && <p className="text-red-500">{error}</p>}

        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded mb-4 shadow">
            <p><strong>Statut :</strong> {order.status}</p>
            <p><strong>Total :</strong> {order.total} €</p>
            <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <div className="mt-2">
              <strong>Produits :</strong>
              <ul className="list-disc pl-5">
                {order.products.map((item, i) => {
                  const product = item.product || item.productId;
                  return (
                    <li key={i}>
                      {product?.name ?? "Produit inconnu"} — {item.quantity} × {product?.price ?? "?"} €
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
