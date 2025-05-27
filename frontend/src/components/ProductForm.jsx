import React, { useState } from "react";

const ProductForm = ({ onCreate }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(form);
    setForm({ name: "", description: "", price: "", stock: "", imageUrl: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Créer un produit</h2>
      <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required /><br />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} /><br />
      <input name="price" type="number" placeholder="Prix" value={form.price} onChange={handleChange} required /><br />
      <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} required /><br />
      <input name="imageUrl" placeholder="URL image" value={form.imageUrl} onChange={handleChange} /><br />
      <button type="submit">Créer</button>
    </form>
  );
};

export default ProductForm;
