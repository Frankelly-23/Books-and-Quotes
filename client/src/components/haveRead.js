import { useState, useEffect } from "react"
import { BookItem } from "../hooks/bookItem"
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"

function BooksFromTheServer() {
  const [books, setBooks] = useState([])

  useEffect(()=> {
    fetch("/api/have-read")
      .then(resp => resp.json())
      .then(setBooks)
  }, [])
   
  const { displayedItems, hasMore, loaderRef } = useInfiniteScroll(books, 5, 5)
    
  return (
    <>
    {
      displayedItems.map((book, index) => (
        <BookItem key={index} book={book}/> 
      ))
    }
    {hasMore && <div ref={loaderRef} style={{ height: "20px" }} />}
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
