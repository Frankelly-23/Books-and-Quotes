const mongoose = require("mongoose")
const { credentials } = require("./config")
const { connectionString } = credentials.mongo


// Models  

const Book = require("./models/book")

if(!connectionString) {
  console.log("Connection string missing")
  process.exit(1)
}

mongoose.connect(connectionString)

const db = mongoose.connection

db.on("error", (err) => {
  console.log("MongoDB err" + err.message)
  process.exit(1)
})

db.once("open", () => {
  console.log("Connection made")
})

module.exports = {
  getBooks: async (options = {}) => {
    return Book.find(options)  

  },
  addBooks: async (options = {}) => {

    const bookThatMatch = await Book.find(options)
    if(bookThatMatch) return 

    try {
      await new Book({
        title: options.title,
        author: options.author,
        opinion: options.opinion,
        isRead: options.isRead
      }).save()

    } catch (err) {
       console.error(err)
    } 
  }
}

