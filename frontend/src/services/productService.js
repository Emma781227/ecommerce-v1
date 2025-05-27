const API_URL = "http://localhost:3001/api/products";

export const getAllProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProduct = async (product, token) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });
  return res.json();
};

export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};
