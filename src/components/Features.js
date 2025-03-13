import React from "react";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "fa-solid fa-truck-fast",
      title: "Free shipping",
      description: "On orders over ₹999.00",
    },
    {
      id: 2,
      icon: "fa-solid fa-arrow-right-arrow-left",
      title: "Very easy to return",
      description: "Just phone number",
    },
    {
      id: 3,
      icon: "fa-solid fa-earth-americas",
      title: "Worldwide delivery",
      description: "Fast delivery worldwide",
    },
    {
      id: 4,
      icon: "fa-solid fa-dollar-sign",
      title: "Refunds policy",
      description: "7 days return for any reason",
    },
  ];
  return (
    <section className="bg-white ml-[5%] mr-[5%] flex justify-center py-6 border rounded-xl shadow-sm">
    <div className="container mx-auto px-6 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center">
        {features.map((feature, index) => (
          <div key={feature.id} className="flex items-center space-x-4 w-full">
            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100">
              <i className={`${feature.icon} text-xl text-black`}></i>
            </div>
            
            {/* Text Centered */}
            <div className="flex-1 text-center">
              <h4 className="text-[16px] font-semibold text-black">{feature.title}</h4>
              <p className="text-[14px] text-gray-500">{feature.description}</p>
            </div>

            {/* Vertical Divider (Desktop Only) */}
            {index < features.length - 1 && (
              <div className="hidden md:block w-[1px] h-10 bg-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Features;
