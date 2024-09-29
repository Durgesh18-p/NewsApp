import Comment from "../model/comment.js";

export const postComment = async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Comment is required." });
  }

  try {
    const newComment = new Comment({ comment });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Error posting comment." });
  }
}

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 }); 
    res.status(200).json({ message: "fetched comments."  , comments});
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments." });
  }
}

