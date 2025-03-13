// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { API_URL } from "./Variable";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();

//   if (!product) {
//     return (
//       <div className="bg-gray-100 p-4 rounded shadow">
//         <p className="text-center text-gray-500">Product data is unavailable</p>
//       </div>
//     );
//   }

//   const handleViewDetails = () => {
//     navigate(`/product/${product.id}`); // Navigate to Product Details page
//   };

//   const handleAddToCart = () => {
//     // Simulate Add to Cart functionality
//     alert(`"${product.name || "Product"}" has been added to your cart.`);
//   };

//   return (
//     <div className="bg-white mt-5 md:w-[320px] w-[300px]  rounded-lg p-4 hover:shadow-lg transition duration-300">
//       {/* Product Image */}
      
//       <img
//         src={`${API_URL}${JSON.parse(product.images)[0]}`}
//         alt={product.name || "Product image"}
//         className="w-[300px] h-[360px] object-cover rounded"
//         loading="lazy" // Lazy loading
//       />

//       {/* Product Name */}
//       <div className="flex justify-between">
//         <div >
//             <h2 className="font-[600]  text-[16px] font-[Poppins]">
//                 {product.name || "Unnamed Product"}
//             </h2>
//         </div>
//         <div>
//             <span className="text-[16px] font-[600] text-black">
//               ₹{product.price !== undefined ? product.price : "N/A"}
//             </span> 
//         </div>
//       </div>

//       <div className="flex mt-1 justify-between">
//         <div >
//           <p className="text-gray-500 text-[14px] font-[Poppins]  ">
//             {product.description || "No description available for this product."}
//           </p>
//         </div>
//         <div>
//             {product.old_price && (
//               <span className="text-gray-400 line-through text-sm">
//                 ₹{product.old_price}
//               </span>
//             )}
//         </div>
//       </div>


//       {/* Rating Section */}
//       <div className="text-yellow-500 mt-3 flex items-center">
//         <span>⭐</span>
//         <span className="ml-1 text-[14px] font-[Poppins] text-gray-700">
//           {product.rating !== undefined ? product.rating : "N/A"} / 5
//         </span>
//       </div>

//       {/* Actions */}
//       <div className="mt-4 flex justify-between gap-2">
//         <button
//           className="bg-black w-[150px] text-white px-4 py-2 rounded-full hover:bg-gray-600 transition text-sm"
//           onClick={handleViewDetails}
//         >
//           View Details
//         </button>
//         <button
//           className="bg-[#BB7E5B] w-[150px] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition text-sm"
//           onClick={handleAddToCart}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./Variable";
import { IoBagHandleOutline } from "react-icons/io5"; // Import shopping bag icon
import axios from "axios";

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="bg-gray-100 p-4 rounded shadow">
        <p className="text-center text-gray-500">Product data is unavailable</p>
      </div>
    );
  }

  const handleViewDetails = () => {
    navigate(`/product/${product.productId}`); // Navigate to Product Details page
  };

  return (
    <div className="bg-white md:w-[260px] w-[240px] rounded-lg p-4 hover:shadow-lg transition duration-300">
      {/* Product Image with Clickable Event */}
      <div className="relative cursor-pointer" onClick={handleViewDetails}>
        <img
          src={`${API_URL}${JSON.parse(product.images)[0]}`}
          alt={product.name || "Product image"}
          className="w-[240px] h-[300px] object-cover rounded-lg"
          loading="lazy"
        />
        {/* Floating Cart Icon */}
        <button
          onClick={(e) => handleAddToCart(e, product)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          <IoBagHandleOutline className="text-black text-lg" />
        </button>
      </div>

      {/* Product Name & Price */}
      <div className="flex justify-between mt-3">
        <h2 className="font-semibold text-[16px]">{product.name || "Unnamed Product"}</h2>
        <span className="text-[16px] font-semibold text-black">
          ₹{product.price !== undefined ? product.price : "N/A"}
        </span>
      </div>

      {/* Description & Old Price */}
      <div className="flex justify-between mt-1">
        <p className="text-gray-500 text-[14px]">{product.description || "No description available."}</p>
        {product.originalPrice && (
          <span className="text-gray-400 line-through text-sm">₹{product.originalPrice}</span>
        )}
      </div>

      {/* Rating */}
      <div className="text-yellow-500 mt-3 flex items-center">
        <span>⭐</span>
        <span className="ml-1 text-[14px] text-gray-700">
          {product.rating !== undefined ? product.rating : "N/A"} / 5
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
