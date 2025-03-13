import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShoppingPage from "./pages/ShoppingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CustomPage from "./pages/CustomPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage"; // Import Profile Page
import AboutPage from "./pages/AboutPage"; // Import About Page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Test from "./pages/Test";
import Checkout from "./pages/Checkout"
import Pagecheckout from "./pages/Pagecheckout";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Page */}
        <Route path="/shop" element={<ShoppingPage />} /> {/* Shopping Page */}
        <Route path="/product/:productId" element={<ProductDetailsPage />} /> {/* Product Details Page */}
        <Route path="/custom" element={<CustomPage />} /> {/* Customization Page */}
        <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
        <Route path="/signup" element={<SignupPage />} /> {/* Signup Page */}
        <Route path="/cart" element={<CartPage />} /> {/* Cart Page */}
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page */}
        <Route path="/about" element={<AboutPage />} /> {/* About Page */}
        <Route path="/test" element={<Checkout/>}/>
        <Route path="/checkout" element={<Pagecheckout/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App; 
