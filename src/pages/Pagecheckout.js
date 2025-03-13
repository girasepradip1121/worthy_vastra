import React, { useState } from "react";
import { FaRegAddressCard, FaCreditCard, FaTruck } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL, userToken } from "../components/Variable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Pagecheckout = () => {
  const userData = userToken();
  const token = userData.token;
  const userId = userData.userId;
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartItems, totalPrice } = location.state || {
    cartItems: [],
    totalPrice: 0,
  };

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    add1: "",
    hno: "",
    add2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.fname ||
      !formData.lname ||
      !formData.add1 ||
      !formData.hno ||
      !formData.add2 ||
      !formData.city ||
      !formData.state ||
      !formData.country ||
      !formData.pincode
    ) {
      toast.error("Please fill all the details.");
      return;
    }

    if (!token) {
      toast.error("User not authenticated!");
      return;
    }

    const orderData = {
      userId,
      shippingCharge: shippingCharges,
      tax: taxAmount,
      totalPrice: grandTotal,
      paymentMethod,
      phone: formData.phone,
      email: formData.email,
      shippingAddress: formData,
      status: 1,
      orderItems: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        totalAmount: item.quantity * item.product.price,
      })),
    };
    try {
      const response = await axios.post(`${API_URL}/order/create`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        toast.success("Order placed successfully");
        navigate("/ordersuccess");
      } else {
        toast.error("failed to placed order");
      }
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response ? error.response.data : error
      );
      toast.error(" Something went wrong!");
    }
  };

  const shippingCharges = totalPrice >= 500 ? 0 : 50;
  const taxAmount = totalPrice * 0.18;
  const grandTotal = totalPrice + shippingCharges + taxAmount;

  return (
    <>
      <ToastContainer />
      <div className="max-w-6xl  mx-auto p-6 flex flex-col-reverse md:flex-row gap-8">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-6 md:w-[800px]">
          {/* Contact Info */}
          <div className="border border-gray-600 p-6 rounded-lg">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <FaRegAddressCard /> CONTACT INFO
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="phone"
                placeholder="Your phone number"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border p-6 rounded-lg shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold border-b pb-2">
              <FaTruck /> SHIPPING ADDRESS
            </h3>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                name="fname"
                placeholder="First name"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="lname"
                placeholder="Last name"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="add1"
                placeholder="Address line 1"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="hno"
                placeholder="Apt, Suite"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="add2"
                placeholder="Address line 2"
                className="border p-2 rounded-md w-full md:col-span-2 border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="Postal code"
                className="border p-2 rounded-md w-full border-gray-300"
                onChange={handleChange}
              />
            </form>
          </div>

          {/* Payment Method */}
          <div className="border p-6 rounded-lg shadow-sm">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <FaCreditCard /> PAYMENT
            </h3>
            <div className="mt-4 flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  className="accent-black"
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  className="accent-black"
                />
                Online / Netbanking
              </label>
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold">Order summary</h3>
          <div className="mt-4 space-y-4">
            {/* Product Items */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-3"
              >
                <img
                  src={`${API_URL}/${JSON.parse(item.product.images)[0]}`}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-sm">
                  ₹{(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Price Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>total</span> <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping estimate</span> <span>₹{shippingCharges}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax estimate</span> <span>₹{taxAmount}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Order total</span> <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Confirm Order Button */}
            <button
              className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-900 transition"
              onClick={handlePlaceOrder}
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagecheckout;
