import React, { useState } from "react";
import { Star } from "lucide-react";

const ProductPage = () => {
  const product = {
    name: "Black Hoodie T-shirt",
    price: 1169.99,
    old_price: 2199.99,
    rating: 4.9,
    reviews: 142,
    sizes: ["S", "M", "L", "XL", "2XL"],
    material: "Soft wool blend",
    color: "Various",
    images: [
      "https://media.canva.com/v2/mockup-template-rasterize/color0:171618/image0:s3%3A%2F%2Ftemplate.canva.com%2FEAFxZJHbX_A%2F1%2F0%2F933w--inuARME-hI.png/mockuptemplateid:FAqieNuus/size:L?csig=AAAAAAAAAAAAAAAAAAAAAHsAL9YSvFwfVvDN1CHbulqmAyQS-f95QJ2uSmOCaXHI&exp=1741475689&osig=AAAAAAAAAAAAAAAAAAAAAGjXyawVYNfFtekjVkI-50o9sl0wDm8leMUS0i-DoGS4&seoslug=black-and-orange-typography-never-give-up-stay-strong-t-shirt&signer=marketplace-rpc",
      "https://nobero.com/cdn/shop/files/black_e4d19185-c19d-4e7c-a14a-8d2a29c7bad3.jpg?v=1711976456",
      "https://m.media-amazon.com/images/I/71JxPYUaJHL._AC_UY1100_.jpg",
      "https://www.deshidukan.in/cdn/shop/files/toinfinity_beyondoldylw_800x800_crop_center@2x.jpg?v=1712665405",
      "https://veirdo.in/cdn/shop/files/54_1.jpg?v=1723446311",
     
    ],
    keywords: ["men's fashion", "winter hat", "colorful accessory", "warm headwear"],
  };

  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);

  return (
    <>
    <div className="ml-[5%] mr-[5%] ">
        <div className="flex flex-col md:flex-row justify-between ">
          {/* Image */}
            <div className=" flex space-x-4 mt-4">
                <div>
                    <img src={product.images[0]} className="md:w-[248px] w-[150px] h-[100px] md:h-[279px] object-cover rounded-[16px]  cursor-pointer"/>
                    <img src={product.images[1]} className="md:w-[248px] w-[150px] h-[100px] md:h-[279px] mt-2 object-cover rounded-[16px]  cursor-pointer"/>
                    <img src={product.images[2]} className="md:w-[248px] w-[150px] h-[100px] md:h-[279px] mt-2 object-cover rounded-[16px]  cursor-pointer"/>
                </div>
                <div>
                    <img src={product.images[3]} className="md:w-[363px] w-[150px] h-[200px] md:h-[566px] object-cover rounded-[16px]  cursor-pointer"/>
                    <img src={product.images[4]} className="md:w-[363px] w-[150px h-[200px] md:h-[280px] mt-2  object-cover rounded-[16px]  cursor-pointer"/>
                </div>
            </div>

        {/* Options */}
            
                <div className="border md:w-[700px] mt-5 p-5 font-[Poppins]">

                      <h1 className="text-[26px] mt-10 font-[Poppins] font-bold">{product.name}</h1>
                      {/* Price and all */}
                      <div className="flex justify-between">  
                          <div className="flex items-center mt-2 text-gray-600">
                              <Star className="w-5 h-5 text-yellow-500" /> {product.rating} • {product.reviews} reviews
                          </div>
                          <div className="flex flex-col items-center mt-4">
                              <span className="text-[24px] font-[600] font-[Poppins] text-black">₹{product.price}</span>
                              <span className="text-[14px] ml-4 text-gray-500 line-through">₹{product.old_price}</span>
                          </div>
                      </div>

                      {/* Size */}
                        <div className="mt-6">
                          <h3 className="font-bold mb-2">Size:</h3>
                          <div className="flex flex-wrap gap-2 mt-2 space-x-4">
                            {product.sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border rounded ${
                                  selectedSize === size ? "bg-gray-800 text-white" : "hover:bg-gray-200"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                      {/* + - Add */}
                 <br />
                        <div className="flex justify-between">
                              <div className="mt-6 pt-2 p-2 rounded-full bg-gray-200">
                              {/* <h3 className="font-bold mb-2">Quantity:</h3> */}
                              <div className="flex items-center space-x-2">
                                  <button
                                  onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
                                  className="h-7 w-7 border rounded-full hover:bg-gray-200"
                                  >
                                  -
                                  </button>
                                  <span className="px-4">{quantity}</span>
                                  <button
                                  onClick={() => setQuantity((prev) => prev + 1)}
                                  className="h-7 w-7  border rounded-full hover:bg-gray-200"
                                  >
                                  +
                                  </button>
                              </div>
                              </div>
<br />
                              {/* Add to Cart */}
                              <div className="mt-6 font-[Poppins]">
                              <button className="w-full bg-black text-white md:w-[178px] md:h-[52px] px-6 rounded-full ml-2 hover:bg-gray-900">
                                  <i class="fa-solid fa-bag-shopping"></i>&nbsp;&nbsp;Add to Cart
                              </button>
                              </div>
                          </div>  
                            {/* Price -1 */}
                          <div className="flex justify-between text-[#4B5563] mt-10">
                              <div>
                                  <p>₹{product.price}&nbsp;x&nbsp;1</p> {/*Replace Quantity */}
                              </div>
                              <div>
                                  <p>₹{product.price}</p>
                              </div>
                          </div>

                            {/* Price 2 */}
                            <div className="flex justify-between mt-2 text-[#4B5563] border-b-2">
                                <div>
                                    <p>Tax Estimate</p> {/*Replace Quantity */}
                                </div>
                                <div>
                                    <p>₹Tax Price????</p>
                                </div>
                            </div>
<br />
                            <div className="flex justify-between mt-2 ">
                                <div>
                                    <p>Total</p> {/*Replace Quantity */}
                                </div>
                                <div>
                                    <p>₹ 1169.00????</p>
                                </div>
                            </div> 
                            <div className="col-span-2 mt-10 ">
                                <h2 className="text-[18px] font-bold mb-4 font-[Poppins] border-b-2">Key Highlights</h2>
                                <p className="text-[#4B5563]"><strong >Material:</strong> {product.material}</p>
                                <p className="text-[#4B5563]"><strong >Color:</strong> {product.color}</p>
                            </div>

                            <div className="col-span-2 mt-10 font-[Poppins]">
                            <h2 className="text-[24px] font-bold mb-4 font-[Poppins] border-b-2">Details</h2>
                            <p className="text-[#4B5563]"><strong >Material:</strong> {product.material}</p>
                            <p className="text-[#4B5563]"><strong >Color:</strong> {product.color}</p>
                        </div>
                </div>
        </div>

            <br />

        

     

      {/* Product Highlights & Keywords */}
      
    
     



      <div className="col-span-2 mt-6 font-[Poppins]">
        <h2 className="text-[24px] font-bold mb-4">Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {product.keywords.map((keyword, index) => (
            <span key={index} className="bg-white border-2 px-3 py-1 rounded-full text-sm">
              <i class="fa-solid fa-wand-magic-sparkles"></i>&nbsp;&nbsp;{keyword}
            </span>
          ))}
        </div>
      </div>
      </div>

      <br /><br /><br />
      



  </>
  );
};

export default ProductPage;
