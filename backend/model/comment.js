import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment : {
    type : String,
    require : true
  }
},{timestamps : true})

const Comment = mongoose.model("Comments" , commentSchema)
export default Comment