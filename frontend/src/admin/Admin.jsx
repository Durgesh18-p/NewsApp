import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion for animation

const Admin = () => {
  const [news, setNews] = useState([]);
  const [categories] = useState([
    "india",
    "international",
    "sport",
    "drama",
    "healthcare",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentNews, setCurrentNews] = useState(null);
  const [newNewsData, setNewNewsData] = useState({
    image: "",
    title: "",
    description: "",
    category: "",
  });

  console.log(news);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapp-vfx1.onrender.com/news");
      if (response.data.success && Array.isArray(response.data.data)) {
        setNews(response.data.data);
      } else {
        toast.error("Unexpected response format.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch news.");
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleEditClick = (newsItem) => {
    setCurrentNews(newsItem);
    setNewNewsData({
      title: newsItem.title,
      description: newsItem.description,
      image: newsItem.image,
      category: newsItem.category,
    });
    setIsEditMode(true);
    setIsFormVisible(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await axios.delete(`https://newsapp-vfx1.onrender.com/admin/${id}`);
        toast.success("News deleted successfully.");
        fetchNews();
      } catch (error) {
        toast.error("Failed to delete news.", error);
      }
    }
  };

  const handleSaveClick = async () => {
    if (!newNewsData.category) {
      toast.error("Please select a category");
      return;
    }

    if (isEditMode) {
      try {
        await axios.put(
          `https://newsapp-vfx1.onrender.com/admin/${currentNews._id}`,
          newNewsData
        );
        toast.success("News updated successfully.");
        setIsEditMode(false);
        setIsFormVisible(false);
        fetchNews();
      } catch (error) {
        toast.error("Failed to update news.", error);
      }
    } else {
      try {
        await axios.post("https://newsapp-vfx1.onrender.com/news", newNewsData);
        toast.success("News created successfully.");
        fetchNews();
      } catch (error) {
        toast.error("Failed to create news.", error);
      }
    }
    setNewNewsData({ title: "", description: "", image: "", category: "" });
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    setNewNewsData({ ...newNewsData, [e.target.name]: e.target.value });
  };

  const handleCreateNewsClick = (category) => {
    setCurrentNews(null);
    setNewNewsData({ title: "", description: "", image: "", category });
    setIsEditMode(false);
    setIsFormVisible(true);
  };

  const handleCloseModal = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category} className="border p-4 rounded shadow-lg">
            <h2
              className="text-xl font-semibold cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </h2>
            <button
              className="flex items-center mt-2 text-blue-600 hover:text-blue-800"
              onClick={() => handleCreateNewsClick(category)}
            >
              <FaPlus className="mr-1" /> Create News
            </button>
            {selectedCategory === category && (
              <div className="mt-4 space-y-4">
                {news
                  .filter((item) => item.category === category)
                  .map((newsItem) => (
                    <div
                      key={newsItem._id}
                      className="border p-4 rounded shadow-md"
                    >
                      <img src={newsItem.image} alt="" />
                      <h3 className="font-semibold">{newsItem.title}</h3>
                      <p className="text-sm">
                        {newsItem.description.split(" ").slice(0, 20).join(" ")}
                        ...
                      </p>
                      <div className="flex justify-between mt-2">
                        <button
                          className="text-[#f09a4e] hover:text-[#E77917]"
                          onClick={() => handleEditClick(newsItem)}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDeleteClick(newsItem._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for Create/Edit Form */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-4">
                {isEditMode ? "Edit News" : "Create News"}
              </h3>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newNewsData.title}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newNewsData.description}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newNewsData.image}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newNewsData.category}
                onChange={handleChange}
                className="mt-2 p-2 border rounded w-full"
              />
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#E77917] text-white rounded hover:bg-[#814a1a]"
                  onClick={handleSaveClick}
                >
                  {isEditMode ? "Update News" : "Create News"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Admin;
