import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserCircle, FaBars } from "react-icons/fa"; // Import icons
import logo from "/logo-nav.png";
import CategoryNavbar from "./CategoryNavbar";
import { TiWeatherPartlySunny } from "react-icons/ti";
import toast, { Toaster } from "react-hot-toast"; // Import toast for notifications
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const Navbar = () => {
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [currentTime, setCurrentTime] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token")); // Check if logged in based on cookie
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const role = localStorage.getItem("role");
  // Function to get the current time and day
  const updateTime = () => {
    const now = new Date();
    const options = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const timeString = now.toLocaleString("en-US", options);
    setCurrentTime(timeString);
  };

  useEffect(() => {
    updateTime(); // Update time immediately on mount
    const interval = setInterval(updateTime, 60000); // Update time every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`, // Get the token from cookies
        },
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || "Logged out successfully."); // Show success message
        Cookies.remove("token"); // Remove token from cookies
        setIsLoggedIn(false); // Update login state
        setIsPopupVisible(false); // Close popup
        navigate("/"); // Redirect to home page
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Logout failed. Please try again."); // Show error message
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while logging out."); // Show error message for network issues
    }
  };

  const renderAdminLink = () => {
    if (role === "admin") {
      return (
        <Link to="/admin-panel" className="ml-3 ">
          Admin
        </Link>
      );
    }
    return null; // Return null if the condition is not met
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <motion.nav
        className="flex justify-between items-center p-4 bg-[#FAFAFA] shadow-md sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        id="navbar"
      >
        <div className="flex items-center">
          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <FaBars
              className="h-6 w-6 text-[#130912] cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
          {/* Date and Time */}
          <div className={`hidden md:block text-lg font-semibold`}>
            {currentTime}
          </div>
        </div>

        <Link to={"/"} className="flex-grow flex justify-center">
          <img src={logo} alt="Logo" className="h-[70px] w-[160px]" />
        </Link>

        {/* Right side: Weather and User Icon */}
        <div className="flex items-center text-[#130912] text-lg font-semibold">
          <div className="items-center lg:block hidden">
            <Link
              to="/"
              className="flex items-center hover:underline text-[#130912] hover:underline-[#E77917] transition duration-300"
            >
              <TiWeatherPartlySunny className="text-[#E77917] h-6 w-6 mr-1" />
              Weather
            </Link>
          </div>
          {<div>{renderAdminLink()}</div>}

          {/* Render User Icon Only If Logged In */}
          {isLoggedIn && (
            <div className="relative ml-4 cursor-pointer">
              <FaUserCircle
                className="h-8 w-8"
                onClick={() => setIsPopupVisible(!isPopupVisible)}
              />
              {isPopupVisible && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-[#E77917] shadow-lg rounded-lg p-2">
                  <div className="flex items-center">
                    <FaUserCircle className="text-[#E77917] h-6 w-6 mr-2" />
                    <button
                      className="text-left text-[#130912] hover:text-[#E77917]"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 bg-[#FAFAFA] shadow-md flex justify-center items-center gap-2">
          <div className="text-lg font-semibold">{currentTime}</div> |
          <div className="flex justify-center items-center gap-1">
            <Link
              to="/"
              className="block text-[#130912] hover:underline-[#E77917] text-xl font-semibold"
            >
              Weather
            </Link>
            <TiWeatherPartlySunny className="mt-1 text-[#E77917]" />
          </div>
        </div>
      )}

      <CategoryNavbar />
    </>
  );
};

export default Navbar;
