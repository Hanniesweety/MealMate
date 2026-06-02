import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AuthPages.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match!");
    }
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email, password: form.password
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("token", data.token);
      navigate("/restaurants");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <Navbar />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🍽️</div>
            <h2>Create Account</h2>
            <p>Join MealMate and start ordering!</p>
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text" name="name"
                placeholder="Your full name"
                value={form.name} onChange={handleChange} required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email" name="email"
                placeholder="you@example.com"
                value={form.email} onChange={handleChange} required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password" name="password"
                placeholder="Min 6 characters"
                value={form.password} onChange={handleChange} required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password" name="confirmPassword"
                placeholder="Repeat your password"
                value={form.confirmPassword} onChange={handleChange} required
              />
            </div>
            <button type="submit" className="auth-btn">Create Account</button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;