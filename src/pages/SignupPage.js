import React, { useState } from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/user/signup", formData);
      setMessage(response.data.message);
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMsg);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white  p-6 rounded-lg  w-[440px]">
        <h2 className="text-[36px] font-[Poppins] font-[600] mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-full"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border rounded-full"
            required
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-full w-full hover:bg-gray-900"
          >
            Sign Up
          </button>
        </form>
        {message && <p className="text-black mt-4 text-center">{message}</p>}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to='/login'
            className="text-yellow-400 font-semibold hover:underline"
          > 
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
