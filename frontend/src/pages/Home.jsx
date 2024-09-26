import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  let [newsData, setNewsData] = useState([]);
  console.log(newsData);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const data = await axios.get("http://localhost:8000/news");
    setNewsData(data.data.data);
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
