// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white py-10">
//       <div className="flex flex-col md:flex-row gap-8 justify-around">
//         {/* Brand Section */}
//         <div>
//           <h2 className="text-[26px] font-[Inter] font-bold">WORTHY-VASTRA</h2>
//           <p className="text-[13px] font-[Inter] mt-2">WEAR YOUR WORTH WITH PRIDE</p>
//         </div>

//         <div>
//           <h2 className="text-[18px] font-[Inter] font-bold">You can be one step ahead.</h2>
//           <p className="text-[13px] font-[Inter] mt-2">Sign up to hear about our updates on the dot.</p>
//         </div>

//         <div className="flex items-center border border-gray-300 w-[402px] h-[40px] overflow-hidden ">
//           <input type="email" placeholder="Your email address" className="md:w-full px-4 py-2 text-gray-500 focus:outline-none" />
//           <button className="bg-white text-black  w-[200px] py-2 font-[Karla] font-[300] hover:opacity-80">SIGN UP</button>
//         </div>

//       </div>



//         {/* Categories Section */}

//       <div className="flex flex-col md:flex-row mt-10 justify-around">  
//             <div>
//               <h3 className="text-lg font-[600] font-[Poppins] mb-4">Categories</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>Roundneck Tshirt</li>
//                 <li>Polo Tshirt</li>
//                 <li>Oversized Tshirt</li>
//                 <li>Hoodies</li>
//               </ul>
//             </div> 

//             {/* Information Section */}
//             <div>
//               <h3 className="text-lg font-[600] font-[Poppins] mb-4">Information</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>Privacy Policy</li>
//                 <li>Terms & Conditions</li>
//                 <li>Shipping Policy</li>
//                 <li>Cookie Policy</li>
//               </ul>
//             </div> 

//             {/* Contact Section */}
//             <div>
//               <h3 className="text-lg font-[600] font-[Poppins] mb-4">Contact Information</h3>
//               <ul className="space-y-2 text-sm">
//                 <li>Address: Surat, Gujarat, India</li>
//                 <li>Mobile: +91 12345 67890</li>
//               </ul>
//               <div className="flex items-center space-x-4 mt-4">
//                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-xl">
//                   <i className="fab fa-facebook"></i> Facebook
//                 </a>
//                 <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-500 text-xl">
//                   <i className="fab fa-youtube"></i> Youtube
//                 </a>
//                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-xl">
//                   <i className="fab fa-instagram"></i> Instagram
//                 </a>
//               </div>
//             </div>
//         </div>
      

//       {/* Bottom Footer */}
//       <div className="mt-8 text-center border-t border-gray-800 pt-4 text-sm">
//           WORTHY VASTRA © 2025 | ALL RIGHTS RESERVED
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0f1117] text-white py-10 px-5 md:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold">WORTHY-VASTRA</h2>
          <p className="text-sm mt-1 text-gray-400">WEAR YOUR WORTH WITH PRIDE</p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-16">
          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Roundneck Tshirt</li>
              <li>Polo Tshirt</li>
              <li>Oversized Tshirt</li>
              <li>Hoodies</li>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Information</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Shipping Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Address: Surat, Gujarat, India</li>
              <li>Mobile: +91 12345 67890</li>
            </ul>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-start space-x-4 mt-4 text-sm">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-500">
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-red-500">
                <i className="fab fa-youtube"></i> Youtube
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-pink-500">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-8 border-t border-dotted border-gray-600 pt-4 text-center text-sm text-gray-400">
      WORTHY VASTRA © 2025 | ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
