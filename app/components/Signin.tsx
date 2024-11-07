"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Signin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const res = await axios.post("/api/user/signin",formData) ;
    console.log(res);
    localStorage.setItem("triviaId",res.data.user?.id);
    router.push("/");

  };

  return (
    <div className="bg-[url('assets/auth.jpg')] bg-no-repeat bg-cover bg-center h-screen w-full flex flex-col items-center justify-center text-white relative">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg max-w-md w-full shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
           Don't have an account?{" "}
            <a href="/signup" className="text-blue-400 hover:text-blue-500">
              Signup here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
