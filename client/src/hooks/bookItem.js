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

