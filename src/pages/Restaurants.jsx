import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Restaurants.css";
import { useNavigate } from "react-router-dom";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
const navigate = useNavigate();
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem("token");
        const location = searchParams.get("location") || "";
        const res = await fetch(
          `http://localhost:5000/api/restaurants?location=${location}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filtered = restaurants.filter((r) =>
    r.name?.toLowerCase().includes(search.toLowerCase())
  );

  // dummy data if API not ready
  const dummyData = [
    { _id: "1", name: "Biryani House", cuisine: "Indian", rating: 4.8, deliveryTime: "25-30", priceForTwo: 300, image: "🍛" },
    { _id: "2", name: "Pizza Palace", cuisine: "Italian", rating: 4.6, deliveryTime: "20-25", priceForTwo: 400, image: "🍕" },
    { _id: "3", name: "Burger Barn", cuisine: "American", rating: 4.5, deliveryTime: "15-20", priceForTwo: 250, image: "🍔" },
    { _id: "4", name: "Sushi Stop", cuisine: "Japanese", rating: 4.9, deliveryTime: "30-35", priceForTwo: 600, image: "🍣" },
    { _id: "5", name: "Taco Town", cuisine: "Mexican", rating: 4.3, deliveryTime: "20-25", priceForTwo: 280, image: "🌮" },
    { _id: "6", name: "Dessert Den", cuisine: "Bakery", rating: 4.7, deliveryTime: "10-15", priceForTwo: 200, image: "🧁" },
  ];

  const displayData = filtered.length > 0 || restaurants.length > 0 ? filtered : dummyData;

  return (
    <div className="restaurants-page">
      <Navbar />
      <div className="restaurants-container">
        <div className="restaurants-header">
          <h1>Restaurants Near You 📍</h1>
          <p>Fresh food, fast delivery — pick your favourite!</p>
        </div>

        <div className="restaurants-search">
          <input
            type="text"
            placeholder="🔍 Search restaurants or cuisines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="loading-grid">
            {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-card"/>)}
          </div>
        ) : (
          <div className="restaurants-grid">
            {displayData.map((r) => (
              <div className="restaurant-card" key={r._id}>
                <div className="card-image">
                  <span className="card-emoji">{r.image}</span>
                  <div className="card-badge">⭐ {r.rating}</div>
                </div>
                <div className="card-body">
                  <h3>{r.name}</h3>
                  <p className="cuisine">{r.cuisine}</p>
                  <div className="card-meta">
                    <span>🕐 {r.deliveryTime} min</span>
                    <span>💰 ₹{r.priceForTwo} for two</span>
                  </div>
                  <button className="order-btn">Order Now</button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;