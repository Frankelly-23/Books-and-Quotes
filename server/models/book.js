
const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  opinion: String, 
  isRead: Boolean
})  
   
const BookModel = mongoose.model("Book", bookSchema)

module.exports = BookModel
