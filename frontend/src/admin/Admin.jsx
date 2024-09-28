import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

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
      const response = await axios.get("http://localhost:8000/news");
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
      category: newsItem.category, // Set category when editing
    });
    setIsEditMode(true);
    setIsFormVisible(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      try {
        await axios.delete(`http://localhost:8000/admin/${id}`);
        toast.success("News deleted successfully.");
        fetchNews();
      } catch (error) {
        toast.error("Failed to delete news.");
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
          `http://localhost:8000/admin/${currentNews._id}`,
          newNewsData
        );
        toast.success("News updated successfully.");
        setIsEditMode(false);
        setIsFormVisible(false);
        fetchNews();
      } catch (error) {
        toast.error("Failed to update news.");
      }
    } else {
      try {
        await axios.post("http://localhost:8000/", newNewsData);
        toast.success("News created successfully.");
        fetchNews();
      } catch (error) {
        toast.error("Failed to create news.");
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
    setNewNewsData({ title: "", description: "", image: "", category }); // Set category
    setIsEditMode(false);
    setIsFormVisible(true);
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
                      <h3 className="font-semibold">{newsItem.title}</h3>
                      <p className="text-sm">{newsItem.description}</p>
                      <div className="flex justify-between mt-2">
                        <button
                          className="text-green-600 hover:text-green-800"
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

      {isFormVisible && (
        <div className="mt-6 p-4 border rounded shadow-md">
          <h3 className="text-xl font-semibold">
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
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSaveClick}
          >
            {isEditMode ? "Update News" : "Create News"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
