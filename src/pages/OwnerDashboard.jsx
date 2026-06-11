import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const restaurantInfo = {
  name: "The Grand Spice",
  cuisine: "North Indian",
  rating: 4.8,
  totalOrders: 1240,
  isOpen: true,
  image: "https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?w=400",
};

const stats = [
  { label: "Today's Revenue", value: "₹12,480", change: "+18%", icon: "💰", positive: true },
  { label: "Total Orders", value: "48", change: "+12%", icon: "📦", positive: true },
  { label: "Avg Order Value", value: "₹260", change: "+5%", icon: "📈", positive: true },
  { label: "Cancelled", value: "3", change: "-2%", icon: "❌", positive: false },
];

const recentOrders = [
  { id: "ORD1001", customer: "Priya S.", items: "Butter Chicken, Naan x2", total: 480, status: "Preparing", time: "2 min ago", address: "Anna Nagar" },
  { id: "ORD1002", customer: "Rahul M.", items: "Biryani x2, Lassi", total: 520, status: "Out for Delivery", time: "8 min ago", address: "T Nagar" },
  { id: "ORD1003", customer: "Sneha R.", items: "Paneer Tikka, Dal", total: 380, status: "Delivered", time: "22 min ago", address: "Adyar" },
  { id: "ORD1004", customer: "Karthik V.", items: "Chicken 65, Fried Rice", total: 440, status: "Pending", time: "1 min ago", address: "Velachery" },
  { id: "ORD1005", customer: "Meera J.", items: "Gulab Jamun x3, Chai", total: 180, status: "Delivered", time: "35 min ago", address: "Nungambakkam" },
  { id: "ORD1006", customer: "Arun K.", items: "Fish Curry, Rice, Naan", total: 560, status: "Cancelled", time: "45 min ago", address: "Mylapore" },
];

const menuItems = [
  { id: 1, name: "Butter Chicken", category: "Main Course", price: 380, available: true, orders: 142, image: "https://img.freepik.com/free-photo/butter-chicken-curry_1220-7566.jpg?w=200" },
  { id: 2, name: "Paneer Tikka", category: "Starters", price: 280, available: true, orders: 98, image: "https://img.freepik.com/free-photo/paneer-tikka-skewers_144627-25935.jpg?w=200" },
  { id: 3, name: "Dal Makhani", category: "Main Course", price: 260, available: false, orders: 76, image: "https://img.freepik.com/free-photo/dal-makhani-black-lentil-curry_144627-25934.jpg?w=200" },
  { id: 4, name: "Chicken Biryani", category: "Rice", price: 420, available: true, orders: 189, image: "https://img.freepik.com/free-photo/biryani-rice-dish_144627-29512.jpg?w=200" },
  { id: 5, name: "Garlic Naan", category: "Breads", price: 60, available: true, orders: 210, image: "https://img.freepik.com/free-photo/naan-bread_144627-25454.jpg?w=200" },
  { id: 6, name: "Gulab Jamun", category: "Desserts", price: 120, available: true, orders: 88, image: "https://img.freepik.com/free-photo/gulab-jamun-indian-sweet_144627-25933.jpg?w=200" },
];

const weeklyData = [
  { day: "Mon", revenue: 8200, orders: 32 },
  { day: "Tue", revenue: 9400, orders: 38 },
  { day: "Wed", revenue: 7800, orders: 30 },
  { day: "Thu", revenue: 11200, orders: 44 },
  { day: "Fri", revenue: 14600, orders: 58 },
  { day: "Sat", revenue: 18400, orders: 72 },
  { day: "Sun", revenue: 16200, orders: 64 },
];

const maxRevenue = Math.max(...weeklyData.map(d => d.revenue));

const statusColors = {
  "Pending": { bg: "#FEF3C7", color: "#D97706" },
  "Preparing": { bg: "#DBEAFE", color: "#2563EB" },
  "Out for Delivery": { bg: "#D1FAE5", color: "#059669" },
  "Delivered": { bg: "#F0FDF4", color: "#16A34A" },
  "Cancelled": { bg: "#FEE2E2", color: "#DC2626" },
};

