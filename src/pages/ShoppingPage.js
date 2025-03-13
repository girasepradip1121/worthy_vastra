import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";
import "../CSS/Shop.css";
import HeroSection from "../components/HeroSection";
import axios from "axios";
import { API_URL, userToken } from "../components/Variable";

const ShoppingPage = () => {
const userData=userToken()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Roundneck Tshirt",
    "Polo Tshirt",
    "Oversized Tshirt",
    "Hoodies",
  ]);
  // const userData=localStorage.getItem('token')
  // const parseUserData=JSON.parse(userData)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 100, max: 5000 });
  const [sortOption, setSortOption] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handlePriceChange = (event) => {
    setPriceRange([100, Number(event.target.value)]);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/product/getall`); // Fetch products from backend
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleAddToCart = async (e, product) => {
    e.stopPropagation(); // Stop event from propagating
  
    try {
      const token =userData.token // Ensure user is logged in
      if (!token) {
        alert("Please login to add items to cart.");
        navigate("/login");
        return;
      }
  
      await axios.post(
        `${API_URL}/cart/add`,
        { productId: product.productId, quantity: 1 ,userId:userData.userId,size:'S'},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`${product.name} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };
  

  const filteredProducts = products
    .filter(
      (product) => !selectedCategory || product.category === selectedCategory
    )
    .filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "rating":
          return b.rating - a.rating;
        case "priceLowHigh":
          return a.price - b.price;
        case "priceHighLow":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(5000);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  const handleSliderChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === "min") {
      setMinPrice(Math.min(value, maxPrice - 1));
    } else {
      setMaxPrice(Math.max(value, minPrice + 1));
    }
  };

  // Calculate the position and width of the active track
  const minPercent = (minPrice / 10000) * 100;
  const maxPercent = (maxPrice / 10000) * 100;

  return (
    <>
      <HeroSection />
      <div className="ml-[5%] mr-[5%]">
        <div className="p-2 ml-5">
          <Link to="/">Home</Link> <span>/</span>
          <Link to="/shop/oversized-tshirts">Oversized T-Shirts</Link>{" "}
          <span>/</span>
          <span>Oversized Printed T-Shirts</span>
        </div>

        <div className="flex">
          <h2 className="text-[20px] md:text-[25px] font-[600]">
            Oversized Printed T-Shirts
          </h2>
          <h2 className="text-[14px] md:text-[16px] mt-1 md:mt-2 ml-2 text-black">
            (123 found)
          </h2>
        </div>

        <div>
          <main className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <aside className="md:w-1/4 p-4 border-r">
                <h2 className="text-xl font-bold mb-4">Filters</h2>

                {/* Categories */}
                <h3 className="font-semibold mb-2">Categories</h3>
                <ul className="mb-6">
                  {categories.map((category) => (
                    <li key={category} className="mb-2">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                        className="mr-2 appearance-none w-5 h-5 border border-gray-500 rounded cursor-pointer checked:bg-gray-500 checked:border-transparent"
                      />
                      {category}
                    </li>
                  ))}
                </ul>

                {/* Price Range */}
                <div className="price-range-slider1">
                  <h3>Price range</h3>
                  <div className="slider1-container">
                    <div className="slider1-track"></div>
                    <div
                      className="slider1-active"
                      style={{
                        left: `${minPercent}%`,
                        width: `${maxPercent - minPercent}%`,
                      }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={minPrice}
                      onChange={(e) => handleSliderChange(e, "min")}
                      className="slider1 slider1-min1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={maxPrice}
                      onChange={(e) => handleSliderChange(e, "max")}
                      className="slider1 slider1-max1"
                    />
                  </div>
                </div>

                <div className="price-inputs">
                  <div>
                    <label htmlFor="min-price">Min price</label>
                    <input
                      type="number"
                      id="min-price"
                      value={minPrice}
                      onChange={handleMinChange}
                      min="0"
                      max="10000"
                    />
                    <div className="sign">₹</div>
                  </div>
                  <div>
                    <label htmlFor="max-price">Max price</label>
                    <input
                      type="number"
                      id="max-price"
                      value={maxPrice}
                      onChange={handleMaxChange}
                      min="0"
                      max="10000"
                    />
                    <div className="sign">₹</div>
                  </div>
                </div>

                {/* Sort Order */}
                <h3 className="font-semibold mb-2">Sort Order</h3>
                <div>
                  {[
                    "Most Popular",
                    "Best Rating",
                    "Price Low - High",
                    "Price High - Low",
                  ].map((option) => (
                    <label key={option} className="block mb-2">
                      <input
                        type="radio"
                        name="sort"
                        value={option.toLowerCase()}
                        checked={sortOption === option.toLowerCase()}
                        onChange={() => handleSortChange(option.toLowerCase())}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </aside>

              {/* Product Grid */}
              <section className="w-3/4 p-4">
                {loading && <p>Loading products...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                  <ProductGrid
                    products={filteredProducts}
                    handleAddToCart={handleAddToCart}
                  />
                )}
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ShoppingPage;
