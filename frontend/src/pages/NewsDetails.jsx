import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import NewsCarousel from "../components/NewsCarousel";
import axios from "axios";

// List of emojis for the dropdown
const emojiList = [
  '😀', '😂', '😃', '😄', '😅', '😇', '😉', '😊', '😋', '😎', 
  '😍', '😢', '😡', '🥳', '🤔', '😱', '🤗', '😴', '😵', '💔' , '👍'
];

const NewsDetails = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showEmojiDropdown, setShowEmojiDropdown] = useState(false); // State for showing/hiding emoji dropdown
  const [isSubmitting, setIsSubmitting] = useState(false); // State for submitting comments

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/news/${id}`);
        setNewsItem(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news details:", error);
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/comments/${id}`);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchNewsDetails();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true); // Set submitting state

    try {
      const response = await axios.post(`http://localhost:8000/comments/${id}`, {
        comment: newComment,
      });

      if (response.status === 201) {
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment("");
      } else {
        console.error("Failed to post comment", response.data.error);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  const handleEmojiClick = (emoji) => {
    setNewComment((prevComment) => prevComment + emoji);
    setShowEmojiDropdown(false); // Close dropdown after selecting emoji
  };

  if (loading) {
    return <Loader />;
  }

  if (!newsItem) {
    return <p>Error loading news item.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between max-w-7xl mx-auto p-4 lg:p-8">
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

      <div className="w-full lg:w-1/4 mt-8 lg:mt-0 lg:pl-8 border-gray-300 relative"> {/* Add relative positioning */}
        <h2 className="text-2xl font-semibold mb-4 text-[#E77917]">Observed any Insights? Post here!</h2>
        <div className="mb-4 max-h-[300px] overflow-y-auto">
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-200 rounded-lg shadow-sm"
                >
                  <p className="text-lg font-medium text-gray-800">{comment.comment}</p>
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

        <form
          onSubmit={handleCommentSubmit}
          className="flex flex-col space-y-4"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg font-semibold"
            placeholder="Add an insight..."
            rows="3"
            required
          />
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setShowEmojiDropdown(!showEmojiDropdown)}
              className="px-4 py-2 bg-gray-200 text-black font-semibold rounded-lg shadow transition"
            >
              {showEmojiDropdown ? "Close Emoji" : "Add Emoji"}
            </button>
            {showEmojiDropdown && (
              <div className="absolute z-10 bg-white border rounded shadow-lg mt-[200px]  w-full"> {/* Use full width */}
                <div className="flex flex-wrap p-2 justify-center"> {/* Center emojis */}
                  {emojiList.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiClick(emoji)}
                      className="p-1 text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button
              type="submit"
              className={`px-6 py-2 bg-[#E77917] text-white font-semibold rounded-lg shadow hover:bg-[#fc9033] transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting} // Disable button while submitting
            >
              {isSubmitting ? "Posting..." : "Post Insight"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsDetails;
