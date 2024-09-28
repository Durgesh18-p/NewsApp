import express from "express"
import { userSignup , userLogin } from "../controllers/authentication.controllers.js"
const userRoutes = express.Router()

userRoutes.post("/" , userSignup)
userRoutes.post("/" , userLogin)

export default userRoutes