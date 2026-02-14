
import { useState, useEffect } from "react"

export function BookItem({ book }) {
  const [isOpinionVisible, setIsOpinionVisible] = useState(false);

  function handleOpinionClick() {
    setIsOpinionVisible(!isOpinionVisible);
  }

  return (
    <li>
      <i onClick={handleOpinionClick} style={{ cursor: 'pointer' }}>
        {book.title} - {book.author}
      </i>
      {isOpinionVisible && <p style={{ color: "white", background: "rgba(255, 255, 255, 0.05)", padding:"4px", borderRadius:"5px"  }}>{book.opinion}</p>}
    </li>
  );
}

function BooksFromTheServer() {
  const [books, setBooks] = useState([])
    useEffect(() => {

        fetch("/api/to-read")
          .then(resp => resp.json())
          .then(data => setBooks(data)) 
  }, []) 
  
  return (
    <>
    {
        books.map((book, index) => (
          <BookItem key={index} book={book} />
        ))
     
    }
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
