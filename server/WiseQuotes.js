
const express = require("express")
const handlers = require("./lib/handlers")
const app = express()

const PORT = 2323

// const formMessages = require("./lib/middleware/formSuccessMessage")





// app.use(express.static(__dirname + "/public"))


// form message middleware 
//app.use(formMessages)


app.use(express.urlencoded({extended: true}))
app.use(express.json())

// database
const db = require("./db")

// Get the to Read list to the front 

app.get("/to-read", handlers.toRead)

// Get the Have Read list to the front 

app.get("/have-read", handlers.haveRead)

app.post("/recommend/user-recommendation", handlers.handleReconForm)

// test


app.listen(PORT, ()=> {
  console.log("Listening...")
})
