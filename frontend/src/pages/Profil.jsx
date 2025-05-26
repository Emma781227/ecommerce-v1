import { useEffect, useState } from "react";
import LogoutButton from "../components/LogoutButton";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Récupération des infos utilisateur depuis localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
        navigate("/login"); // redirige si pas connecté
    }
  }, []);

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Utilisateur non connecté.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white text-black">
      <LogoutButton />
      <h2 className="text-2xl font-bold mb-4">Profil</h2>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Rôle :</strong> {user.role}</p>
    </div>
  );
}
