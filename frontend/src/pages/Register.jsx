import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow rounded bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>
      {message && <p className="mb-2 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Nom" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          S'inscrire
        </button>
      </form>
    </div>
  );
}
