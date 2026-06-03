import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./OrderTracking.css";

const steps = [
  { id: 1, label: "Order Placed",     icon: "✅", desc: "Restaurant received your order" },
  { id: 2, label: "Order Accepted",   icon: "👨‍🍳", desc: "Chef is preparing your food" },
  { id: 3, label: "Out for Delivery", icon: "🚴", desc: "Rider is on the way" },
  { id: 4, label: "Delivered",        icon: "🎉", desc: "Enjoy your meal!" },
];

const OrderTracking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [order, setOrder] = useState(null);
  const [eta, setEta] = useState(30);

  useEffect(() => {
    const saved = localStorage.getItem("currentOrder");
    if (saved) setOrder(JSON.parse(saved));

    // Simulate live order progression
    const timers = [
      setTimeout(() => { setCurrentStep(2); setEta(25); }, 4000),
      setTimeout(() => { setCurrentStep(3); setEta(15); }, 9000),
      setTimeout(() => { setCurrentStep(4); setEta(0); }, 18000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const isActive = (stepId) => stepId <= currentStep;
  const isCurrent = (stepId) => stepId === currentStep;

  return (
    <div className="ot-page">
      <Navbar />
      <div className="ot-container">

        {/* Header */}
        <div className="ot-header">
          <div className="ot-header-left">
            <h2>Order Tracking</h2>
            <p className="ot-order-id">Order #ORD{Date.now().toString().slice(-6)}</p>
          </div>
          {currentStep < 4 && (
            <div className="ot-eta">
              <div className="ot-eta-num">{eta}</div>
              <div className="ot-eta-label">mins away</div>
            </div>
          )}
        </div>

        {/* Live tracker */}
        <div className="ot-tracker-card">
          <div className="ot-steps">
            {steps.map((step, i) => (
              <div key={step.id} className="ot-step-wrap">
                <div className={`ot-step ${isActive(step.id) ? "active" : ""} ${isCurrent(step.id) ? "current" : ""}`}>
                  <div className="ot-step-icon">{step.icon}</div>
                  <div className="ot-step-info">
                    <div className="ot-step-label">{step.label}</div>
                    <div className="ot-step-desc">{step.desc}</div>
                  </div>
                  {isCurrent(step.id) && currentStep < 4 && (
                    <div className="ot-pulse" />
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div className={`ot-connector ${isActive(step.id + 1) ? "filled" : ""}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rider info */}
        {currentStep === 3 && (
          <div className="ot-rider-card">
            <div className="ot-rider-left">
              <div className="ot-rider-avatar">🧑‍🦱</div>
              <div>
                <div className="ot-rider-name">Ravi Kumar</div>
                <div className="ot-rider-sub">Your delivery partner</div>
              </div>
            </div>
            <div className="ot-rider-actions">
              <button className="ot-call-btn">📞 Call</button>
            </div>
          </div>
        )}

        {/* Delivered */}
        {currentStep === 4 && (
          <div className="ot-delivered-card">
            <div className="ot-delivered-icon">🎉</div>
            <h3>Order Delivered!</h3>
            <p>Hope you enjoy your meal. Rate your experience!</p>
            <div className="ot-stars">
              {[1,2,3,4,5].map(s => (
                <button key={s} className="ot-star">⭐</button>
              ))}
            </div>
            <button className="ot-reorder-btn" onClick={() => navigate("/restaurants")}>
              Order Again 🍕
            </button>
          </div>
        )}

        {/* Order summary */}
        {order && (
          <div className="ot-summary-card">
            <h3>Order Summary</h3>
            <div className="ot-summary-items">
              {Object.values(order.items || {}).map((item) => (
                <div className="ot-summary-row" key={item.id}>
                  <span>{item.emoji} {item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="ot-summary-total">
              <span>Total Paid</span>
              <span>₹{order.total}</span>
            </div>
            <div className="ot-delivery-addr">
              📍 {order.address}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;