import express from "express";
import { createNews , getNews } from "../controllers/nws.controllers.js";

const router = express.Router();

// POST route to create a news article
router.post("/", createNews);
router.get("/" , getNews)

export default router;
