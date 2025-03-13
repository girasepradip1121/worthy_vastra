import React from "react";

const BannerSection = () => {
  return (
    <section className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg ml-[5%] mr-[5%]">
      <div className="container mx-auto ml-10 flex items-center justify-between py-10 px-6 lg:px-12">
        {/* Text Content */}
        <div className="max-w-lg">
          <p className="text-sm text-gray-600 font-medium font-[Poppins]">100% Original Products</p>
          <h2 className="text-[36px] font-[Poppins] font-bold text-gray-900 mt-2">
            The All New Fashion Collection Items
          </h2>
          <p className="text-lg text-gray-600 font-[Poppins] mt-2">Starting from: $59.99</p>
          <button className="mt-4 bg-black text-white px-6 py-2 rounded-full shadow hover:bg-gray-800 transition">
            Shop now
          </button>
        </div>

        {/* Image Content */}
        <div className="w-1/2 hidden lg:block">
          <img
            src="/assets/bg-image.png" // Replace this with your banner image path
            alt="Fashion Collection"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
