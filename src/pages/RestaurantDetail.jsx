import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./RestaurantDetail.css";

const restaurantData = {
  "1": { name: "The Grand Spice", cuisine: "North Indian", rating: 4.8, reviews: 1240, priceForTwo: 800, image: "🍛", type: "Fine Dining", location: "Anna Nagar, Chennai", openTime: "11:00 AM - 11:00 PM", phone: "+91 98765 43210" },
  "2": { name: "Coastal Breeze", cuisine: "Seafood", rating: 4.7, reviews: 890, priceForTwo: 1200, image: "🦐", type: "Casual Dining", location: "Adyar, Chennai", openTime: "12:00 PM - 10:00 PM", phone: "+91 98765 43211" },
  "3": { name: "Pasta Paradise", cuisine: "Italian", rating: 4.6, reviews: 654, priceForTwo: 1000, image: "🍝", type: "Fine Dining", location: "Nungambakkam, Chennai", openTime: "11:30 AM - 11:30 PM", phone: "+91 98765 43212" },
};

const menuCategories = {
  Starters: [
    { id: 1, name: "Paneer Tikka", price: 280, emoji: "🧀", veg: true, rating: 4.8 },
    { id: 2, name: "Chicken 65", price: 320, emoji: "🍗", veg: false, rating: 4.9 },
    { id: 3, name: "Hara Bhara Kabab", price: 240, emoji: "🟢", veg: true, rating: 4.5 },
  ],
  "Main Course": [
    { id: 4, name: "Butter Chicken", price: 380, emoji: "🍛", veg: false, rating: 4.9 },
    { id: 5, name: "Dal Makhani", price: 280, emoji: "🫘", veg: true, rating: 4.7 },
    { id: 6, name: "Biryani", price: 420, emoji: "🍚", veg: false, rating: 4.8 },
  ],
  Breads: [
    { id: 7, name: "Butter Naan", price: 50, emoji: "🫓", veg: true, rating: 4.6 },
    { id: 8, name: "Garlic Naan", price: 60, emoji: "🫓", veg: true, rating: 4.7 },
  ],
  Desserts: [
    { id: 9, name: "Gulab Jamun", price: 120, emoji: "🍮", veg: true, rating: 4.8 },
    { id: 10, name: "Kulfi", price: 100, emoji: "🍦", veg: true, rating: 4.6 },
  ],
};

