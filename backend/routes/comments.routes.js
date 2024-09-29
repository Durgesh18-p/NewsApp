import express from "express"
import { postComment  ,getComments } from "../controllers/comment.controllers.js"


const commentRouter = express.Router()

commentRouter.post("/:id" , postComment)
commentRouter.get("/:id" , getComments)

export default commentRouter