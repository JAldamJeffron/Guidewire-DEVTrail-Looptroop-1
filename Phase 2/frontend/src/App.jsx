import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('register');
  const [premium, setPremium] = useState(45);
  const [worker, setWorker] = useState(null);
  const [history, setHistory] = useState([]);
  const [regData, setRegData] = useState({ name: 'Ravi Kumar', platform: 'Zepto', zone: '400053 (Andheri)', upiId: 'ravi.gig@okhdfcbank', avgRides: 0, avgEarnings: 0, vehicleType: '' });
  const [partnerConnected, setPartnerConnected] = useState(false);
  const [notification, setNotification] = useState(null);

  // What-If Simulator States
  const [wiRides, setWiRides] = useState(140);
  const [wiWeather, setWiWeather] = useState('clear');
  const [wiPredictedPremium, setWiPredictedPremium] = useState(45);

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/profile');
      const data = await res.json();
      if(data.worker_status) setWorker(data.worker_status);
      setHistory(data.ledger || []);
    } catch(err) { console.error("Java Server not running.", err); }
  };

  const handleConnectPartner = () => {
    setRegData({ ...regData, avgRides: 140, avgEarnings: 6800, vehicleType: 'Hero Splendor (Two-Wheeler)' });
    setPartnerConnected(true);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(!partnerConnected) return alert('Please connect partner app first.');
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

  const popNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const simulateTrigger = async (triggerName, daysLost) => {
    try {
      const resp = await fetch('http://localhost:8080/api/claims/process', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ trigger_type: triggerName, days_lost: daysLost })
      });
      const parsed = await resp.json();
      popNotification(`Alert: ${triggerName}. ₹${parsed.payout_amount_inr} instantly credited to UPI.`);
      fetchProfile();
    } catch(err) { alert('API Offline.'); }
  };

  // What-If calculation reacting linearly to mock metrics matching our Python backend constraints
  useEffect(() => {
    let price = 45;
    if (wiRides >= 200) price += 9.5;
    else if (wiRides >= 140) price += 5.0;
    else if (wiRides < 50) price -= 3.5;
    if (wiWeather === 'heavy_rain') price += 15.0;
    else if (wiWeather === 'extreme_heat') price += 3.0;
    const guarded = Math.max(35.0, Math.min(75.0, price));
    setWiPredictedPremium(guarded);
  }, [wiRides, wiWeather]);

  useEffect(() => {
    if(activeTab === 'profile') fetchProfile();
  }, [activeTab]);

  return (
    <div className="app-container">
      {notification && (
        <div className="push-notification active">
           {notification}
        </div>
      )}

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
          <div className="onboard-flow">
            {!partnerConnected ? (
              <button type="button" className="connect-btn" onClick={handleConnectPartner}>🔗 Connect to Partner App (Mock Swiggy/Zepto)</button>
            ) : (
              <div className="gig-stats-card">
                <h4>Partner API Connected</h4>
                <p><strong>Avg Weekly Rides:</strong> {regData.avgRides}</p>
                <p><strong>Avg Weekly Earnings:</strong> ₹{regData.avgEarnings}</p>
                <p><strong>Vehicle Link:</strong> {regData.vehicleType}</p>
              </div>
            )}
            <form onSubmit={handleRegister} className="reg-form" style={{ marginTop: '2rem' }}>
              <input placeholder="Full Name" value={regData.name} onChange={e => setRegData({...regData, name: e.target.value})} required/>
              <select value={regData.platform} onChange={e => setRegData({...regData, platform: e.target.value})}>
                <option>Zepto</option>
                <option>Blinkit</option>
                <option>Swiggy Instamart</option>
              </select>
              <input placeholder="Zone / Pincode" value={regData.zone} onChange={e => setRegData({...regData, zone: e.target.value})} required/>
              <input placeholder="UPI ID (For Instant Payouts)" value={regData.upiId} onChange={e => setRegData({...regData, upiId: e.target.value})} required/>
              <button type="submit" className="submit-btn" disabled={!partnerConnected}>Activate Q-Commerce Shield</button>
            </form>
          </div>
        </section>
      )}

      {/* DASHBOARD & SIMULATOR */}
      {activeTab === 'dashboard' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
          <section className="dashboard-panel">
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

            <div className="what-if-panel">
               <h3>"What-If" Predictor Tool</h3>
               <p>Actuarial preview modeled alongside local ML pricing boundaries.</p>
               <div className="wi-inputs">
                  <label>Average Weekly Rides ({wiRides})</label>
                  <input type="range" min="30" max="250" value={wiRides} onChange={(e) => setWiRides(e.target.value)} />
                  
                  <label style={{marginTop: '1rem'}}>Predicted Weather Risk</label>
                  <select value={wiWeather} onChange={(e) => setWiWeather(e.target.value)}>
                    <option value="clear">Clear (No Risk)</option>
                    <option value="heavy_rain">Heavy Rain / Cyclone</option>
                    <option value="extreme_heat">Extreme Heatwave</option>
                  </select>
               </div>
               <div className="wi-result">
                  <div className="premium-price" style={{fontSize: '3rem'}}>₹{wiPredictedPremium.toFixed(2)}</div>
                  <p>Predicted Weekly Premium</p>
               </div>
            </div>
          </section>
        </div>
      )}

      {/* PROFILE LEDGER */}
      {activeTab === 'profile' && (
        <section className="profile-panel">
          <h2>Work Profile & Actuarial Ledger</h2>
          {worker ? (
            <>
            <div className="worker-details">
              <p><strong>ID/Name:</strong> {worker.workerId} | {worker.name}</p>
              <p><strong>Platform:</strong> {worker.platform} ({worker.avgRides} Rides/Wk)</p>
              <p><strong>Target UPI:</strong> {worker.upiId}</p>
              <p><strong>Shield Status:</strong> <span style={{color: '#00FF66'}}>ACTIVE</span></p>
            </div>

            <div className="impact-summary-widget">
               <h3>Weekly Impact Summary</h3>
               <div className="impact-grid">
                  <div className="impact-box red">
                     <h4>{worker.totalHoursLost}</h4>
                     <span>Hours Lost to Disruptions</span>
                  </div>
                  <div className="impact-box red">
                     <h4>₹{(worker.totalHoursLost * 106).toFixed(0)}</h4> 
                     <span>Estimated Lost Earnings</span>
                  </div>
                  <div className="impact-box green">
                     <h4>₹{worker.totalPayouts}</h4>
                     <span>EarnSure Payouts</span>
                  </div>
                  <div className="impact-box neutral">
                     <h4>₹0</h4>
                     <span>Net Active Loss</span>
                  </div>
               </div>
            </div>
            </>
          ) : <p>No worker registered. Please Onboard first!</p>}

          <div className="history-ledger" style={{marginTop: '2rem'}}>
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
