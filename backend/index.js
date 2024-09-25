import express from "express"
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"

const app = express()

dotenv.config()

const PORT = 5000

app.listen(PORT , () => {
  connectDB()
  console.log(`http://localhost:${PORT}`);
})

app.get("/" , (req,res) => {
  res.send("Server is running")
})