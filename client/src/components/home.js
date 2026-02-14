import { useState, useEffect } from "react"

export default function Quote(){
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("") 

  useEffect(()=>{
       fetch("/zenquote-api/api/random")
        .then((resp) => resp.json()) 
        .then((data) => {
        setQuote(data[0].q)
        setAuthor(data[0].a)
      })
        
       
  },[])
  return (
    <div className="container">
      <div className="quote">
        {quote}
      </div>
      <div className="author">
        — {author} 
      </div>
    </div>
  )
}
