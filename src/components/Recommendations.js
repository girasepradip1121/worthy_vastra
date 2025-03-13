import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import axios from "axios";

const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log("Fetching recommendations...");
        const response = await axios.get("/recommendations"); // Adjusted to use ProductAPI

        if (response.status === 200 && Array.isArray(response.data)) {
          console.log("API Response (Recommendations):", response.data);
          setProducts(response.data);
        } else {
          console.error("Unexpected API response format:", response);
          setError("Unexpected API response format. Please contact support.");
        }
      } catch (err) {
        console.error("Error fetching recommendations:", err.message);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <section className="py-6 w-full overflow-x-hidden">
  <div className="max-w-[90%] mx-auto">
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Recommendations</h2>

    {loading && (
      <div className="text-center py-4">
        <p className="text-gray-500 animate-pulse">Loading recommendations...</p>
      </div>
    )}

    {error && (
      <div className="text-center py-4">
        <p className="text-red-500">{error}</p>
      </div>
    )}

    {!loading && !error && products.length === 0 && (
      <div className="text-center py-4">
        <p className="text-gray-500">No recommendations available at the moment.</p>
      </div>
    )}

    {!loading && !error && products.length > 0 && (
      <ProductGrid products={products} className="w-full max-w-full overflow-hidden" />
    )}
  </div>
</section>

  );
};

export default Recommendations;
