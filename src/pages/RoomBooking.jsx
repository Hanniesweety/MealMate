import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./RoomBooking.css";

const RoomBooking = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { hotel, room } = location.state || {};

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const [form, setForm] = useState({
    checkIn: today, checkOut: tomorrow,
    guests: "1", name: "", email: "", phone: "",
    requests: "", addFood: false,
  });
  const [booked, setBooked] = useState(false);
  const [bookingId] = useState(`HTL${Math.floor(Math.random() * 90000) + 10000}`);

  const handleChange = (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const nights = Math.max(1, Math.ceil(
    (new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)
  ));

  const roomPrice = room?.price || 4500;
  const subtotal = roomPrice * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes + (form.addFood ? 500 : 0);

  const handleBook = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all required fields!");
      return;
    }
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="rb-page">
        <Navbar />
        <div className="rb-success">
          <div className="rb-success-card">
            <div className="rb-success-icon">🏨</div>
            <h2>Booking Confirmed!</h2>
            <p>Your room has been successfully reserved</p>
            <div className="rb-booking-id">Booking ID: <strong>{bookingId}</strong></div>
            <div className="rb-booking-details">
              <div className="rb-detail-row"><span>🏨 Hotel</span><strong>{hotel?.name}</strong></div>
              <div className="rb-detail-row"><span>🛏️ Room</span><strong>{room?.name}</strong></div>
              <div className="rb-detail-row"><span>📅 Check-In</span><strong>{form.checkIn}</strong></div>
              <div className="rb-detail-row"><span>📅 Check-Out</span><strong>{form.checkOut}</strong></div>
              <div className="rb-detail-row"><span>🌙 Nights</span><strong>{nights}</strong></div>
              <div className="rb-detail-row"><span>👥 Guests</span><strong>{form.guests}</strong></div>
              <div className="rb-detail-row total"><span>💰 Total Paid</span><strong>₹{total.toLocaleString()}</strong></div>
            </div>
            <p className="rb-confirm-note">📧 Confirmation sent to <strong>{form.email}</strong></p>
            <div className="rb-success-btns">
              <button className="rb-btn-primary" onClick={() => navigate("/profile")}>View My Bookings</button>
              <button className="rb-btn-secondary" onClick={() => navigate("/hotels")}>Explore More Hotels</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rb-page">
      <Navbar />

      <div className="rb-header">
        <div className="rb-header-inner">
          <button className="rb-back" onClick={() => navigate(-1)}>← Back</button>
          <h2>Complete Your Booking</h2>
          <p>{hotel?.name} · {room?.name}</p>
        </div>
      </div>

      <div className="rb-container">
        <div className="rb-form">

          {/* dates */}
          <div className="rb-card">
            <h3>Stay Details</h3>
            <div className="rb-row">
              <div className="rb-field">
                <label>Check-In Date *</label>
                <input type="date" name="checkIn" min={today} value={form.checkIn} onChange={handleChange} />
              </div>
              <div className="rb-field">
                <label>Check-Out Date *</label>
                <input type="date" name="checkOut" min={form.checkIn} value={form.checkOut} onChange={handleChange} />
              </div>
            </div>
            <div className="rb-field" style={{marginTop:"1rem"}}>
              <label>Number of Guests *</label>
              <select name="guests" value={form.guests} onChange={handleChange}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div className="nights-badge">🌙 {nights} night{nights > 1 ? "s" : ""} stay</div>
          </div>

          {/* guest details */}
          <div className="rb-card">
            <h3>Guest Details</h3>
            <div className="rb-row">
              <div className="rb-field">
                <label>Full Name *</label>
                <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} />
              </div>
              <div className="rb-field">
                <label>Email *</label>
                <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} />
              </div>
            </div>
            <div className="rb-field" style={{marginTop:"1rem"}}>
              <label>Phone Number *</label>
              <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} />
            </div>
            <div className="rb-field" style={{marginTop:"1rem"}}>
              <label>Special Requests (optional)</label>
              <textarea name="requests" rows={3} placeholder="Early check-in, high floor, extra pillows..." value={form.requests} onChange={handleChange} />
            </div>
          </div>

          {/* add-ons */}
          <div className="rb-card">
            <h3>Add-Ons</h3>
            <label className="rb-addon">
              <input type="checkbox" name="addFood" checked={form.addFood} onChange={handleChange} />
              <div className="rb-addon-info">
                <span>🍳 Breakfast Package</span>
                <small>Daily breakfast for all guests — ₹500/stay</small>
              </div>
              <span className="rb-addon-price">+₹500</span>
            </label>
          </div>
        </div>

        {/* price summary */}
        <div className="rb-summary">
          <div className="rb-summary-hotel">
            <span className="rb-summary-emoji">{hotel?.image || "🏨"}</span>
            <div>
              <h4>{hotel?.name}</h4>
              <p>{room?.name}</p>
            </div>
          </div>
          <div className="rb-price-breakdown">
            <div className="rb-price-row"><span>₹{roomPrice.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span><span>₹{subtotal.toLocaleString()}</span></div>
            {form.addFood && <div className="rb-price-row"><span>🍳 Breakfast</span><span>₹500</span></div>}
            <div className="rb-price-row"><span>Taxes & fees (12%)</span><span>₹{taxes.toLocaleString()}</span></div>
            <div className="rb-price-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
          </div>
          <div className="rb-room-specs">
            <span>📐 {room?.size}</span>
            <span>🛏️ {room?.beds}</span>
            <span>👥 Max {room?.maxGuests}</span>
          </div>
          <button className="rb-book-btn" onClick={handleBook}>
            Confirm Booking · ₹{total.toLocaleString()}
          </button>
          <p className="rb-free-cancel">✅ Free cancellation before check-in</p>
        </div>
      </div>
    </div>
  );
};

export default RoomBooking;