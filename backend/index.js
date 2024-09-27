import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/newsRoutes.routes.js";
import cors from "cors";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use('/news', router);

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST

app.listen(PORT, HOST , async () => {
  try {
    await connectDB(); 
    console.log(`Server running on http://${HOST}:${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); 
  }
});

server.keepAliveTimeout = 120000; 
server.headersTimeout = 120000;
