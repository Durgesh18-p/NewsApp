import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast"; 

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    toast.loading("Saving your data, hang tight...");

    try {
      const response = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Something went wrong");
      }

      // Show success toast notification
      toast.dismiss();
      toast.success("Signed up successfully!");

      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/login";
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
        <h2 className="text-center text-2xl font-bold text-[#130912] mb-6">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block font-semibold text-[#130912] mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-[#E77917] rounded-lg p-2"
              required
              placeholder="Enter your name"
              disabled={loading} // Disable input during loading
            />
          </div>
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
              placeholder="Enter your email"
              disabled={loading} // Disable input during loading
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
              placeholder="Enter your password"
              disabled={loading} // Disable input during loading
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
            disabled={loading} // Disable button during loading
          >
            {loading ? "Saving..." : "Sign Up"} {/* Change text during loading */}
          </button>
        </form>
        <p className="text-center text-[#130912] mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#E77917] font-semibold">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
