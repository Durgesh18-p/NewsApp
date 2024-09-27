/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const News = ({ item }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortDescription = item.description.slice(0, 100);

  const highlightTerms = (text) => {
    const termsToHighlight = [
      "Israel",
      "Benjamin Netanyahu",
      "Donald Trump",
      "Kamala",
      "Hezbollah",
      "133.0 mm",
      "highest rainfall ever",
      "orange alert for Mumbai",
      "BRICS",
      "india",
      "China",
      "Russia",
      "Brazil",
      "South Africa",
      "USA",
      "America",
    ];

    const regex = new RegExp(`(${termsToHighlight.join("|")})`, "gi");
    return text.split(regex).map((part, index) => {
      if (termsToHighlight.includes(part)) {
        return (
          <span key={index} style={{ color: "#E77917" }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const openNewsPage = () => {
    navigate(`/news/${item._id}`);
  };

  return (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border-2 border-transparent rounded-lg overflow-hidden max-w-sm sm:max-w-md lg:max-w-lg mx-auto transition duration-300 ease-in-out text-justify cursor-pointer"
      onClick={openNewsPage}
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="h-[200px] w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="p-4">
        <p className="font-bold text-xl text-gray-800">{item.title}</p>
        <p className="font-normal text-[17px] text-gray-600 mt-2">
          {showFullDescription
            ? highlightTerms(item.description)
            : highlightTerms(`${shortDescription}...`)}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openNewsPage();
          }}
          className="text-[#E77917] hover:underline mt-2"
        >
          Read More
        </button>
      </div>
    </motion.div>
  );
};

export default News;
