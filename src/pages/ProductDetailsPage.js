// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Footer from "../components/Footer";
// import Recommendations from "../components/Recommendations";
// import { ProductAPI, CartAPI } from "../api/api";
// import { Star } from "lucide-react";
// const ProductDetailsPage = () => {
//   const { id } = useParams(); // Get product ID from URL
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedSize, setSelectedSize] = useState("S");

//   // Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await ProductAPI.get(`get/${id}`);
//         if (response.data) {
//           setProduct(response.data);
//         } else {
//           setError("Product not found.");
//         }
//       } catch (err) {
//         console.error("Error fetching product details:", err);
//         setError("Failed to load product details. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   // Add to Cart
//   const handleAddToCart = async () => {
//     if (product) {
//       try {
//         const token = localStorage.getItem("token"); // Get user token
//         const cartItem = { productId: product.id, quantity };

//         if (token) {
//           // Add to backend cart
//           await CartAPI.post("/", cartItem, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           alert(
//             `"${product.name}" (Quantity: ${quantity}) added to your cart.`
//           );
//         } else {
//           // Handle local cart for non-logged-in users
//           const localCart = JSON.parse(localStorage.getItem("cart")) || [];
//           const existingItemIndex = localCart.findIndex(
//             (item) => item.productId === product.id
//           );

//           if (existingItemIndex > -1) {
//             localCart[existingItemIndex].quantity += quantity;
//           } else {
//             localCart.push({
//               ...cartItem,
//               name: product.name,
//               price: product.price,
//             });
//           }
//           localStorage.setItem("cart", JSON.stringify(localCart));
//           alert(
//             `"${product.name}" (Quantity: ${quantity}) added to your cart.`
//           );
//         }
//       } catch (err) {
//         console.error("Error adding to cart:", err);
//         alert("Failed to add the product to your cart. Please try again.");
//       }
//     }
//   };

//   // Buy Now logic
//   const handleBuyNow = () => {
//     if (product) {
//       alert(`Proceeding to buy "${product.name}"`);
//     }
//   };

//   // Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg font-semibold text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-lg font-semibold text-red-500">{error}</p>
//       </div>
//     );
//   }

//   // Main Component
//   return (
//     <>
//       <div className="ml-[5%] mr-[5%] ">
//         <div className="flex flex-col md:flex-row justify-between ">
//           {/* Image */}
//           <div className=" flex space-x-4 mt-4">
//             <div>
//               <img
//                 src={product.images[0]}
//                 className="md:w-[248px] w-[150px] h-[100px] md:h-[279px] object-cover rounded-[16px]  cursor-pointer"
//               />
//               <img
//                 src={product.images[1]}
//                 className="md:w-[248px] w-[150px] h-[100px] md:h-[279px] mt-2 object-cover rounded-[16px]  cursor-pointer"
//               />
//               <img
//                 src={product.images[2]}
//                 className="md:w-[248px] w-[150px] h-[100px] md:h-[279px] mt-2 object-cover rounded-[16px]  cursor-pointer"
//               />
//             </div>
//             <div>
//               <img
//                 src={product.images[3]}
//                 className="md:w-[363px] w-[150px] h-[200px] md:h-[566px] object-cover rounded-[16px]  cursor-pointer"
//               />
//               <img
//                 src={product.images[4]}
//                 className="md:w-[363px] w-[150px h-[200px] md:h-[280px] mt-2  object-cover rounded-[16px]  cursor-pointer"
//               />
//             </div>
//           </div>

//           {/* Options */}

//           <div className="border md:w-[700px] mt-5 p-5 font-[Poppins]">
//             <h1 className="text-[26px] mt-10 font-[Poppins] font-bold">
//               {product.name}
//             </h1>
//             {/* Price and all */}
//             <div className="flex justify-between">
//               <div className="flex items-center mt-2 text-gray-600">
//                 <Star className="w-5 h-5 text-yellow-500" /> {product.rating} •{" "}
//                 {product.reviews} reviews
//               </div>
//               <div className="flex flex-col items-center mt-4">
//                 <span className="text-[24px] font-[600] font-[Poppins] text-black">
//                   ₹{product.price}
//                 </span>
//                 <span className="text-[14px] ml-4 text-gray-500 line-through">
//                   ₹{product.originalPrice}
//                 </span>
//               </div>
//             </div>

