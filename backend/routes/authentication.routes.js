import express from "express"
import { userSignup , userLogin } from "../controllers/authentication.controllers.js"
const userRoutes = express.Router()

userRoutes.post("/signup" , userSignup)
userRoutes.post("/login" , userLogin)

export default userRoutes