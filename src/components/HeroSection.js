import React from "react";
import Hero from "../List/Hero.MOV"
import ReactPlayer from "react-player";
const HeroSection = () => {
  return (
    // <section
    //   className="relative bg-cover bg-center h-screen flex items-center"
    //   style={{
    //     backgroundImage: "url('/assets/image.png')", // Path to the image in the public folder
    //   }}
    // >
    //   {/* Overlay */}
    //   <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>

    //   {/* Content */}
    //   <div className="relative container mx-auto px-6 lg:px-20 text-white">
    //     <h4 className="text-sm md:text-base font-medium mb-4">Starting from: ₹449.99</h4>
    //     <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
    //       Exclusive collection <br />
    //       of t-shirts
    //     </h1>
    //     <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-full transition">
    //       Explore now
    //     </button>
    //   </div>
    // </section>

    <>
         <div className="w-full h-full overflow-x-auto">
      <video 
        className="w-full"
        src={Hero} 
        autoPlay 
        loop 
        muted 
        playsInline
      />
    </div>
    </>
  );
};

export default HeroSection;
