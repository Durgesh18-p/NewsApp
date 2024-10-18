import mongoose from "mongoose"

export const connectDB = async () =>{
  try {
    // const connection = await mongoose.connect(process.env.MONGO_URL , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // })
    await mongoose.connect("mongodb+srv://durgeshsuryawanshi23:kH9Dq19X4W3lmdN2@cluster0.yvid9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Database Connected");
    
  } catch (error) {
    console.log("DB conection error",error.message);
    process.exit(1)
  }
}