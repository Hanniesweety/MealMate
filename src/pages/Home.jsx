import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import "./Home.css";

const categories = [
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🍔", name: "Burgers" },
  { emoji: "🍜", name: "Biryani" },
  { emoji: "🌮", name: "Wraps" },
  { emoji: "🍣", name: "Sushi" },
  { emoji: "🧁", name: "Desserts" },
];

const Home = () => (
  <div className="home">
    <Navbar />
    <Hero />

    {/* Categories */}
    <section className="section categories-section">
      <div className="section-inner">
        <h2 className="section-title">What's on your mind? 🤔</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div className="category-card" key={cat.name}>
              <div className="cat-emoji">{cat.emoji}</div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why MealMate */}
    <section className="section why-section">
      <div className="section-inner">
        <h2 className="section-title">Why MealMate? 🚀</h2>
        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Average delivery in under 30 minutes. We don't keep you waiting.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">🍽️</div>
            <h3>500+ Restaurants</h3>
            <p>From local favourites to top chains — all in one place.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Exclusive deals and discounts every single day.</p>
          </div>
          <div className="why-card">
            <div className="why-icon">🔒</div>
            <h3>Safe & Secure</h3>
            <p>100% secure payments and contactless delivery.</p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Banner */}
    <section className="cta-banner">
      <div className="cta-inner">
        <h2>Ready to order? 🍕</h2>
        <p>Join 50,000+ happy customers getting food delivered daily</p>
        <div className="cta-btns">
          <button className="cta-primary">Order Now</button>
          <button className="cta-secondary">Browse Restaurants</button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Home;