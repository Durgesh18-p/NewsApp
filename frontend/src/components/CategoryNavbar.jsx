import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = ["India", "International", "Sports", "Drama", "HealthCare"];

const CategoryNavbar = () => {
  const [activeCategory, setActiveCategory] = useState("India");

  return (
    <nav className="w-full bg-[#FAFAFA] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex flex-wrap justify-center md:justify-between gap-4">
          {categories.map((category) => (
            <Link to={category.toLowerCase()} key={category}>
              <motion.li
                className={`cursor-pointer text-base font-medium md:text-lg ${
                  activeCategory === category
                    ? "text-[#E77917]"
                    : "text-[#130912]"
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default CategoryNavbar;
