import { useState, useEffect } from "react"
import { BookItem } from "../hooks/bookItem"
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"

function BooksFromTheServer() {
  const [books, setBooks] = useState([])
    useEffect(() => {

        fetch("/api/to-read")
          .then(resp => resp.json())
          .then(data => setBooks(data)) 
    }, []) 

    const { displayedItems, hasMore, loaderRef } = useInfiniteScroll(books, 5, 5)
    
    return (
    <>
    {
        displayedItems.map((book, index) => (
          <BookItem key={index} book={book} />
        ))
    }
    {hasMore && <div ref={loaderRef} style={{ height: "20px" }} />}
    </>
  )
}

export default function ToRead(){

  return (
    <>
      <h2>Books To read</h2>
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
