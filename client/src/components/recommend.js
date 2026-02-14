import { useState } from "react"

function Form({formData, handleSubmit, handleChange}) {

  return (
    <>
      <h2>Book Recommendation</h2>
      <div className="form-container" id="form-container">
        <form className="book-form" id="recommend-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="title" placeholder="Book Title" value={formData.title} onChange={handleChange} required/>
          </div>

          <div className="form-group">
            <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <textarea placeholder="Why do you recommend it?" name="opinion" rows="4" value={formData.opinion} onChange={handleChange}></textarea>
          </div>

          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name (optional)" value={formData.name} onChange={handleChange}/>
          </div>

          <div className="form-group">
            <button type="submit">Submit Recommendation</button>
          </div>
        </form>
      </div>
    </>
  )
}


function FormOnceSent({formData, onReset}){
  return (
    <div className="form-container success-container">
      <div className="success-content">
        <div className="success-icon">✓</div>
        <h2>Recommendation Sent</h2>
        <hr />
        <p>Thank you for sharing <strong>"{formData.title}"</strong> with us.</p>
        <p className="success-subtext">We have received your entry and added it to the collection.</p>
        <button 
          className="reset-button" 
          onClick={onReset}
        >
          Submit Another
        </button>
      </div>
    </div>
  )
}

function FormOnceError({onReset}){
  return (
    <div className="form-container error-container">
      <div className="error-content">
        <div className="error-icon">✗</div>
        <h2>Submission Failed</h2>
        <hr />
        <p>We're sorry, something went wrong while submitting your recommendation.</p>
        <p className="error-subtext">Please try again.</p>
        <button 
          className="reset-button" 
          onClick={onReset}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}


export default function RecommendForm(){

  const initialFormState = { title: "", author: "", name: "", opinion: "" }
  const [ formData, setFormData ] = useState(initialFormState)  
  const [ isSubmitted, setIsSubmitted ] = useState(false)
  const [ hasError, setHasError ] = useState(false)

  function handleChange(evt){
    const { name, value } = evt.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    // Regex to allow alphanumeric characters, spaces, and common punctuation
    // Also includes a range for common international characters (e.g., accented letters)
    const titleRegex = /^[a-zA-Z0-9\s.,'":;!?\u00C0-\u017F-]+$/;

    if (!titleRegex.test(formData.title) || !titleRegex.test(formData.name)) {
      alert("Book Title contains invalid characters. Please use only letters, numbers, spaces, and common punctuation (.,' \":;!?-).");
      return;
    }

    const body = JSON.stringify(formData)
    const url = "/api/recommend/user-recommendation"
    const headers = { "Content-Type": "application/json"}
    
    fetch(url, { method: "POST", headers, body})
      .then(data => {
        if (!data.ok) {
          throw new Error("Network response was not ok.")
        }
        return data.json()
      })
      .then( (resp) => {
        if(resp.result === "ok") {
          setIsSubmitted(true)
        } else {
          // Handle cases where the server responds with an error (e.g., validation)
          throw new Error("Submission was not successful.")
        }
      }) 
      .catch(err => {
        console.error("There was an error with the fetch operation:", err)
        setHasError(true)
      })
  }

  function handleReset() {
    setFormData(initialFormState);
    setIsSubmitted(false);
    setHasError(false);
  }

  return (
    <> 
      { hasError
        ? <FormOnceError onReset={handleReset} />
        : isSubmitted 
          ? <FormOnceSent formData={formData} onReset={handleReset} /> 
          : <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData}/>
      } 
    </>
  )
}
