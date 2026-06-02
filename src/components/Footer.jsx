import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <div className="footer-logo">🍽️ MealMate</div>
        <p>Delivering happiness to your doorstep, one meal at a time.</p>
        <div className="footer-socials">
          <span>📘</span><span>📸</span><span>🐦</span>
        </div>
      </div>

      <div className="footer-links">
        <h4>Company</h4>
        <Link to="/about">About Us</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/blog">Blog</Link>
      </div>

      <div className="footer-links">
        <h4>Support</h4>
        <Link to="/help">Help Center</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="footer-links">
        <h4>Legal</h4>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms of Service</Link>
        <Link to="/refund">Refund Policy</Link>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 MealMate. All rights reserved. Made with ❤️</p>
    </div>
  </footer>
);

export default Footer;