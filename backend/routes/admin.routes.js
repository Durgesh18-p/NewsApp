import express from "express"
import { updatNews ,deleteNews } from "../controllers/admin.controllers.js"

const adminRouter = express.Router()

adminRouter.put("/:id" , updatNews)
adminRouter.delete("/:id" , deleteNews)

export default adminRouter