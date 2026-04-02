# 🦄 EarnSure by Loop Troop
**AI-Powered Parametric Income Protection for Q-Commerce Delivery Partners**

[![Guidewire DEVTrails](https://img.shields.io/badge/Guidewire-DEVTrails_2026-00F0FF?style=for-the-badge)](https://hackathon.guidewire.com)
[![Phase](https://img.shields.io/badge/Phase_2-Scale_%26_Protect-00FF66?style=for-the-badge)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-Java_|_React_|_Python-03050A?style=for-the-badge)](#)

---

## 🚀 The Vision
India's platform-based delivery partners are the backbone of the digital economy, yet they bear the full financial loss when external disruptions hit. **EarnSure** is a zero-touch, AI-enabled parametric insurance platform built specifically for the Q-Commerce sector (Zepto, Blinkit). 

**Our Golden Rules:**
1. **Scope:** We strictly cover **Loss of Income** caused by external disruptions. We strictly exclude coverage for health, life, accidents, or vehicle repairs.
2. **Economy:** Our financial model operates on a strict **Weekly pricing basis** (not per day, not per month). 
3. **Execution:** Disbursements must be **Zero-Touch**, triggering automatically via APIs without manual claim filing.

---

## 📁 Repository Architecture
This repository encompasses both the initial Phase 1 mockups and the complete Phase 2 executable stack.

* **`Phase 1/`**: Contains the original Next.js static mockups and UX foundation.
* **`Phase 2/`**: Contains our complete fully-functional API integration.
  * `frontend/` (Vite/React Dashboard with Glassmorphism)
  * `backend-java/` (Spring Boot Core Application & Auto-Claims Polling)
  * `backend-ml/` (Python Actuarial Machine Learning Premium model)

---

## 🧠 Phase 2 Features & Actuarial Logistics

### The 6 Parametric Triggers
Our architecture specifically polls external events executing instantaneous Parametric Loss validations:
1. ⛈️ **Extreme Weather:** Heavy flooding mapping (E.g., Chennai floods).
2. 🔌 **Grid Failures:** Dark store regional power grid collapses.
3. 😷 **Severe Pollution:** AQI metrics spiking into dangerous ranges.
4. 🚧 **Civic Disruptions:** Sudden municipal curfews/blockades.
5. 🛢️ **Geopolitical Constraints:** Fuel scarcity restricting route execution due to war.
6. ☣️ **Toxic Material Leaks:** Biological hazards or public chemical spills halting gig economies.

### Math-Bounded Machine Learning
Our Python `ml_service.py` ensures accurate gig-economy representation. Base premium calculations scale around predictable Expected Loss multipliers factoring Indian daily wages (₹850 benchmark payout constraint). 
* Premiums are stringently bounded to never drop below **₹35.0** and never spike above **₹75.0**. 

### Zero-Touch Claim Polling
The Java `@Scheduled` trigger runs every 60 seconds. Upon trigger mapping, loss events are mathematically quantified over `days_offline` and automatically execute mapped financial compensation mimicking UPI architecture, guarded securely between payouts of **₹300** and **₹2500**.

---

## 💻 How to Run (Phase 2)

**1. Machine Learning Service (Python)**
```bash
cd "Phase 2/backend-ml"
pip install -r requirements.txt
python train_model.py
python ml_service.py
```
*API live at `http://localhost:5000/api/predict_premium`*

**2. React Dashboard (Frontend)**
```bash
cd "Phase 2/frontend"
npm install
npm run dev
```
*UI live at `http://localhost:5173`*

**3. Autonomic Claims Java Server**
Launch via Spring Boot (IntelliJ or Maven wrapper natively configuring `EarnSureBackendApplication.java`).
