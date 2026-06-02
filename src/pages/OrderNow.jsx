import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./OrderNow.css";

const menuItems = [
  { id: 1, name: "Chicken Biryani", price: 220, emoji: "🍛", category: "Main" },
  { id: 2, name: "Paneer Butter Masala", price: 180, emoji: "🍲", category: "Main" },
  { id: 3, name: "Garlic Naan", price: 40, emoji: "🫓", category: "Bread" },
  { id: 4, name: "Mango Lassi", price: 60, emoji: "🥛", category: "Drinks" },
  { id: 5, name: "Gulab Jamun", price: 80, emoji: "🍮", category: "Dessert" },
  { id: 6, name: "Veg Fried Rice", price: 160, emoji: "🍚", category: "Main" },
];

const OrderNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState({});
  const [address, setAddress] = useState("");
  const [placed, setPlaced] = useState(false);

  const addItem = (item) =>
    setCart({ ...cart, [item.id]: (cart[item.id] || 0) + 1 });

  const removeItem = (item) => {
    if (!cart[item.id]) return;
    const updated = { ...cart, [item.id]: cart[item.id] - 1 };
    if (updated[item.id] === 0) delete updated[item.id];
    setCart(updated);
  };

  const total = menuItems.reduce(
    (sum, item) => sum + (cart[item.id] || 0) * item.price, 0
  );

  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleOrder = () => {
    if (!address.trim()) return alert("Please enter delivery address!");
    if (itemCount === 0) return alert("Add items to cart first!");
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="order-page">
        <Navbar />
        <div className="order-success">
          <div className="success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your food is being prepared. Estimated delivery: <strong>30 mins</strong></p>
          <div className="success-details">
            <p>📍 Delivering to: <strong>{address}</strong></p>
            <p>💰 Total: <strong>₹{total + 30}</strong></p>
          </div>
          <button className="back-btn" onClick={() => navigate("/restaurants")}>
            Order More Food 🍕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <Navbar />
      <div className="order-container">
        <div className="order-menu">
          <h2>Choose Your Items 🍽️</h2>
          <div className="menu-list">
            {menuItems.map((item) => (
              <div className="menu-item" key={item.id}>
                <div className="menu-item-left">
                  <span className="menu-emoji">{item.emoji}</span>
                  <div>
                    <div className="menu-name">{item.name}</div>
                    <div className="menu-category">{item.category}</div>
                    <div className="menu-price">₹{item.price}</div>
                  </div>
                </div>
                <div className="menu-controls">
                  {cart[item.id] ? (
                    <div className="qty-control">
                      <button onClick={() => removeItem(item)}>−</button>
                      <span>{cart[item.id]}</span>
                      <button onClick={() => addItem(item)}>+</button>
                    </div>
                  ) : (
                    <button className="add-btn" onClick={() => addItem(item)}>
                      + Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* order summary */}
        <div className="order-summary">
          <h3>Order Summary 🛒</h3>
          {itemCount === 0 ? (
            <div className="empty-cart">
              <div style={{fontSize:"3rem"}}>🛒</div>
              <p>Your cart is empty</p>
              <small>Add items from the menu</small>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {menuItems.filter(item => cart[item.id]).map(item => (
                  <div className="cart-item" key={item.id}>
                    <span>{item.emoji} {item.name} x{cart[item.id]}</span>
                    <span>₹{item.price * cart[item.id]}</span>
                  </div>
                ))}
              </div>
              <div className="cart-bill">
                <div className="bill-row"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="bill-row"><span>Delivery</span><span>₹30</span></div>
                <div className="bill-row total"><span>Total</span><span>₹{total + 30}</span></div>
              </div>
            </>
          )}

          <div className="delivery-address">
            <label>📍 Delivery Address</label>
            <textarea
              placeholder="Enter your full delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />
          </div>

          <button
            className="place-order-btn"
            onClick={handleOrder}
            disabled={itemCount === 0}
          >
            Place Order · ₹{total + 30}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;