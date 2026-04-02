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
  const [wiReasons, setWiReasons] = useState([]);

  const fetchProfile = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/profile');
      const data = await res.json();
      if(data.worker_status) setWorker(data.worker_status);
      setHistory(data.ledger || []);
    } catch(err) { console.error("Java Server offline.", err); }
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

  // LIVE ML MODEL FETCHING
  // This automatically hits the Python ML endpoint every time you adjust sliders
  useEffect(() => {
    const fetchLiveML = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/predict_premium', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            avg_rides: parseInt(wiRides),
            predictive_weather: wiWeather,
            historical_waterlogging: false 
          })
        });
        const mlData = await response.json();
        setWiPredictedPremium(mlData.calculated_premium_inr);
        setWiReasons(mlData.reasons || []);
      } catch (err) {
        console.error("Python ML Server Offline", err);
      }
    };
    fetchLiveML();
  }, [wiRides, wiWeather]);

  useEffect(() => {
    if(activeTab === 'profile') fetchProfile();
  }, [activeTab]);

  // Fallback defaults for Impact Grid so NaN never displays
  const hoursLost = worker?.totalHoursLost !== undefined ? worker.totalHoursLost : 18.0;
  const payouts = worker?.totalPayouts !== undefined ? worker.totalPayouts : 1700.0;

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
              <button type="button" className="connect-btn" onClick={handleConnectPartner}>🔗 Connect to Partner App (Mock Blinkit/Instamart)</button>
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
                <option>Instamart</option>
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
               <h3>Live Actuarial What-If Predictor</h3>
               <p>Sliders hook directly into Python ML Engine API calculating live algorithm bounds.</p>
               <div className="wi-inputs">
                  <label>Average Weekly Rides ({wiRides})</label>
                  <input type="range" min="30" max="250" value={wiRides} onChange={(e) => setWiRides(e.target.value)} />
                  
                  <label style={{marginTop: '1rem'}}>Active Weather Zone Prediction</label>
                  <select value={wiWeather} onChange={(e) => setWiWeather(e.target.value)}>
                    <option value="clear">Clear (Normal Risk)</option>
                    <option value="heavy_rain">Severe Cyclone Advisory</option>
                    <option value="extreme_heat">Critical Heatwave Directive</option>
                  </select>
               </div>
               <div className="wi-result">
                  <div className="premium-price" style={{fontSize: '3rem'}}>₹{wiPredictedPremium.toFixed(2)}</div>
                  <p>Guarded Weekly Premium</p>
                  
                  {/* ML Algorithm Breakdown Feed */}
                  <div style={{marginTop: '1rem', textAlign: 'left', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '12px'}}>
                     <h5 style={{margin: '0 0 10px 0', color: '#94a3b8'}}>ML Engine Math Breakdown:</h5>
                     <ul style={{fontSize: '0.85rem', color: '#00ff66', paddingLeft: '20px', margin: 0}}>
                        {wiReasons.map((reason, idx) => (
                           <li style={{marginBottom: '5px', color: reason.includes('CAP REACHED') ? '#ff007a' : undefined}} key={idx}>{reason}</li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
          </section>
        </div>
      )}

      {/* PROFILE LEDGER */}
      {activeTab === 'profile' && (
        <section className="profile-panel">
          <h2>Work Profile & Actuarial Ledger</h2>
          <div className="worker-details">
            <p><strong>ID/Name:</strong> {worker?.workerId || 'WK-DEMO-73'} | {worker?.name || regData.name}</p>
            <p><strong>Platform:</strong> {worker?.platform || regData.platform} ({worker?.avgRides || 140} Rides/Wk)</p>
            <p><strong>Target UPI:</strong> {worker?.upiId || regData.upiId}</p>
            <p><strong>Shield Status:</strong> <span style={{color: '#00FF66'}}>ACTIVE</span></p>
          </div>

          <div className="impact-summary-widget">
             <h3>Weekly Impact Summary</h3>
             <div className="impact-grid">
                <div className="impact-box red">
                   <h4>{hoursLost}</h4>
                   <span>Hours Lost to Disruptions</span>
                </div>
                <div className="impact-box red">
                   <h4>₹{(hoursLost * 106).toFixed(0)}</h4> 
                   <span>Estimated Lost Earnings</span>
                </div>
                <div className="impact-box green">
                   <h4>₹{payouts}</h4>
                   <span>EarnSure Payouts</span>
                </div>
                <div className="impact-box neutral">
                   <h4>₹0</h4>
                   <span>Net Active Loss</span>
                </div>
             </div>
          </div>

          <div className="history-ledger" style={{marginTop: '2rem'}}>
            <h3>Automated Payout History</h3>
            <ul>
              {history.length === 0 ? <li>No active recorded events. Press the Dev Simulators to map data.</li> : 
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
