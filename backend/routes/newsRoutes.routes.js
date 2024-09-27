import express from "express";
import { createNews , getNews, getOneNews } from "../controllers/nws.controllers.js";

const router = express.Router();

// POST route to create a news article
router.post("/", createNews);
router.get("/" , getNews)
router.get('/:id' , getOneNews)

export default router;
