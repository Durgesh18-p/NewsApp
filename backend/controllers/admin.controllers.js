import News from "../model/news.js";

export const updatNews = 
  async (req,res) => {
    const {id} = req.params;
  
    const news = req.body;
  
    try {
      const updatedNews = await News.findByIdAndUpdate(id , news , {new:true})
      res.status(200).json({success : true , message:"News updated" , data : updatedNews})
    } catch (error) {
      res.status(500).json({success : false , message:"Error in News update"})
    }
  }

  export const deleteNews = 
  async (req,res) => {
    const {id} = req.params;
    try {
      await News.findByIdAndDelete(id)
      res.status(200).json({success : true , message : "Product Deleted"})
    } catch (error) {
      res.status(404).json({success : false , message : "Error in Product Delete"})
    }
  }
