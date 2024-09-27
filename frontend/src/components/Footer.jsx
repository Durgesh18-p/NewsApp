import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaXing,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
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
            href="linkedin.com/in/durgesh-suryawanshi-056a58230"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.2,
              backgroundColor: "#0A66C2",
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
            href="mailto:suryadurgesh18@gmail.com.com"
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

        <div className="text-center space-x-4">
          <motion.a
            href="#"
            className="hover:underline hover:text-[#E77917] transition-colors duration-300"
            whileHover={{ color: "#E77917" }}
          >
            Home
          </motion.a>
          <motion.a
            href="#"
            className="hover:underline hover:text-[#E77917] transition-colors duration-300"
            whileHover={{ color: "#E77917" }}
          >
            About Developer
          </motion.a>
          <motion.a
            href="#"
            className="hover:underline hover:text-[#E77917] transition-colors duration-300"
            whileHover={{ color: "#E77917" }}
          >
            More Work
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
