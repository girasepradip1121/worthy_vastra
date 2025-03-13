import React, { useEffect, useState } from "react";
import ProductGrid from "./ProductGrid";
import axios from "axios";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true); // Ensure loading state is set
        setError(null); // Reset error state

        // Fetch best sellers from the API
        const response = await axios.get("/best-sellers");
        setProducts(response.data); // Set fetched products
      } catch (err) {
        console.error("Error fetching best sellers:", err.message);
        setError("Failed to load best sellers. Please try again later.");
      } finally {
        setLoading(false); // Always disable loading state
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="py-10 ml-[5%] mr-[5%]">
      <div className="container mx-auto">
        <h2 className="text-[30px] font-[600] font-[Poppins] text-center mb-4">Best Sellers</h2>

        {loading && (
          <div className="text-center py-6">
            <p className="text-gray-500">Loading best sellers...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-6">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-6">
            <p className="text-gray-500">No best sellers available at the moment.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} />
        )}
      </div>
    </section>
  );
};

export default BestSellers;
