import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./AuthPages.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
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
            <h2>Welcome Back!</h2>
            <p>Login to order your favourite food</p>
          </div>

          {error && <div className="auth-error">⚠️ {error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                value={form.password} onChange={handleChange} required
              />
            </div>
            <div className="auth-forgot">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>
            <button type="submit" className="auth-btn">Login</button>
          </form>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;