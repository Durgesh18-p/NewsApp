/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";

const News = ({ item }) => {
  // State to toggle full description visibility
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle 'Read More' text
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Limit the description to 100 characters and show "Read More" if it exceeds
  const shortDescription = item.description.slice(0, 100);

  // Function to highlight specific terms in the description
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
    ]; // Replace with actual terms

    const regex = new RegExp(`(${termsToHighlight.join("|")})`, "gi");
    return text.split(regex).map((part, index) => {
      // Check if the part matches any term to highlight
      if (termsToHighlight.includes(part)) {
        return (
          <span key={index} style={{ color: "#E77917" }}>
            {part}
          </span>
        );
      }
      return part; // Return the text part without highlighting
    });
  };

  return (
    <motion.div
      key={item._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white border-2 border-transparent rounded-lg overflow-hidden max-w-sm sm:max-w-md lg:max-w-lg mx-auto transition duration-300 ease-in-out text-justify"
    >
      <motion.img
        src={item.image}
        alt={item.title}
        className="h-[200px] w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
      />
      <div className="p-4">
        <p className="font-bold text-xl text-gray-800">{item.title}</p>

        {/* Display short description with "Read More" toggle */}
        <p className="font-normal text-[17px] text-gray-600 mt-2">
          {showFullDescription
            ? highlightTerms(item.description)
            : highlightTerms(`${shortDescription}...`)}
        </p>

        {/* Read More / Show Less toggle button */}
        <button
          onClick={toggleDescription}
          className="text-[#E77917] hover:underline mt-2"
        >
          {showFullDescription ? "Show Less" : "Read More"}
        </button>
      </div>
    </motion.div>
  );
};

export default News;
