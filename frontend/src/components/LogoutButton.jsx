// components/LogoutButton.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token JWT du localStorage
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    // Rediriger vers la page de login (ou accueil)
    navigate("/login");
  };

  const [user, setUser] = useState(null);
      useEffect(() => {
      // Récupération des infos utilisateur depuis localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } 
    }, []);

  return (
    <button
      onClick={handleLogout}
      className={`${user ? '' : 'hidden'} bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded`}
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;
