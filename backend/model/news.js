import mongoose from "mongoose";

// Define the schema for the News model
const newsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,  // Corrected 'require' to 'required'
  },
  description: {
    type: String,
    required: true,  // Corrected 'require' to 'required'
  },
  category : {
    type : String,
    required : true
  }
}, { timestamps: true });

// Export the News model
const News = mongoose.model('News', newsSchema);
export default News;
