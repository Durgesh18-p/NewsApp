import express from "express"
import { userSignup , userLogin , userLogout } from "../controllers/authentication.controllers.js"
const userRoutes = express.Router()

userRoutes.post("/signup" , userSignup)
userRoutes.post("/login" , userLogin)
userRoutes.post("/logout" , userLogout)

export default userRoutes