// ── Component ──────────────────────────────────────────────────────────────────
const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isOpen, setIsOpen] = useState(restaurantInfo.isOpen);
  const [orders, setOrders] = useState(recentOrders);
  const [menu, setMenu] = useState(menuItems);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: "", category: "Main Course", price: "", available: true });
  const [orderFilter, setOrderFilter] = useState("All");
  const [notification, setNotification] = useState("");

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    showNotif(`Order ${id} updated to ${status}`);
  };

  const toggleItemAvailability = (id) => {
    setMenu(menu.map(m => m.id === id ? { ...m, available: !m.available } : m));
    const item = menu.find(m => m.id === id);
    showNotif(`${item.name} marked as ${item.available ? "unavailable" : "available"}`);
  };

  const deleteMenuItem = (id) => {
    const item = menu.find(m => m.id === id);
    setMenu(menu.filter(m => m.id !== id));
    showNotif(`${item.name} removed from menu`);
  };

  const addMenuItem = () => {
    if (!newItem.name || !newItem.price) return;
    const item = { ...newItem, id: Date.now(), orders: 0, price: parseInt(newItem.price), image: "https://img.freepik.com/free-photo/food-plate_144627-46046.jpg?w=200" };
    setMenu([...menu, item]);
    setNewItem({ name: "", category: "Main Course", price: "", available: true });
    setShowAddMenu(false);
    showNotif(`${item.name} added to menu!`);
  };

  const filteredOrders = orderFilter === "All" ? orders : orders.filter(o => o.status === orderFilter);
  const todayRevenue = orders.filter(o => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0);

  return (
    <div className="od-page">

      {/* TOPBAR */}
      <div className="od-topbar">
        <div className="od-topbar-left">
          <button className="od-back" onClick={() => navigate("/")}>← Back</button>
          <div className="od-restaurant-info">
            <img src={restaurantInfo.image} alt={restaurantInfo.name} className="od-rest-img"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/free-photo/restaurant-interior_1127-3392.jpg?w=200"; }}
            />
            <div>
              <h1>{restaurantInfo.name}</h1>
              <p>{restaurantInfo.cuisine} · ⭐ {restaurantInfo.rating}</p>
            </div>
          </div>
        </div>
        <div className="od-topbar-right">
          <div className="od-status-toggle">
            <span>{isOpen ? "🟢 Open" : "🔴 Closed"}</span>
            <label className="od-toggle">
              <input type="checkbox" checked={isOpen} onChange={() => { setIsOpen(!isOpen); showNotif(isOpen ? "Restaurant closed!" : "Restaurant is now open!"); }} />
              <span className="od-toggle-slider" />
            </label>
          </div>
          <button className="od-notif-btn">🔔 <span className="od-notif-badge">3</span></button>
        </div>
      </div>

      {notification && <div className="od-notification">{notification}</div>}

      {/* TABS */}
      <div className="od-tabs">
        {[
          { id: "overview", label: "📊 Overview" },
          { id: "orders", label: "📦 Orders" },
          { id: "menu", label: "🍽️ Menu" },
          { id: "analytics", label: "📈 Analytics" },
        ].map(tab => (
          <button key={tab.id} className={`od-tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="od-content">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="od-overview">

            {/* stats */}
            <div className="od-stats-grid">
              {stats.map((s) => (
                <div className="od-stat-card" key={s.label}>
                  <div className="od-stat-icon">{s.icon}</div>
                  <div className="od-stat-info">
                    <div className="od-stat-value">{s.value}</div>
                    <div className="od-stat-label">{s.label}</div>
                    <div className={`od-stat-change ${s.positive ? "positive" : "negative"}`}>{s.change} from yesterday</div>
                  </div>
                </div>
              ))}
            </div>

            {/* recent orders */}
            <div className="od-card">
              <div className="od-card-header">
                <h3>Recent Orders</h3>
                <button className="od-view-all" onClick={() => setActiveTab("orders")}>View All →</button>
              </div>
              <div className="od-orders-list">
                {orders.slice(0, 4).map((order) => (
                  <div className="od-order-row" key={order.id}>
                    <div className="od-order-left">
                      <div className="od-order-id">{order.id}</div>
                      <div className="od-order-customer">{order.customer}</div>
                      <div className="od-order-items">{order.items}</div>
                    </div>
                    <div className="od-order-right">
                      <div className="od-order-total">₹{order.total}</div>
                      <div className="od-order-time">{order.time}</div>
                      <span className="od-status-badge" style={{ background: statusColors[order.status]?.bg, color: statusColors[order.status]?.color }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* top items */}
            <div className="od-card">
              <div className="od-card-header">
                <h3>🔥 Top Selling Items</h3>
              </div>
              <div className="od-top-items">
                {[...menu].sort((a, b) => b.orders - a.orders).slice(0, 4).map((item, i) => (
                  <div className="od-top-item" key={item.id}>
                    <div className="od-top-rank">#{i + 1}</div>
                    <img src={item.image} alt={item.name} className="od-top-item-img"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/free-photo/food_144627-46046.jpg?w=100"; }}
                    />
                    <div className="od-top-item-info">
                      <div className="od-top-item-name">{item.name}</div>
                      <div className="od-top-item-orders">{item.orders} orders this month</div>
                    </div>
                    <div className="od-top-item-price">₹{item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === "orders" && (
          <div className="od-orders-tab">
            <div className="od-orders-header">
              <h2>All Orders</h2>
              <div className="od-order-filters">
                {["All", "Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"].map(f => (
                  <button key={f} className={`od-filter-btn ${orderFilter === f ? "active" : ""}`} onClick={() => setOrderFilter(f)}>{f}</button>
                ))}
              </div>
            </div>
            <div className="od-orders-full">
              {filteredOrders.map((order) => (
                <div className="od-order-card" key={order.id}>
                  <div className="od-order-card-top">
                    <div>
                      <div className="od-order-id-big">{order.id}</div>
                      <div className="od-order-customer-big">👤 {order.customer}</div>
                      <div className="od-order-addr">📍 {order.address}</div>
                    </div>
                    <span className="od-status-badge-big" style={{ background: statusColors[order.status]?.bg, color: statusColors[order.status]?.color }}>
                      {order.status}
                    </span>
                  </div>
                  <div className="od-order-items-list">{order.items}</div>
                  <div className="od-order-card-bottom">
                    <div className="od-order-meta">
                      <span>💰 ₹{order.total}</span>
                      <span>🕐 {order.time}</span>
                    </div>
                    <div className="od-order-actions">
                      {order.status === "Pending" && (
                        <>
                          <button className="od-action-btn accept" onClick={() => updateOrderStatus(order.id, "Preparing")}>✅ Accept</button>
                          <button className="od-action-btn reject" onClick={() => updateOrderStatus(order.id, "Cancelled")}>❌ Reject</button>
                        </>
                      )}
                      {order.status === "Preparing" && (
                        <button className="od-action-btn dispatch" onClick={() => updateOrderStatus(order.id, "Out for Delivery")}>🚴 Dispatch</button>
                      )}
                      {order.status === "Out for Delivery" && (
                        <button className="od-action-btn delivered" onClick={() => updateOrderStatus(order.id, "Delivered")}>✅ Mark Delivered</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── MENU TAB ── */}
        {activeTab === "menu" && (
          <div className="od-menu-tab">
            <div className="od-menu-header">
              <h2>Menu Management</h2>
              <button className="od-add-item-btn" onClick={() => setShowAddMenu(true)}>+ Add Item</button>
            </div>

            {/* Add Item Modal */}
            {showAddMenu && (
              <div className="od-modal-overlay" onClick={() => setShowAddMenu(false)}>
                <div className="od-modal" onClick={(e) => e.stopPropagation()}>
                  <h3>Add New Menu Item</h3>
                  <div className="od-modal-form">
                    <div className="od-form-field">
                      <label>Item Name *</label>
                      <input type="text" placeholder="e.g. Chicken Tikka Masala" value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
                    </div>
                    <div className="od-form-field">
                      <label>Category</label>
                      <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                        {["Starters", "Main Course", "Rice", "Breads", "Drinks", "Desserts"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="od-form-field">
                      <label>Price (₹) *</label>
                      <input type="number" placeholder="e.g. 350" value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
                    </div>
                    <div className="od-modal-actions">
                      <button className="od-modal-cancel" onClick={() => setShowAddMenu(false)}>Cancel</button>
                      <button className="od-modal-save" onClick={addMenuItem}>Add Item</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="od-menu-grid">
              {menu.map((item) => (
                <div className={`od-menu-card ${!item.available ? "unavailable" : ""}`} key={item.id}>
                  <div className="od-menu-card-img">
                    <img src={item.image} alt={item.name}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://img.freepik.com/free-photo/food_144627-46046.jpg?w=200"; }}
                    />
                    {!item.available && <div className="od-menu-unavailable-tag">Unavailable</div>}
                  </div>
                  <div className="od-menu-card-body">
                    <div className="od-menu-item-top">
                      <h4>{item.name}</h4>
                      <span className="od-menu-category">{item.category}</span>
                    </div>
                    <div className="od-menu-item-meta">
                      <span className="od-menu-price">₹{item.price}</span>
                      <span className="od-menu-orders">📦 {item.orders} orders</span>
                    </div>
                    <div className="od-menu-actions">
                      <button
                        className={`od-avail-btn ${item.available ? "available" : "unavail"}`}
                        onClick={() => toggleItemAvailability(item.id)}
                      >
                        {item.available ? "✅ Available" : "❌ Unavailable"}
                      </button>
                      <button className="od-delete-btn" onClick={() => deleteMenuItem(item.id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ANALYTICS TAB ── */}
        {activeTab === "analytics" && (
          <div className="od-analytics-tab">
            <h2>Weekly Analytics</h2>

            {/* revenue chart */}
            <div className="od-card">
              <div className="od-card-header">
                <h3>📊 Revenue This Week</h3>
                <span className="od-total-revenue">Total: ₹{weeklyData.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</span>
              </div>
              <div className="od-chart">
                {weeklyData.map((d) => (
                  <div className="od-chart-col" key={d.day}>
                    <div className="od-chart-value">₹{(d.revenue / 1000).toFixed(1)}k</div>
                    <div className="od-chart-bar-wrap">
                      <div className="od-chart-bar" style={{ height: `${(d.revenue / maxRevenue) * 160}px` }} />
                    </div>
                    <div className="od-chart-day">{d.day}</div>
                    <div className="od-chart-orders">{d.orders} orders</div>
                  </div>
                ))}
              </div>
            </div>

            {/* summary cards */}
            <div className="od-analytics-summary">
              <div className="od-ana-card">
                <div className="od-ana-icon">📦</div>
                <div className="od-ana-label">Total Orders (Week)</div>
                <div className="od-ana-value">{weeklyData.reduce((s, d) => s + d.orders, 0)}</div>
              </div>
              <div className="od-ana-card">
                <div className="od-ana-icon">💰</div>
                <div className="od-ana-label">Total Revenue (Week)</div>
                <div className="od-ana-value">₹{weeklyData.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</div>
              </div>
              <div className="od-ana-card">
                <div className="od-ana-icon">📊</div>
                <div className="od-ana-label">Avg Daily Revenue</div>
                <div className="od-ana-value">₹{Math.round(weeklyData.reduce((s, d) => s + d.revenue, 0) / 7).toLocaleString()}</div>
              </div>
              <div className="od-ana-card">
                <div className="od-ana-icon">🔥</div>
                <div className="od-ana-label">Best Day</div>
                <div className="od-ana-value">{weeklyData.reduce((best, d) => d.revenue > best.revenue ? d : best).day}</div>
              </div>
            </div>

            {/* category breakdown */}
            <div className="od-card">
              <div className="od-card-header"><h3>🍽️ Orders by Category</h3></div>
              <div className="od-category-bars">
                {[
                  { name: "Main Course", percent: 42, orders: 168 },
                  { name: "Starters", percent: 28, orders: 112 },
                  { name: "Rice", percent: 15, orders: 60 },
                  { name: "Breads", percent: 10, orders: 40 },
                  { name: "Desserts", percent: 5, orders: 20 },
                ].map((c) => (
                  <div className="od-cat-bar-row" key={c.name}>
                    <div className="od-cat-bar-label">{c.name}</div>
                    <div className="od-cat-bar-track">
                      <div className="od-cat-bar-fill" style={{ width: `${c.percent}%` }} />
                    </div>
                    <div className="od-cat-bar-info">{c.orders} orders · {c.percent}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OwnerDashboard;