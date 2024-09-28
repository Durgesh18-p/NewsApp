import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });


const Signup = mongoose.model("Signup", signupSchema);
const Login = mongoose.model("Login", loginSchema);

export { Signup, Login };
