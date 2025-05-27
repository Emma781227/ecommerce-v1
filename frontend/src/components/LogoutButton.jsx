// components/LogoutButton.jsx

import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token JWT du localStorage
    localStorage.removeItem("token");

    // Rediriger vers la page de login (ou accueil)
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
    >
      Déconnexion
    </button>
  );
};

export default LogoutButton;
