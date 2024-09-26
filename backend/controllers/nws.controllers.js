import News from "../model/news.js";

export const createNews = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { image, title, description } = req.body;

    // Check if any of the required fields are missing
    if (!image || !title || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new news document
    const news = new News({
      image,
      title,
      description,
    });

    // Save the news to the database
    await news.save();

    // Return success response
    res.status(201).json({ message: 'News created successfully', news });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getNews = async (req, res) => {
  try {
    const news = await News.find({}); 
    res.status(200).json({ success: true, message: "All news fetched", data: news }); 
  } catch (error) {
    res.status(404).json({ success: false, message: "Error in fetching all news" });
  }
};
