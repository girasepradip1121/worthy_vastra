import { useState } from "react";
import { FaRegAddressCard, FaCreditCard, FaPlus, FaMinus } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";


export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("online");

  // Sample cart items
  const [cart, setCart] = useState([
    { id: 1, name: "Elysian Elegance", price: 1169.99, quantity: 1, image: "https://yourdesignstore.s3.amazonaws.com/uploads/yds/productImages/full/16920141233537Lycra-Cotton-Main-Image-2-1.jpg" },
    { id: 2, name: "Elysian Elegance", price: 1169.99, quantity: 1, image: "https://yourdesignstore.s3.amazonaws.com/uploads/yds/productImages/full/16920141233537Lycra-Cotton-Main-Image-2-1.jpg" },
  ]);

  // Function to handle quantity changes
  const updateQuantity = (id, type) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 5.0;
  const tax = 24.9;
  const total = subtotal + shipping + tax;

  return (
    <>
    
    <div className="max-w-6xl  mx-auto p-6 flex flex-col-reverse md:flex-row gap-8">
      {/* Left Section */}
      <div className="md:col-span-2 space-y-6 md:w-[800px]">
        {/* Contact Info */}
        <div className="border border-gray-600 p-6 rounded-lg ">
          <h3 className="flex items-center gap-2 text-lg font-semibold font-[Inter]">
            <FaRegAddressCard /> CONTACT INFO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input type="text" placeholder="Your phone number" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />
            <input type="email" placeholder="Email address" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border p-6 rounded-lg shadow-sm">
                <h3 className="flex items-center gap-2 text-lg font-semibold border-b pb-2 font-[Inter]">
                <i class="fa-solid fa-truck"></i> SHIPPING ADDRESS
                </h3> 

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* First Row */}
                  <input type="text" placeholder="First name" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />
                  <input type="text" placeholder="Last name" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />

                  {/* Second Row */}
                  <input type="text" placeholder="Address line 1" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />
                  <input type="text" placeholder="Apt, Suite" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />

                  {/* Third Row - Full width */}
                  <input type="text" placeholder="Address line 2" className="border p-2 rounded-md w-full md:col-span-2 font-[Inter] border-gray-300" />

                  {/* Fourth Row */}
                  <input type="text" placeholder="City" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />
                  <input type="text" placeholder="Country" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />

                  {/* Fifth Row */}
                  <input type="text" placeholder="State/Province" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />
                  <input type="text" placeholder="Postal code" className="border p-2 rounded-md w-full font-[Inter] border-gray-300" />
                </div>
              </div>


        {/* Payment Method */}
        <div className="border p-6 rounded-lg shadow-sm">
          <h3 className="flex items-center gap-2 text-lg font-semibold font-[Inter]"><FaCreditCard /> PAYMENT</h3>
          <div className="mt-4 flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer font-[Inter]">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
                className="accent-black"
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-[Inter]">
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
                className="accent-black"
              />
              Online / Netbanking
            </label>
          </div>
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold font-[Inter]">Order summary</h3>
        <div className="mt-4 space-y-4">
          {/* Product Items */}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-3">
              <img src={item.image} alt={item.name} className="w-14 h-14 rounded-md object-cover" />
              <div className="flex-1">
                <p className="font-[400] text-[14px]">{item.name}</p>
                <p className="text-sm text-gray-500">Qty : 1</p>
              </div>

              <p className="font-semibold text-[14px] font-[Inter]">₹{(item.price * item.quantity).toFixed(2)}</p>
              
            </div>
          ))}

          {/* Price Details */}
          <div className="space-y-2 text-sm font-[Inter]">
            <div className="flex justify-between">
              <span>Subtotal</span> <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping estimate</span> <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax estimate</span> <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Order total</span> <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Confirm Order Button */}
          <button className="w-full bg-black text-white py-3 rounded-lg mt-4 hover:bg-gray-900 transition font-[Inter]">
            Confirm order
          </button>
        </div>
      </div>
    </div>

    
    </>
  );
}
