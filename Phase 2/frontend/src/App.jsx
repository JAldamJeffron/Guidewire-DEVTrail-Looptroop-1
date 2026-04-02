import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [premium, setPremium] = useState(45);
  const [isActivating, setIsActivating] = useState(false);
  const [activated, setActivated] = useState(false);

  // ML Simulation over time
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time adjustment based on constraints (Base ₹45 ± Risk Modifier)
      const modifier = Math.floor(Math.random() * 15) - 5; // -5 to +10
      setPremium(45 + modifier);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleActivate = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setActivated(true);
    }, 1500);
  };

  return (
    <div className="earnsure-container">
      <header className="header">
        <h1 className="title-gradient">EarnSure 🦄</h1>
        <p className="subtitle">AI Privacy-First Parametric Shield</p>
      </header>

      {/* Dynamic Premium Engine */}
      <section className="glass-card ml-engine">
        <div className="ml-header">
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Weekly Shield</h3>
          <div className="pulse-badge">
            <span className="pulse-dot"></span>
            ML Pricing
          </div>
        </div>
        <div>
          <div className="premium-value">₹{premium}</div>
          <p className="premium-note">Dynamic rate based on active 3km delivery zone risk factors.</p>
        </div>
      </section>

      {/* Core Triggers */}
      <section className="glass-card" style={{ padding: '1.2rem' }}>
        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Automated Triggers
        </h3>
        <div className="trigger-grid">
          <div className="trigger-item">
            <div className="trigger-icon icon-weather">⛈️</div>
            <div className="trigger-text">
              <h4>Extreme Weather</h4>
              <p>Floods & Heavy Rain alerts</p>
            </div>
          </div>
          <div className="trigger-item">
            <div className="trigger-icon icon-grid">⚡</div>
            <div className="trigger-text">
              <h4>Grid Failures</h4>
              <p>Dark store local power outages</p>
            </div>
          </div>
          <div className="trigger-item">
            <div className="trigger-icon icon-pollution">🌫️</div>
            <div className="trigger-text">
              <h4>Severe Pollution</h4>
              <p>Hazardous AQI halting delivery</p>
            </div>
          </div>
          <div className="trigger-item">
            <div className="trigger-icon icon-civic">🚧</div>
            <div className="trigger-text">
              <h4>Civic Disruptions</h4>
              <p>Unplanned curfews & blockades</p>
            </div>
          </div>
          <div className="trigger-item">
            <div className="trigger-icon" style={{ background: 'rgba(255, 69, 0, 0.2)', color: '#FF4500' }}>🛢️</div>
            <div className="trigger-text">
              <h4>Fuel Scarcity</h4>
              <p>Petroleum shortage (War)</p>
            </div>
          </div>
          <div className="trigger-item">
            <div className="trigger-icon" style={{ background: 'rgba(57, 255, 20, 0.2)', color: '#39FF14' }}>☣️</div>
            <div className="trigger-text">
              <h4>Toxic Materials</h4>
              <p>Public health hazards / Spills</p>
            </div>
          </div>
        </div>
      </section>

      <button className="btn-primary" onClick={handleActivate} disabled={activated || isActivating} style={{ opacity: activated ? 0.7 : 1 }}>
        {isActivating ? 'Authenticating GPS...' : activated ? 'Shield Active 🛡️' : 'Activate Instant Coverage'}
      </button>
      
      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        Zero-touch claims. Payouts credited directly to UPI via anomaly detection.
      </p>
    </div>
  );
}

export default App;
