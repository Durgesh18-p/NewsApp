import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import router from "./routes/newsRoutes.routes.js";
import adminRouter from "./routes/admin.routes.js";
import userRoutes from "./routes/authentication.routes.js";
import commentRouter from "./routes/comments.routes.js";
import cors from "cors";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'https://the-observers-insight.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

app.use('/news', router);
app.use('/admin', adminRouter);
app.use('/user', userRoutes)
app.use('/comments', commentRouter)

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST

app.listen(PORT , async () => {
  try {
    await connectDB(); 
    console.log(`Server running on http://${HOST}:${PORT}`);
    // console.log(`server running on http://localhost:${PORT}`);
    
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); 
  }
});

// server.keepAliveTimeout = 120000; 
// server.headersTimeout = 120000;