const reviewsData = [
  { name: "Priya S.", rating: 5, comment: "Amazing food and ambiance! The butter chicken was absolutely divine.", date: "28 May 2026", avatar: "👩" },
  { name: "Rahul M.", rating: 4, comment: "Great experience overall. Service was prompt and food was delicious.", date: "25 May 2026", avatar: "👨" },
  { name: "Sneha R.", rating: 5, comment: "Perfect place for a date night. Loved the rooftop seating!", date: "20 May 2026", avatar: "👩" },
];

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menu");
  const [activeCategory, setActiveCategory] = useState("Starters");
  const [cart, setCart] = useState({});
  const [mode, setMode] = useState("delivery");

  const restaurant = restaurantData[id] || restaurantData["1"];

  const addItem = (item) => setCart({ ...cart, [item.id]: (cart[item.id] || 0) + 1 });
  const removeItem = (item) => {
    if (!cart[item.id]) return;
    const updated = { ...cart, [item.id]: cart[item.id] - 1 };
    if (updated[item.id] === 0) delete updated[item.id];
    setCart(updated);
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [itemId, qty]) => {
    const item = Object.values(menuCategories).flat().find(i => i.id === parseInt(itemId));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="rd-page">
      <Navbar />

      {/* header */}
      <div className="rd-header">
        <div className="rd-header-inner">
          <button className="rd-back" onClick={() => navigate(-1)}>← Back</button>
          <div className="rd-hero-info">
            <div className="rd-emoji">{restaurant.image}</div>
            <div>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.cuisine} · {restaurant.type} · {restaurant.location}</p>
              <div className="rd-meta">
                <span>⭐ {restaurant.rating} ({restaurant.reviews} reviews)</span>
                <span>💰 ₹{restaurant.priceForTwo} for two</span>
                <span>🕐 {restaurant.openTime}</span>
              </div>
            </div>
          </div>

          {/* delivery / dine-in toggle */}
          <div className="mode-toggle">
            <button
              className={mode === "delivery" ? "active" : ""}
              onClick={() => setMode("delivery")}
            >
              🚴 Delivery
            </button>
            <button
              className={mode === "dine-in" ? "active" : ""}
              onClick={() => setMode("dine-in")}
            >
              🍽️ Dine-In
            </button>
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="rd-tabs">
        <div className="rd-tabs-inner">
          {["menu", "reviews", "info"].map((tab) => (
            <button
              key={tab}
              className={`rd-tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "menu" ? "📋 Menu" : tab === "reviews" ? "⭐ Reviews" : "ℹ️ Info"}
            </button>
          ))}
        </div>
      </div>

      <div className="rd-content">

        {/* MENU TAB */}
        {activeTab === "menu" && (
          <div className="rd-menu-layout">
            {/* category sidebar */}
            <div className="menu-sidebar">
              {Object.keys(menuCategories).map((cat) => (
                <button
                  key={cat}
                  className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* menu items */}
            <div className="menu-items">
              <h3>{activeCategory}</h3>
              {menuCategories[activeCategory].map((item) => (
                <div className="menu-item-card" key={item.id}>
                  <div className="mic-left">
                    <span className={`veg-indicator ${item.veg ? "veg" : "nonveg"}`} />
                    <div>
                      <div className="mic-name">{item.name}</div>
                      <div className="mic-rating">⭐ {item.rating}</div>
                      <div className="mic-price">₹{item.price}</div>
                    </div>
                  </div>
                  <div className="mic-right">
                    <div className="mic-emoji">{item.emoji}</div>
                    {cart[item.id] ? (
                      <div className="qty-ctrl">
                        <button onClick={() => removeItem(item)}>−</button>
                        <span>{cart[item.id]}</span>
                        <button onClick={() => addItem(item)}>+</button>
                      </div>
                    ) : (
                      <button className="mic-add" onClick={() => addItem(item)}>+ Add</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="rd-reviews">
            <div className="reviews-summary">
              <div className="rating-big">
                <span>{restaurant.rating}</span>
                <div>
                  {"⭐".repeat(Math.floor(restaurant.rating))}
                  <p>{restaurant.reviews} reviews</p>
                </div>
              </div>
            </div>
            <div className="reviews-list">
              {reviewsData.map((r, i) => (
                <div className="review-card" key={i}>
                  <div className="review-top">
                    <div className="review-avatar">{r.avatar}</div>
                    <div>
                      <div className="review-name">{r.name}</div>
                      <div className="review-date">{r.date}</div>
                    </div>
                    <div className="review-stars">{"⭐".repeat(r.rating)}</div>
                  </div>
                  <p className="review-comment">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INFO TAB */}
        {activeTab === "info" && (
          <div className="rd-info">
            <div className="info-card">
              <h3>Restaurant Information</h3>
              <div className="info-row"><span>📍 Location</span><strong>{restaurant.location}</strong></div>
              <div className="info-row"><span>🕐 Hours</span><strong>{restaurant.openTime}</strong></div>
              <div className="info-row"><span>📞 Phone</span><strong>{restaurant.phone}</strong></div>
              <div className="info-row"><span>🍽️ Type</span><strong>{restaurant.type}</strong></div>
              <div className="info-row"><span>💰 Price</span><strong>₹{restaurant.priceForTwo} for two</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* sticky cart bar */}
      {cartCount > 0 && (
        <div className="cart-bar">
          <div className="cart-bar-info">
            <span className="cart-count">{cartCount} items</span>
            <span className="cart-total">₹{cartTotal}</span>
          </div>
          <button
            className="cart-bar-btn"
            onClick={() =>
              mode === "dine-in"
                ? navigate(`/table-booking/${id}`)
                : navigate(`/order/${id}`)
            }
          >
            {mode === "dine-in" ? "Book Table 🍽️" : "Place Order 🚴"} →
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;