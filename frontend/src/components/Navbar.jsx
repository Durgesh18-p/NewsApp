import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "/logo-nav.png"; // Ensure this path is correct

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState("");

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

  return (
    <motion.nav
      className="flex justify-around items-center p-4 bg-[#FAFAFA] shadow-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-around items-center w-full">
        <div>
          <div className="hidden md:block text-lg font-semibold">
            {currentTime}
          </div>
        </div>
        <div className="flex-grow flex justify-center">
          <img src={logo} alt="Logo" className="h-[70px] w-[160px]" />
        </div>
        {/* Right side: Time and Weather */}
        <div className="flex items-center text-[#130912] text-lg font-semibold ">
          <Link
            to="/"
            className=" text-[#130912] rounded hidden md:block hover:underline-[#E77917]"
          >
            Weather
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
