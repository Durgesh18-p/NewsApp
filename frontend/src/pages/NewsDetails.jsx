import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import NewsCarousel from "../components/NewsCarousel";
import axios from "axios";

const NewsDetails = () => {
  const { id } = useParams(); // Get the news ID from the URL
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(""); // State for the new comment

  // Fetch news details and comments
  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/news/${id}`);
        setNewsItem(response.data.data); // Assuming the data structure from API
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news details:", error);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/comments/${id}`
        );
        setComments(response.data.comments); // Set the comments specific to the news ID
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchNewsDetails();
    fetchComments();
  }, [id]); // Refetch when the news ID changes

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Prevent empty comments

    try {
      const response = await axios.post(
        `http://localhost:8000/comments/${id}`,
        {
          comment: newComment,
        }
      );
      if (response.status === 201) {
        setComments([...comments, response.data]); // Append the new comment
        setNewComment(""); // Clear the text area
      } else {
        console.error("Failed to post comment", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!newsItem) {
    return <p>Error loading news item.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between max-w-7xl mx-auto p-4 lg:p-8">
      {/* News Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full lg:w-3/4 text-justify"
      >
        <motion.img
          src={newsItem.image}
          alt={newsItem.title}
          className="h-[480px] w-full object-cover mb-4 rounded-xl"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {newsItem.title}
        </h1>
        <p className="text-lg font-medium text-gray-600 mb-6">
          {newsItem.description}
        </p>
        <NewsCarousel />
      </motion.div>

      {/* Comment Section */}
      <div className="w-full lg:w-1/4 mt-8 lg:mt-0 lg:pl-8 border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-[#E77917]">Insights!</h2>

        {/* Comments List */}
        <div className="mb-4 max-h-[300px] overflow-y-auto">
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <p className="text-md text-gray-800">{comment.comment}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-md text-gray-500">
                No insights yet. Be the first{" "}
                <span className="text-[#E77917]">observer</span>!
              </p>
            )}
          </div>
        </div>

        {/* Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col space-y-4"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg"
            placeholder="Add an insight..."
            rows="3"
            required
          />
          <button
            type="submit"
            className="self-end px-6 py-2 bg-[#E77917] text-white font-semibold rounded-lg shadow hover:bg-[#fc9033] transition"
          >
            Post Insight
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsDetails;
