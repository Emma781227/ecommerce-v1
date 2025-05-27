// pages/ProductsList.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow hover:shadow-lg">
          <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-2" />
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600">Prix : {product.price} €</p>
          <Link
            to={`/products/${product._id}`}
            className="mt-2 inline-block bg-black text-white px-4 py-2 rounded hover:bg-white"
          >
            Voir
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
