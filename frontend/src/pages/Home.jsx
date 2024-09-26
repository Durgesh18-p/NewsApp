import { useState, useEffect } from "react";
// import { path } from "../backendPath";
import axios from "axios";

const Home = () => {
  let [newsData, setNewsData] = useState([]);
  console.log(newsData);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(
        `https://newsapp-vfx1.onrender.com/news`
      );
      setNewsData(data.data);
    } catch (error) {
      console.error("Error fetching news data", error);
    }
  };

  return (
    <>
      <img src={newsData[0]?.image} alt="" className="h-[200px] w-[200px]" />
      <p className="font-bold text-xl">{newsData[0]?.title}</p>
      <p className="font-normal text-[17px]">{newsData[0]?.description}</p>
    </>
  );
};

export default Home;