//             {/* Size */}
//             <div className="mt-6">
//               <h3 className="font-bold mb-2">Size:</h3>
//               <div className="flex flex-wrap gap-2 mt-2 space-x-4">
//                 {product?.sizes?.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 py-2 border rounded ${
//                       selectedSize === size
//                         ? "bg-gray-800 text-white"
//                         : "hover:bg-gray-200"
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* + - Add */}
//             <br />
//             <div className="flex justify-between">
//               <div className="mt-6 pt-2 p-2 rounded-full bg-gray-200">
//                 {/* <h3 className="font-bold mb-2">Quantity:</h3> */}
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() =>
//                       setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
//                     }
//                     className="h-7 w-7 border rounded-full hover:bg-gray-200"
//                   >
//                     -
//                   </button>
//                   <span className="px-4">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity((prev) => prev + 1)}
//                     className="h-7 w-7  border rounded-full hover:bg-gray-200"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//               <br />
//               {/* Add to Cart */}
//               <div className="mt-6 font-[Poppins]">
//                 <button className="w-full bg-black text-white md:w-[178px] md:h-[52px] px-6 rounded-full ml-2 hover:bg-gray-900">
//                   <i class="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;Add to
//                   Cart
//                 </button>
//               </div>
//             </div>
//             {/* Price -1 */}
//             <div className="flex justify-between text-[#4B5563] mt-10">
//               <div>
//                 <p>₹{product.price}&nbsp;x&nbsp;1</p> {/*Replace Quantity */}
//               </div>
//               <div>
//                 <p>₹{product.price}</p>
//               </div>
//             </div>

//             {/* Price 2 */}
//             <div className="flex justify-between mt-2 text-[#4B5563] border-b-2">
//               <div>
//                 <p>Tax Estimate</p> {/*Replace Quantity */}
//               </div>
//               <div>
//                 <p>₹Tax Price????</p>
//               </div>
//             </div>
//             <br />
//             <div className="flex justify-between mt-2 ">
//               <div>
//                 <p>Total</p> {/*Replace Quantity */}
//               </div>
//               <div>
//                 <p>₹ 1169.00????</p>
//               </div>
//             </div>
//             <div className="col-span-2 mt-10 ">
//               <h2 className="text-[18px] font-bold mb-4 font-[Poppins] border-b-2">
//                 Key Highlights
//               </h2>
//               <p className="text-[#4B5563]">
//                 <strong>Material:</strong> {product.material}
//               </p>
//               <p className="text-[#4B5563]">
//                 <strong>Color:</strong> {product.color}
//               </p>
//             </div>

//             <div className="col-span-2 mt-10 font-[Poppins]">
//               <h2 className="text-[24px] font-bold mb-4 font-[Poppins] border-b-2">
//                 Details
//               </h2>
//               <p className="text-[#4B5563]">
//                 <strong>Material:</strong> {product.material}
//               </p>
//               <p className="text-[#4B5563]">
//                 <strong>Color:</strong> {product.color}
//               </p>
//             </div>
//           </div>
//         </div>

//         <br />

//         {/* Product Highlights & Keywords */}

//         <div className="col-span-2 mt-6 font-[Poppins]">
//           <h2 className="text-[24px] font-bold mb-4">Keywords</h2>
//           <div className="flex flex-wrap gap-2">
//             {product?.keywords?.map((keyword, index) => (
//               <span
//                 key={index}
//                 className="bg-white border-2 px-3 py-1 rounded-full text-sm"
//               >
//                 <i class="fa-solid fa-wand-magic-sparkles"></i>&nbsp;&nbsp;
//                 {keyword}
//               </span>
//             ))}
//           </div>
//         </div>
//       </div>

