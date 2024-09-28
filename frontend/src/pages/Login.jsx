// components/Login.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast"; // Import toast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      const data = await response.json();

      // Save the JWT token in a cookie or local storage
      document.cookie = `token=${data.token}; path=/; max-age=${
        60 * 60
      }; SameSite=Strict`;

      // Show success toast notification
      toast.success("Logged in successfully!");

      // Redirect to categories page or dashboard
      window.location.href = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAFAFA] p-4">
      <Toaster position="top-center" reverseOrder={false} />{" "}
      {/* Add toaster here */}
      <motion.div
        className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl font-semibold text-[#130912] mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[#130912] mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#E77917] rounded-lg p-2"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-[#130912] mb-1" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E77917] rounded-lg p-2"
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <FaEyeSlash size={20} className="text-[#E77917] mt-8" />
              ) : (
                <FaEye size={20} className="text-[#E77917] mt-8" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#E77917] text-white font-semibold rounded-lg py-2 hover:bg-[#130912] transition"
          >
            Login
          </button>
        </form>
        <p className="text-center text-[#130912] mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#E77917] font-semibold">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
