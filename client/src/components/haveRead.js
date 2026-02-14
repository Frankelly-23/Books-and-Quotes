import { useState, useEffect } from "react"
import { BookItem } from "./toRead"

function BooksFromTheServer() {
  const [books, setBooks] = useState([])

  useEffect(()=> {
    fetch("/api/have-read")
      .then(resp => resp.json())
      .then(setBooks)
  }, [])
   
  return (
    <>
    {
      books.map((book, index) => (
        <BookItem key={index} book={book}/> 
    ))
    }
    </>
  )
}

export default function HaveRead(){
  return (
    <>
      <h2>Books I've Read</h2>
      <div className="list-container">
        <div className="book-list">
          <ul>
           <BooksFromTheServer/> 
          </ul>
        </div>
      </div>
    </>
  )  
}
