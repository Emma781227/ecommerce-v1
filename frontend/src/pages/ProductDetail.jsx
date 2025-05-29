// pages/ProductDetail.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/navbar";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } 

    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token"); // token JWT stocké après login

      const response = await axios.post(
        "http://localhost:3001/api/orders",
        {
          products: [
            {
              productId: product._id,
              quantity: 1,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Commande créée !");
      console.log(response.data);
    } catch (error) {
      console.error("Erreur lors de la commande :", error.response?.data || error.message);
    }
  };

  if (!product) return <div className="p-6">Chargement...</div>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-2xl mx-auto">
        <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover mb-4" />
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>
        <p className="text-lg mt-4 font-semibold">Prix : {product.price} €</p>
        <p className="text-sm text-gray-500">Stock : {product.stock}</p>

        <button
          onClick={handleAddToCart}
          className={`${user ? '' : 'hidden'} mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700`}
        >
          Acheter
        </button>
      </div>
    </>
  );
};

export default ProductDetail;
