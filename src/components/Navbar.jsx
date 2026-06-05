import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">🍽️ <span>MealMate</span></Link>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/restaurants">Delivery</Link>
          <Link to="/dine-out">Dine-Out</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/about">About</Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="btn-profile">👤 Profile</Link>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">Login</Link>
              <Link to="/register" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;