import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="offer-badge">
          🚀 Free delivery on first order
        </div>

        <h1 className="hero-title">
          Order <span>Food</span>
          <br />
          Delivered Fast 🔥
        </h1>

        <p className="hero-description">
          From the best restaurants near you — hot, fresh,
          and delivered to your doorstep in minutes.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="📍 Enter your delivery location..."
          />

          <button className="find-food-btn">
            Find Food →
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <h2>500+</h2>
            <p>Restaurants</p>
          </div>

          <div className="stat-card">
            <h2>30 min</h2>
            <p>Avg Delivery</p>
          </div>

          <div className="stat-card">
            <h2>50K+</h2>
            <p>Happy Users</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;