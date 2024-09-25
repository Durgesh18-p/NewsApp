import express from "express"
const app = express()

const PORT = 5000

app.listen(PORT , () => {
  console.log(`http://localhost:${PORT}`);
})

app.get("/" , (req,res) => {
  res.send("Server is running")
})