import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaXing,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Footer = () => {
  // State to control the popup visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Function to show the popup and set a timeout to close it
  const showPopup = () => {
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000); // Close after 3 seconds
  };

  return (
    <footer className="bg-[#130912] text-[#FAFAFA] py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center text-2xl font-semibold mb-4"
        >
          Contact Developer
        </motion.h2>

        <div className="flex justify-center space-x-6 mb-6">
          <motion.a
            href="https://linkedin.com/in/durgesh-suryawanshi-056a58230"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#c026d3",
              transition: { duration: 0.3 },
            }}
            className="p-3 rounded-full hover:bg-[#E77917] transition duration-300 ease-in-out"
          >
            <FaLinkedin className="text-[#FAFAFA] text-2xl" />
          </motion.a>

          <motion.a
            href="https://x.com/Suryadurgesh_18"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#000",
              transition: { duration: 0.3 },
            }}
            className="p-3 rounded-full hover:bg-[#E77917] transition duration-300 ease-in-out"
          >
            <FaXing className="text-[#FAFAFA] text-2xl" />
          </motion.a>

          <motion.a
            href="https://github.com/Durgesh18-p"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#333",
              transition: { duration: 0.3 },
            }}
            className="p-3 rounded-full hover:bg-[#E77917] transition duration-300 ease-in-out"
          >
            <FaGithub className="text-[#FAFAFA] text-2xl" />
          </motion.a>

          <motion.a
            href="https://wa.me/9405807468"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#25D366",
              transition: { duration: 0.3 },
            }}
            className="p-3 rounded-full hover:bg-[#E77917] transition duration-300 ease-in-out"
          >
            <FaWhatsapp className="text-[#FAFAFA] text-2xl" />
          </motion.a>

          <motion.a
            href="mailto:suryadurgesh18@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#1a73e8",
              transition: { duration: 0.3 },
            }}
            className="p-3 rounded-full hover:bg-[#E77917] transition duration-300 ease-in-out"
          >
            <FaEnvelope className="text-[#FAFAFA] text-2xl" />
          </motion.a>
        </div>

        <div className="flex justify-center items-center space-x-4 relative">
          <motion.a
            href="/"
            className="hover:underline hover:text-[#E77917] transition-colors duration-300"
            whileHover={{ color: "#E77917" }}
          >
            Home
          </motion.a>
          <motion.a
            href="https://suryadurgesh-18.netlify.app/"
            target="_black"
            className="hover:underline hover:text-[#E77917] transition-colors duration-300"
            whileHover={{ color: "#E77917" }}
          >
            About Developer
          </motion.a>

          {/* More Work link to trigger popup */}
          <motion.p
            onHoverStart={showPopup} // Show popup on click
            className="hover:underline hover:text-[#E77917] transition-colors duration-300 cursor-pointer"
            whileHover={{ color: "#E77917" }}
          >
            More Work
          </motion.p>

          {/* Popup for desktop view */}
          {isPopupVisible && (
            <div className="absolute bottom-5 lg:right-48 right-2  bg-[#130912] p-4 rounded-lg shadow-lg z-10 border-[#E77917] border-[1px] w-[230px]">
              <h3 className="text-xl font-semibold mb-2">Check out my work!</h3>
              <motion.a
                href="https://video-content-app.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#FAFAFA] hover:text-[#E77917] transition-colors duration-300"
                whileHover={{ color: "#E77917" }}
              >
                <FaExternalLinkAlt className="mr-2" />
                Visit Content Hub
              </motion.a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
