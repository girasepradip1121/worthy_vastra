import axios from "axios";
import { FileAxis3dIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { API_URL, userToken } from "../components/Variable";  
import {useNavigate} from 'react-router-dom'
const CartPage = () => {
  const userData = userToken();
  const userId = userData.userId;
  const token=userData.token

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate=useNavigate();

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true); // Start loading
        const token = userData.token;
        console.log("token", token);
        if (!token) {
          setError("Please log in to view your cart.");
          setLoading(false);
          // return;
        }
        const response = await axios.get(`${API_URL}/cart/getAll/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCartItems(response.data);
        console.log("response", response.data);

        calculateTotalPrice(response.data);
        setLoading(false); // Stop loading
      } catch (error) {
        setError("Failed to fetch cart items. Please log in again.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  // Calculate total price
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,0);
    setTotalPrice(total);
  };

  // Handle quantity update
  const handleUpdateQuantity = async (cartId, quantity) => {
    if (quantity < 1) return handleRemoveItem(cartId); // Remove item if quantity < 1

    try {
        if (!token) {
            alert("Please log in to update the cart.");
            return;
        }

        await axios.put(`${API_URL}/cart/update/${cartId}`, 
            { quantity },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        const updatedItems = cartItems.map((item) =>
            item.cartId === cartId ? { ...item, quantity } : item
        );
        setCartItems(updatedItems);
        calculateTotalPrice(updatedItems);
    } catch (error) {
        setError("Failed to update quantity. Please try again.");
    }
};

  // Handle item removal
  const handleRemoveItem = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to remove items from the cart.");
        return;
      }

      await axios.delete(`${API_URL}/cart/remove/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedItems = cartItems.filter((item) => item.id !== cartId);
      setCartItems(updatedItems);
      calculateTotalPrice(updatedItems);
    } catch (error) {
      setError("Failed to remove item. Please try again.");
    }
  };

  // Handle checkout (placeholder)
  const handleCheckout = () => {
    navigate('/checkout',{state:{cartItems,totalPrice}})
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="divide-y divide-gray-300">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="py-4 flex justify-between items-center"
              >
                <div className="flex items-center">
                  <img
                    src={`${API_URL}/${JSON.parse(item.product.images)[0]}`}
                    alt={item.product.name || "Product Image"}
                    className="w-20 h-20 object-cover rounded-lg"
                  />  
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">
                      {item.product.name}
                    </h2>
                    <p className="text-gray-500">₹{item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.cartId, item.quantity - 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.cartId, item.quantity + 1)
                      }
                      className="px-2 py-1 border rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.cartId)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
