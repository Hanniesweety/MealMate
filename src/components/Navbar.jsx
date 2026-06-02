import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍽️ <span>MealMate</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/about">About</Link>
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-signup">Sign Up</Link>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
