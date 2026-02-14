import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

import Quote from './components/home';
import ToRead from './components/toRead';
import HaveRead from './components/haveRead';
import RecomendForm from './components/recommend';

function App() {
  return (
      <Router>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">BOOKS & QUOTES</Link>
          <ul className="nav-links">
            <li><Link to="/">Random Quote</Link></li>
            <li><Link to="/to-read">To Read</Link></li>
            <li><Link to="/have-read">Have Read</Link></li>
            <li><Link to="/recommend">Recommend</Link></li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
      <Routes>
          <Route path='/' exact element={<Quote/>}/>
          <Route path='/to-read' exact element={<ToRead/>}/>
          <Route path='/have-read' exact element={<HaveRead/>}/>
          <Route path='/recommend' exact element={<RecomendForm/>}/>
      </Routes>
      </main>

      <footer className="footer">
        <p>Frankelly Cordero TM • Books & Thoughts</p>
      </footer>
      </Router>
  );
}

export default App;
