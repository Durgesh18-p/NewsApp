import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import NewsCarousel from "../components/NewsCarousel";

const NewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await fetch(
          `https://newsapp-vfx1.onrender.com/news/${id}`
        );
        const data = await response.json();
        setNewsItem(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news details:", error);
        setLoading(false);
      }
    };
    fetchNewsDetails();
  }, [id]);

  // Helper function to highlight specific terms
  const highlightTerms = (text) => {
    const regex = new RegExp(`(${termsToHighlight.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      termsToHighlight.includes(part) ? (
        <span key={index} className="text-[#E77917] font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (!newsItem) {
    return <p>Error loading news item.</p>;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto p-4 lg:p-8 text-justify"
      >
        {/* Hover Scale Effect on Image */}
        <motion.img
          src={newsItem.image}
          alt={newsItem.title}
          className="h-[480px] w-full object-cover mb-4 rounded-xl"
          whileHover={{ scale: 1.02 }} // Scale effect on hover
          transition={{ duration: 0.3 }}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {newsItem.title}
        </h1>

        {/* Highlighted Description */}
        <p className="text-lg font-normal text-gray-600 mb-6">
          {highlightTerms(newsItem.description)}
        </p>
      </motion.div>

      <NewsCarousel />
    </>
  );
};

export default NewsDetails;
