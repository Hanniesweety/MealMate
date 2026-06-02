import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./About.css";

const team = [
  { name: "Arjun Kumar", role: "CEO & Founder", emoji: "👨‍💼" },
  { name: "Priya Sharma", role: "Head of Design", emoji: "👩‍🎨" },
  { name: "Rahul Dev", role: "Lead Engineer", emoji: "👨‍💻" },
  { name: "Sneha Rao", role: "Operations Head", emoji: "👩‍💼" },
];

const stats = [
  { num: "500+", label: "Restaurants" },
  { num: "50K+", label: "Happy Users" },
  { num: "30 min", label: "Avg Delivery" },
  { num: "20+", label: "Cities" },
];

const About = () => (
  <div className="about-page">
    <Navbar />

    {/* hero */}
    <section className="about-hero">
      <div className="about-hero-inner">
        <div className="about-badge">🍽️ Our Story</div>
        <h1>We Deliver <span>More Than</span> Just Food</h1>
        <p>MealMate was born from a simple idea — great food should reach everyone, fast and fresh. We connect hungry people with the best restaurants in their city.</p>
      </div>
    </section>

    {/* stats */}
    <section className="about-stats-section">
      <div className="about-stats-inner">
        {stats.map((s) => (
          <div className="about-stat" key={s.label}>
            <strong>{s.num}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>

    {/* mission */}
    <section className="about-mission">
      <div className="about-mission-inner">
        <div className="mission-text">
          <h2>Our Mission</h2>
          <p>To make food delivery seamless, affordable, and joyful for everyone. We believe every meal is an experience — and we're here to make sure it's a great one.</p>
          <ul className="mission-list">
            <li>⚡ Fast delivery — always under 30 mins</li>
            <li>🔒 Safe, contactless delivery options</li>
            <li>💰 Best prices with daily deals</li>
            <li>🤝 Supporting local restaurants</li>
          </ul>
        </div>
        <div className="mission-visual">
          <div className="mission-circle">🚴</div>
        </div>
      </div>
    </section>

    {/* team */}
    <section className="about-team">
      <div className="about-team-inner">
        <h2>Meet the Team 👋</h2>
        <div className="team-grid">
          {team.map((t) => (
            <div className="team-card" key={t.name}>
              <div className="team-avatar">{t.emoji}</div>
              <h3>{t.name}</h3>
              <p>{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;