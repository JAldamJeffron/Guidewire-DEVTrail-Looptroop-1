import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [premium, setPremium] = useState(45);
  const [worker, setWorker] = useState(null);
  const [history, setHistory] = useState([]);
  const [regData, setRegData] = useState({ name: '', platform: 'Zepto', zone: '', upiId: '' });

  // Load Profile/History from Java Spring Boot
  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/profile');
      const data = await res.json();
      if(data.worker_status) setWorker(data.worker_status);
      setHistory(data.ledger || []);
    } catch(err) { console.error("Java Server not running.", err); }
  };

  // 1. Registration Function
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(regData)
      });
      alert('Registration Successful! Shield Active.');
      setActiveTab('profile');
      fetchProfile();
    } catch(err) { alert('Registration Failed. Ensure Java Backend is running.'); }
  };

  // 3. Dev Mode / Trigger Simulator
  const simulateTrigger = async (triggerName, daysLost) => {
    try {
      await fetch('http://localhost:8080/api/claims/process', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ trigger_type: triggerName, days_lost: daysLost })
      });
      alert(`Simulation Fired: ${triggerName}. Payout Executed!`);
      // Update Premium randomly reflecting ML backend
      setPremium(prev => prev + (Math.random() * 10));
      fetchProfile();
    } catch(err) { alert('API Offline.'); }
  };

  useEffect(() => {
    if(activeTab === 'profile') fetchProfile();
  }, [activeTab]);

  return (
    <div className="app-container">
      <nav className="top-nav">
        <div className="brand">EarnSure <span>Phase 2</span></div>
        <div className="tabs">
          <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active' : ''}>1. Onboard</button>
          <button onClick={() => setActiveTab('dashboard')} className={activeTab === 'dashboard' ? 'active' : ''}>2. Live Dashboard</button>
          <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>3. Profile Ledger</button>
        </div>
      </nav>

      {/* REGISTRATION */}
      {activeTab === 'register' && (
        <section className="registration-panel">
          <h2>Worker Secure Onboarding</h2>
          <form onSubmit={handleRegister} className="reg-form">
            <input placeholder="Full Name" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} required/>
            <select value={regData.platform} onChange={e => setRegData({...regData, platform: e.target.value})}>
              <option>Zepto</option>
              <option>Blinkit</option>
              <option>Swiggy Instamart</option>
            </select>
            <input placeholder="Zone / Pincode" value={regData.zone} onChange={e => setRegData({...regData, zone: e.target.value})} required/>
            <input placeholder="UPI ID (For Instant Payouts)" value={regData.upiId} onChange={e => setRegData({...regData, upiId: e.target.value})} required/>
            <button type="submit" className="submit-btn">Activate Q-Commerce Shield</button>
          </form>
        </section>
      )}

      {/* DASHBOARD & SIMULATOR */}
      {activeTab === 'dashboard' && (
        <section className="dashboard-panel">
          <div className="premium-card">
            <h3>Current Weekly Rate</h3>
            <div className="premium-price">₹{premium.toFixed(2)}</div>
            <p>Predictive Live Algorithm Binding</p>
          </div>

          <div className="simulator-panel">
            <h3>Dev Mode: Force API Disruptions</h3>
            <p>Execute external shocks to test Java Auto-Claims & History mapping.</p>
            <div className="sim-buttons">
              <button onClick={() => simulateTrigger("WEATHER_FLOOD", 2)}>⛈️ Force Heavy Rain (2 days)</button>
              <button onClick={() => simulateTrigger("POWER_GRID_FAIL", 1)}>🔌 Force Grid Failure</button>
              <button onClick={() => simulateTrigger("FUEL_SHORTAGE", 3)}>🛢️ Force Fuel Scarcity</button>
              <button onClick={() => simulateTrigger("TOXIC_SPILL", 4)}>☣️ Force Biohazard</button>
            </div>
          </div>
        </section>
      )}

      {/* PROFILE LEDGER */}
      {activeTab === 'profile' && (
        <section className="profile-panel">
          <h2>Work Profile & Actuarial Ledger</h2>
          {worker ? (
            <div className="worker-details">
              <p><strong>ID/Name:</strong> {worker.workerId} | {worker.name}</p>
              <p><strong>Platform:</strong> {worker.platform}</p>
              <p><strong>Target UPI:</strong> {worker.upiId}</p>
              <p><strong>Shield Status:</strong> <span style={{color: '#00FF66'}}>ACTIVE</span></p>
            </div>
          ) : <p>No worker registered. Please Onboard first!</p>}

          <div className="history-ledger">
            <h3>Automated Payout History</h3>
            <ul>
              {history.length === 0 ? <li>No recorded logic events yet...</li> : 
                history.map((h, i) => (
                  <li key={i}><strong>{h.date.split('G')[0]}</strong> - {h.event}</li>
                ))
              }
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
