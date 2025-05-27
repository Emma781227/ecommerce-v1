import React from "react";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

const ProductCreate = () => {
  const navigate = useNavigate();
  const token = "TON_TOKEN_ADMIN";

  const handleCreate = async (product) => {
    await createProduct(product, token);
    navigate("/products");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Créer un nouveau produit</h1>
      <ProductForm onCreate={handleCreate} />
    </div>
  );
};

export default ProductCreate;
