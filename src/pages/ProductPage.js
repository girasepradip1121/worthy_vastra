      import React, { useEffect, useState } from "react";
      import { useParams, useNavigate } from "react-router-dom";
      import Navbar from "../components/Navbar";
      import Footer from "../components/Footer";
      import axios from "../api/api";
      import Recommendations from "../components/Recommendations";

      const ProductPage = () => {
        const { id } = useParams(); // Get the product ID from URL params
        const [product, setProduct] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [quantity, setQuantity] = useState(1);
        const navigate = useNavigate(); // For navigating to cart or other pages

        // Fetch product details based on ID
        useEffect(() => {
          const fetchProduct = async () => {
            try {
              const response = await axios.get(`/products/${id}`); // API call to fetch product details
              setProduct(response.data);
            } catch (err) {
              console.error("Error fetching product:", err);
              setError("Failed to load product details. Please try again.");
            } finally {
              setLoading(false);
            }
          };

          fetchProduct();
        }, [id]);

        // Add product to cart logic
        const handleAddToCart = () => {
          const cartItem = { productId: product.id, quantity };
          // Simulate backend API call for adding to cart
          alert(`Added "${product.name}" (Quantity: ${quantity}) to the cart.`);
          console.log("Cart Item:", cartItem);
        };

        // Navigate to checkout page
        const handleBuyNow = () => {
          navigate("/checkout", { state: { productId: product.id, quantity } });
        };

        return (
          <div>
            <Navbar />
            <div className="container mx-auto py-10">
              {loading && <p className="text-center text-gray-500">Loading...</p>}
              {error && <p className="text-center text-red-500">{error}</p>}
              {!loading && !error && product && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Product Images */}
                    <div>
                      <div className="w-full">
                        <img
                          src={product.image_url || "/default-image.jpg"}
                          alt={product.name}
                          className="rounded-lg shadow-lg"
                        />
                      </div>
                      <div className="flex space-x-2 mt-4">
                        {product.additional_images?.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div>
                      <h1 className="text-3xl font-bold">{product.name}</h1>
                      <p className="mt-4 text-gray-700">{product.description}</p>
                      <div className="flex items-center mt-6">
                        <span className="text-2xl font-bold text-green-600">
                          ₹{product.price}
                        </span>
                        {product.old_price && (
                          <span className="ml-4 text-gray-500 line-through">
                            ₹{product.old_price}
                          </span>
                        )}
                      </div>

                      {/* Size Options */}
                      <div className="mt-6">
                        <h3 className="font-bold mb-2">Size:</h3>
                        <div className="flex space-x-4">
                          {product.sizes?.map((size) => (
                            <button
                              key={size}
                              className="px-4 py-2 border rounded hover:bg-gray-200"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mt-6">
                        <h3 className="font-bold mb-2">Quantity:</h3>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() =>
                              setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
                            }
                            className="px-4 py-2 border rounded hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-4">{quantity}</span>
                          <button
                            onClick={() => setQuantity((prev) => prev + 1)}
                            className="px-4 py-2 border rounded hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Actions: Add to Cart and Buy Now */}
                      <div className="mt-6 flex space-x-4">
                        <button
                          onClick={handleAddToCart}
                          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={handleBuyNow}
                          className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Product Details */}
                  <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                    <p>
                      <strong>Fabric + Care:</strong> {product.fabric || "N/A"}
                    </p>
                    <p>
                      <strong>Sale Performance:</strong> {product.sales || "N/A"}
                    </p>
                    <p>
                      <strong>Keywords:</strong>{" "}
                      {product.keywords?.join(", ") || "N/A"}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
                    <Recommendations />
                  </div>
                </div>
              )}
            </div>
            <Footer />
          </div>
        );
      };

      export default ProductPage;
