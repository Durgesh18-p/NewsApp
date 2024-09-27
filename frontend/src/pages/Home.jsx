import { useState, useEffect } from "react";
import News from "../components/News";
import Loader from "../components/Loader";
import axios from "axios";

const Home = () => {
  const [newsData, setNewsData] = useState([]); // Use 'const' and ensure the initial state is an empty array
  const [loading, setLoading] = useState(true); // Add a loading state to track whether data is being fetched

  console.log(newsData);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/news`);
      setNewsData(data.data);
      setLoading(false); // Stop loading once data is fetched
    } catch (error) {
      console.error("Error fetching news data", error);
      setLoading(false); // Stop loading even if there's an error
    }
  };

  if (loading) {
    return <Loader />; // Render the loader while data is loading
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32  py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsData?.map((item) => (
          <News key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
