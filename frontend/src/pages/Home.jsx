import { useState, useEffect, useRef } from "react";
import News from "../components/News";
import Loader from "../components/Loader";
import axios from "axios";
import { motion } from "framer-motion";

const Home = () => {
  const [newsData, setNewsData] = useState([]); // All news data
  const [visibleNews, setVisibleNews] = useState([]); // Visible news items (6 at a time)
  const [loading, setLoading] = useState(true); // Loading state for the initial fetch
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for lazy loading
  const [page, setPage] = useState(1); // Page state to track the number of loaded pages
  const loaderRef = useRef(null); // Ref for the loader at the bottom

  const NEWS_PER_PAGE = 6; // Number of news items to load per page

  // Fetch news data initially
  useEffect(() => {
    fetchNews();
  }, []);

  // Set up IntersectionObserver for lazy loading
  useEffect(() => {
    if (loaderRef.current) {
      const observer = new IntersectionObserver(handleObserver, {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      });

      observer.observe(loaderRef.current);

      // Cleanup observer when component unmounts or updates
      return () => {
        observer.disconnect();
      };
    }
  }, [loadingMore, visibleNews]);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (
      target.isIntersecting &&
      !loadingMore &&
      visibleNews.length < newsData.length
    ) {
      loadMoreNews();
    }
  };
 console.log(newsData)
  // Fetch all news data initially
  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`https://newsapp-vfx1.onrender.com/news`);
      setNewsData(data.data); // Store all news items
      setVisibleNews(data.data.slice(0, NEWS_PER_PAGE)); // Show the first 6 news items
      setLoading(false); // Stop initial loading
    } catch (error) {
      console.error("Error fetching news data", error);
      setLoading(false);
    }
  };

  // Load more news items when the user scrolls down
  const loadMoreNews = () => {
    if (loadingMore || loading) return;

    setLoadingMore(true);

    setTimeout(() => {
      const nextPage = page + 1;
      const startIndex = NEWS_PER_PAGE * page;
      const endIndex = startIndex + NEWS_PER_PAGE;
      const newVisibleNews = newsData.slice(0, endIndex); // Get the next batch of news items

      setVisibleNews(newVisibleNews); // Update the visible news items
      setPage(nextPage); // Update the page number
      setLoadingMore(false); // Stop lazy loading
    }, 2000); // Simulate a 2-second delay for loading new content
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-8">
      {loading ? (
        <div className="flex justify-center my-8">
          <Loader /> {/* Display Loader when initially loading */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleNews.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <News item={item} />
            </motion.div>
          ))}
        </div>
      )}

      {loadingMore && (
        <div className="flex justify-center my-8">
          <Loader /> {/* Display Loader while lazy loading more news */}
        </div>
      )}

      {!loading && newsData.length > visibleNews.length && (
        <div ref={loaderRef} className="h-8"></div>
      )}
    </div>
  );
  // return (
  //   <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-8">
  //     {/* Show the Loader while the news is being fetched */}
  //     {loading ? (
  //       <div className="flex justify-center my-8">
  //         <Loader />
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  //         {visibleNews?.map((item, index) => (
  //           <motion.div
  //             key={item._id}
  //             initial={{ opacity: 0, y: 10 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             transition={{ delay: index * 0.1 }} // Staggered animation
  //           >
  //             <News item={item} />
  //           </motion.div>
  //         ))}
  //       </div>
  //     )}

  //     {/* Loader for lazy loading */}
  //     {loadingMore && (
  //       <div className="flex justify-center my-8">
  //         <Loader />
  //       </div>
  //     )}

  //     {/* Loader observer to detect when to load more */}
  //     {!loading && newsData.length > visibleNews.length && (
  //       <div ref={loaderRef} className="h-8"></div>
  //     )}
  //   </div>
  // );
};

export default Home;
