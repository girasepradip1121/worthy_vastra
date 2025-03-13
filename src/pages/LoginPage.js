import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, data } from "react-router-dom";
import { API_URL } from "../components/Variable";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${API_URL}/user/login`, formData);
      // const token = response.data.token;
      console.log("response", response);
      localStorage.setItem("token", JSON.stringify(response.data.user));

      setMessage("Login successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to login. Please try again."
      );
      console.log(err);
    }
  };

  return (
    <div className=" flex items-center justify-center mt-10 mb-10">
      <div className="bg-white p-6 w-[440px]">
        <h2 className="text-[36px] font-bold mb-6 text-center font-[Poppins]">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
            className="bg-black text-white px-4 py-2 rounded-full w-full hover:bg-gray-600"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="text-green-600 mt-4 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don't have an account?
          <Link
            to="/signup"
            className="text-yellow-400 font-semibold hover:underline"
          >
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
