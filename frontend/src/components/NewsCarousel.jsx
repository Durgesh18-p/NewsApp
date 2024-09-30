import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NewsCarousel = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://newsapp-vfx1.onrender.com/news");
        const data = await response.json();
        setNewsItems(data.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(
        () => {
          goToNext();
        },
        window.innerWidth < 640 ? 3000 : 4000
      );

      return () => clearInterval(interval);
    }
  }, [autoSlide, currentIndex, newsItems]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === newsItems.length - (window.innerWidth < 640 ? 1 : 3)
        ? 0
        : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? newsItems.length - (window.innerWidth < 640 ? 1 : 3)
        : prevIndex - 1
    );
  };

  const openNewsDetails = (id) => {
    navigate(`/news/${id}`);
  };

  if (!newsItems.length) return <p>Loading...</p>;

  return (
    <div className="relative w-full overflow-hidden p-9 text-justify">
      <div className="w-full flex justify-center items-center flex-col mb-7">
        <h1 className="text-2xl font-semibold">More Related News</h1>
        <div className="bg-[#E77917] h-[1.5px] m-auto w-[20%]"></div>
      </div>
      <div
        className="flex justify-between items-center absolute top-14 bottom-0 left-0 right-0 pointer-events-none z-10"
        onMouseEnter={() => setAutoSlide(false)}
        onMouseLeave={() => setAutoSlide(true)}
      >
        <button
          onClick={goToPrev}
          className="pointer-events-auto bg-[#E77917] text-white p-2 rounded-full absolute left-4   z-20 hover:bg-[#f3ae71] transition duration-300"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={goToNext}
          className="pointer-events-auto bg-[#E77917] text-white p-2 rounded-full absolute right-4 z-20 hover:bg-[#f3ae71] transition duration-300"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <motion.div className="flex overflow-hidden">
        <AnimatePresence>
          {newsItems
            .slice(
              currentIndex,
              currentIndex + (window.innerWidth < 640 ? 1 : 3)
            )
            .map((item) => (
              <motion.div
                key={item._id}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex-shrink-0 w-full sm:w-1/3 mx-2 cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => openNewsDetails(item._id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                  <h3 className="text-lg font-bold">
                    {item.title.slice(0, 37)}...
                  </h3>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NewsCarousel;