//       <br />
//       <br />
//       <br />
//       <div className="mt-10">
//         <Recommendations />
//       </div>
//     </>
//   );
// };

// export default ProductDetailsPage;

import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Recommendations from "../components/Recommendations";
import { Star } from "lucide-react";
import { API_URL, userToken } from "../components/Variable";
import axios from "axios";

const ProductDetailsPage = () => {
  const userData=userToken()
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const navigate=useNavigate()

  const productImages = product?.images ? JSON.parse(product.images) : [];
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/product/get/${productId}`);
        if (response.data) {
          setProduct(response.data);
          console.log("response", response.data);

          const images = response.data.images
            ? JSON.parse(response.data.images)
            : [];
          if (images.length > 0) {
            setSelectedImage(`${API_URL}/${images[0]}`);
          }
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

//   useEffect(() => {
//     console.log("Updated Selected Size (AFTER STATE UPDATE):", selectedSize);
// }, [selectedSize]);


  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Stop event from propagating
    try {
      const token =userData.token 
      console.log("token",token);
      // Ensure user is logged in
      if (!token) {
        alert("Please login to add items to cart.");
        navigate("/login");
        return;
      }
        console.log("Adding to Cart - Product ID:", productId);
        console.log("Selected Quantity:", quantity);
        console.log("Selected Size:", selectedSize);

      await axios.post(
        `${API_URL}/cart/add`,
        { productId, quantity ,userId:userData.userId,size:selectedSize},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Product has been added to your cart.`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };
  
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  const sizesArray = product?.size ? JSON.parse(product.size) : [];

  return (
    <div className="mx-4 md:mx-10 lg:mx-20 xl:mx-40 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Images */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={`${API_URL}/${img}`}
                onClick={() => setSelectedImage(`${API_URL}/${img}`)}
                alt={`Thumbnail ${index + 1}`}
                className={`w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all ${
                  selectedImage === `${API_URL}/${img}`
                    ? "border-yellow-500"
                    : "border-gray-300 hover:border-yellow-500"
                }`}
              />
            ))}
          </div>
          <img
            src={selectedImage}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-cover rounded shadow-lg"
            alt="Selected Product"
          />
        </div>

        {/* Right Section - Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex justify-between text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500" /> {product.rating} •{" "}
              {product.reviews} reviews
            </div>
            <div className="text-xl font-semibold text-black">
              ₹{product.price}
              <span className="text-sm ml-2 text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-bold mb-2">Size:</h3>
            <div className="flex flex-wrap gap-2">
              {sizesArray.length > 0 ? (
                sizesArray.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      console.log("Clicked Size:", size); // 🛠️ Debugging
                      setSelectedSize(size);
                      console.log("Updated Selected Size:", selectedSize);
                      }}                    
                      className={`px-4 py-2 border rounded transition-all ${
                      selectedSize === size
                        ? "bg-gray-800 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="text-gray-500">No sizes available</p>
              )}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center justify-center bg-gray-200 p-2 rounded-full">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="h-7 w-7 border rounded-full hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="h-7 w-7 border rounded-full hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 w-full md:w-auto"
             onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Total Calculation */}
          <div className="mt-6 border-t pt-4 text-gray-700">
            <div className="flex justify-between">
              <span>
                ₹{product.price} x {quantity}
              </span>
              <span>₹{(product.price * quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Tax estimate</span>
              <span>₹0</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{(product.price * quantity).toFixed(2)}</span>
            </div>
          </div>

          {/* Product Highlights */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2 border-b pb-1">
              Key Highlights
            </h2>
            <p className="text-gray-600">
              <strong>Material:</strong> {product.material}
            </p>
            <p className="text-gray-600">
              <strong>Color:</strong> {product.color}
            </p>
          </div>
        </div>
      </div>
      <Recommendations />
    </div>
  );
};

export default ProductDetailsPage;
