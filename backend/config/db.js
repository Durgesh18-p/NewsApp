import mongoose from "mongoose"

export const connectDB = async () =>{
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL)
    console.log("Database Connected");
    
  } catch (error) {
    console.log("DB conection error",error.message);
    process.exit(1)
  }
}