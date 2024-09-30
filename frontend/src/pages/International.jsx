import { useEffect, useState } from "react";
import axios from "axios";
import News from "../components/News";
import Loader from "../components/Loader";

const International = () => {
  const [indiaNews, setIndiaNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data using Axios
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapp-vfx1.onrender.com/news");
        console.log(response.data.data[0].category);

        const filteredNews = response.data.data.filter(
          (news) => news.category.toLowerCase() === "international"
        );
        setIndiaNews(filteredNews);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news", err);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-7xl p-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          International News
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {indiaNews.length > 0 ? (
            indiaNews.map((item) => <News item={item} key={item._id} />)
          ) : (
            <p className="text-center col-span-full">
              No news available for India.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default International;
