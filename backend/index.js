import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/newsRoutes.routes.js";

dotenv.config();  // Load environment variables first

const app = express();

// Middleware for JSON parsing and CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define routes
app.use('/news', router);

// Connect to the database and start the server
const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  try {
    await connectDB();  // Connect to the MongoDB database
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);  // Exit if there's an error starting the server
  }
});
