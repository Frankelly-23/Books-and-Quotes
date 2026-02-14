const db = require("../db")

const getBooksFromDb = async (res, options, responseCode = 200) => {

  const booksFromDB = await db.getBooks(options)
  const booksToRender = booksFromDB.map(book => ({
    title: book.title,
    author: book.author,
    opinion: book.opinion || "Not Available"

  }))

  res.json(booksToRender)

}




exports.toRead = (req, res) => {
  getBooksFromDb(res, { isRead: false })

}

exports.haveRead = (req, res) => {
  getBooksFromDb(res, { isRead: true })
}


// To handle data from frontend form
exports.handleReconForm = async (req, res) => {
  const title = req.body.title
  const author = req.body.author
  const opinion = req.body.opinion
  // const isRead = req.body.isRead

  await db.addBooks({ title: title, author: author, opinion: opinion, isRead: true })
  res.json({ result: "ok" })

}


// Internal server error page
exports.internalServerErr = (err, req, res, next) => {
  console.error(err)
  res.status(500)
  res.json({ result: "Error"} )
}
