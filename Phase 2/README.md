# 🚀 EarnSure Phase 2 Architecture (Loop Troop)

This directory houses the fully functional API integration, algorithm modeling, and frontend user interface built iteratively to meet the **Guidewire DEVTrails Phase 2 Hackathon Specifications**.

---

## 📁 Distributed Microservices Architecture

Phase 2 executes live financial processing logic distributed across three primary hubs to ensure a complete, end-to-end user journey.

### 1. `frontend/` (Vite / React OS)
The delivery worker's interactive operational dashboard, built with Vite and Glassmorphism CSS. It features a complete interactive flow:
* **Onboarding & Auth:** Interactive Registration screens capturing Worker ID, UPI details, and assigned Delivery Zone.
* **Profile & History Dashboard:** A dedicated view where workers can see their Active Policy status, historical premium costs, and a ledger of past automated payouts.
* **Trigger Management:** Visually manages the 4 independent Parametric triggers (Weather, Grid, Curfew, AQI) with real-time UI state changes when a disruption is detected.

### 2. `backend-java/` (Spring Boot Core Application)
The financial enforcement logic executing Policy Management and Zero-Touch payouts. 
* **`RegistrationService`:** Handles worker onboarding, securely storing UPI mapping and zone assignments.
* **`PolicyManager`:** Controls the active/inactive states for the Weekly Insurance Policy and logs the worker's historical policy data.
* **`ParametricAutomation`:** Polling daemon that maps external APIs every 60 seconds (Weather alerts, Power Grid failures, Civic Curfews, Air Quality).
* **`ClaimsManagement`:** Automatically bounds Actual Loss payouts against hard algorithms (strict limits enforced between `₹300` and `₹2500` for lost downtime) and updates the worker's profile history with the payout receipt.

### 3. `backend-ml/` (Python Actuarial Pricing Engine)
The predictive underwriting core. Exposes REST endpoints serving custom actuarial mathematics for dynamic premium calculation.
* Adjusts weekly premium requests actively based on geographical elements.
* **Bounded Thresholds:** Mathematically guarantees weekly premiums cap at a strict Ceiling (₹75) and a secure Floor (₹35) so pricing is safely managed for the gig-worker.

---

## 💻 How to Instantly Execute the Phase 2 Suite

### 1. Fire the ML Python Engine (Port 5000)
```bash
cd backend-ml
pip install -r requirements.txt
python train_model.py
python ml_service.py
```

### 2. Run the Glassmorphism React Frontend (Port 5173)
```bash
cd frontend
npm install 
npm run dev
```

### 3. Boot the Java Persistence Hub (Port 8080)
Execute the Spring Boot core using your IntelliJ IDE or Maven compiler executing natively mapped to `EarnSureBackendApplication.java`.
