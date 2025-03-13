import React, { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";

const CustomPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    tShirtSize: "",
    tShirtStyle: "",
    designPreferences: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tshirtType, setTshirtType] = useState("Regular");
  const [color, setColor] = useState("#010231");
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      const response = await axios.post("/", formData);
      setMessage(response.data.message || "Your custom request has been submitted!");
      setFormData({
        fullName: "",
        email: "",
        tShirtSize: "",
        tShirtStyle: "",
        designPreferences: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <main className="w-full max-w-7xl mx-auto py-10 px-6 overflow-hidden">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-[Poppins]">
            Create Your Custom T-Shirt
          </h1>
          <p className="text-gray-600 mt-2 font-[Poppins]">
            Customize your t-shirt with ease! Follow these simple steps to make your design a reality.
          </p>
        </div>

        {/* Responsive Layout */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-10 p-6">
          {/* T-Shirt Preview */}
          <div className="bg-gray-100 p-4 rounded-lg w-full max-w-md">
            <img
              src={uploadedImage || "/tshirt-placeholder.png"}
              alt="T-shirt"
              className="w-full object-cover h-auto md:h-[400px]"
              style={{ backgroundColor: color }}
            />
          </div>

          {/* Customization Options */}
          <div className="w-full max-w-md">
            {/* T-shirt Type */}
            <h3 className="font-semibold mt-6 font-[Poppins]">T-shirt Type</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Regular", "Collared", "Hoodie"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTshirtType(type)}
                  className={`px-4 py-2 rounded-full border ${tshirtType === type ? "bg-[#BB7E5B] text-white" : "border-gray-300"}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Color Picker */}
            <h3 className="font-semibold mt-6 font-[Poppins]">Choose Color</h3>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 border rounded-lg"
              />
              <span className="border px-4 py-2 rounded-lg bg-white">{color}</span>
            </div>

            {/* Upload Design */}
            <h3 className="font-semibold mt-6 font-[Poppins]">Upload Your Design</h3>
            <label className="mt-3 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-100">
              <input type="file" className="hidden" onChange={handleFileUpload} />
              <Upload className="mr-2 text-gray-500" />
              <span className="text-gray-500">Upload Photo</span>
            </label>
          </div>
        </div>

        {/* Form Section */}
        <section className="bg-gray-100 p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-lg md:text-2xl font-semibold text-center text-gray-900 font-[Poppins]">
            Fill out the form to get your customized t-shirt design!
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="p-3 border rounded-lg" placeholder="Full Name" required />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="p-3 border rounded-lg" placeholder="Email" required />
              <select name="tShirtSize" value={formData.tShirtSize} onChange={handleInputChange} className="p-3 border rounded-lg" required>
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="XL">XL</option>
              </select>
              <input type="text" name="tShirtStyle" value={formData.tShirtStyle} onChange={handleInputChange} className="p-3 border rounded-lg" placeholder="T-Shirt Style" required />
            </div>
            <textarea name="designPreferences" value={formData.designPreferences} onChange={handleInputChange} className="w-full p-3 border rounded-lg mt-2" rows="4" placeholder="Design Preferences" required />
            <button type="submit" className={`mt-6 px-10 py-3 rounded-full text-white ${loading ? "bg-gray-500" : "bg-black hover:bg-gray-600"}`} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default CustomPage;
