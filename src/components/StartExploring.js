import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const StartExploring = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const cards = [
    {
      title: "For Men's",
      description: "Starting at ₹999.00",
      bgColor: "bg-blue-200",
      navigateTo: "/shop/men",
    },
    {
      title: "For Women's",
      description: "Starting at ₹999.00",
      bgColor: "bg-purple-200",
      navigateTo: "/shop/women",
    },
    {
      title: "Accessories",
      description: "Explore accessories",
      bgColor: "bg-orange-200",
      navigateTo: "/shop/accessories",
    },
  ];

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handleShopNow = () => {
    navigate(cards[activeIndex].navigateTo);
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-6 lg:px-20 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Start exploring.{" "}
          <span className="text-gray-500 font-medium">
            Good things are waiting for you
          </span>
        </h2>

        {/* Carousel */}
        <div className="relative">
          {/* Active Card */}
          <div className={`p-6 text-center justify-center flex rounded-lg shadow-lg transition transform duration-300 ${cards[activeIndex].bgColor}`} >
            <div>
                <h3 className="text-xl font-bold">{cards[activeIndex].title}</h3>
                <p className="text-md text-gray-600 mt-2">
                  {cards[activeIndex].description}
                </p>
            </div>
            <div className="border-l-2 ml-10 border-black"></div>
            <button onClick={handleShopNow} className="ml-10  text-black px-6 py-2 rounded hover:bg-blue-600 transition duration-300">
              SHOP NOW &nbsp; <span className="text-[20px]">→</span>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {cards.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition ${
                  activeIndex === index
                    ? "bg-gray-800"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartExploring;
