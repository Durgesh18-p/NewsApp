import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast"; 
import Cookies from "js-cookie"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    toast.loading("Logging in, hang tight...");

    try {
      const response = await fetch("https://newsapp-vfx1.onrender.com/user/login", {
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

      // Save the JWT token in a cookie
      document.cookie = `token=${data.token}; path=/; max-age=${60 * 60}; SameSite=Strict`;

      // If user is admin, store admin status in a cookie
      if (email === "suryadurgesh18@gmail.com") {
        Cookies.set("admin", "true", { path: "/", sameSite: "Strict" });
      }

      // Show success toast notification
      toast.dismiss();
      toast.success("Logged in successfully!");

      // Redirect to home or dashboard
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      setError(error.message);
      toast.dismiss();
      toast.error(error.message); // Error toast
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-screen bg-[#FAFAFA] p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <motion.div
        className="bg-white shadow-xl rounded-lg p-8 max-w-sm w-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-3xl font-bold text-[#130912] mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block font-semibold text-[#130912] mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#E77917] rounded-lg p-2"
              required
              placeholder="Enter your email ..."
              disabled={loading}
            />
          </div>
          <div className="mb-4 relative">
            <label className="block font-semibold text-[#130912] mb-1" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E77917] rounded-lg p-2"
              required
              placeholder="Enter your password ..."
              disabled={loading} 
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
            className={`w-full bg-[#E77917] text-white font-semibold rounded-lg py-2 hover:bg-[#130912] transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} 
          >
            {loading ? "Logging in..." : "Login"} 
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
