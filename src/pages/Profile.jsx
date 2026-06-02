import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", phone: "", address: "" });
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // localStorage-la saved user data load pann
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const orders = [
    { id: "ORD001", restaurant: "Biryani House", items: "Chicken Biryani x2", total: 480, status: "Delivered", date: "01 Jun 2026" },
    { id: "ORD002", restaurant: "Pizza Palace", items: "Margherita Pizza x1", total: 320, status: "Delivered", date: "28 May 2026" },
    { id: "ORD003", restaurant: "Burger Barn", items: "Zinger Burger x2", total: 380, status: "On the way", date: "02 Jun 2026" },
  ];

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">

        {/* profile header */}
        <div className="profile-header">
          <div className="profile-avatar">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
          <div className="profile-info">
            <h2>{user.name || "Foodie User"}</h2>
            <p>{user.email || "No email set"}</p>
            <span className="profile-badge">🍽️ MealMate Member</span>
          </div>
          <button
            className="edit-btn"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "✕ Cancel" : "✏️ Edit Profile"}
          </button>
        </div>

        {saved && (
          <div className="success-toast">✅ Profile saved successfully!</div>
        )}

        {/* profile form */}
        <div className="profile-card">
          <h3>Personal Details</h3>
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name" value={user.name}
                  onChange={handleChange} disabled={!editing}
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  name="email" value={user.email}
                  onChange={handleChange} disabled={!editing}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone" value={user.phone}
                  onChange={handleChange} disabled={!editing}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="form-group">
                <label>Default Address</label>
                <input
                  name="address" value={user.address}
                  onChange={handleChange} disabled={!editing}
                  placeholder="Your delivery address"
                />
              </div>
            </div>
            {editing && (
              <button className="save-btn" onClick={handleSave}>
                💾 Save Changes
              </button>
            )}
          </div>
        </div>

        {/* order history */}
        <div className="profile-card">
          <h3>Order History 📦</h3>
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-item" key={order.id}>
                <div className="order-left">
                  <div className="order-id">#{order.id}</div>
                  <div className="order-restaurant">{order.restaurant}</div>
                  <div className="order-items">{order.items}</div>
                  <div className="order-date">{order.date}</div>
                </div>
                <div className="order-right">
                  <div className="order-total">₹{order.total}</div>
                  <div className={`order-status ${order.status === "Delivered" ? "delivered" : "ongoing"}`}>
                    {order.status === "Delivered" ? "✅" : "🚴"} {order.status}
                  </div>
                  <button className="reorder-btn">Reorder</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* logout */}
        <button className="logout-full-btn" onClick={handleLogout}>
          🚪 Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;