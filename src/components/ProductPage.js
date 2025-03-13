import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/getall`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.description}</p>
          <div className="mt-4">
            <span className="text-2xl font-bold">₹{product.price}</span>
            {product.old_price && (
              <span className="ml-4 text-gray-500 line-through">
                ₹{product.old_price}
              </span>
            )}
          </div>
          <p className="mt-4 text-yellow-500">⭐ {product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
    