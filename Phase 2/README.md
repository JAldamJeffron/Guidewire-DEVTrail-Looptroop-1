# 🚀 EarnSure Phase 2 Architecture

This directory houses the fully functional API integration, algorithm modeling, and frontend user interface built iteratively to meet the **Guidewire DEVTrails Phase 2 Hackathon Specifications**.

---

## 📁 Distributed Microservices Architecture

Unlike Phase 1 (which focused entirely on UI layouts), Phase 2 executes live financial processing logic distributed across three primary hubs:

### 1. `frontend/` (Vite / React OS)
This is the delivery worker's primary operational dashboard. Built using a high-performance Vite baseline and raw Vanilla CSS strictly styled using premium Glassmorphism templates. 
* Visually manages the 6 independent Parametric triggers. 
* Pulls dynamic variables mapping directly to the underlying ML Engine.

### 2. `backend-ml/` (Python Actuarial Pricing Engine)
The predictive underwriting core. Exposes REST endpoints serving custom **Probable Maximum Loss (PML)** actuarial mathematics.
* Adjusts weekly premium requests actively based on geographical elements.
* **Bounded Thresholds**: Mathematically guarantees weekly premiums will dynamically adapt to conditions but structurally caps at a strict Ceiling (₹75) and a secure Floor (₹35) so pricing is safely managed.

### 3. `backend-java/` (Spring Boot Core Application)
The financial enforcement logic executing Zero-Touch payouts. 
* Maps external APIs every 60 seconds (Weather, Power Grid, Civic Curfews, Air Quality, Toxic biohazards, and Geopolitical fuel blockades).
* Automatically bounds Actual Loss payouts against hard algorithms correlating to real gig-worker financial metrics (strict limits enforced between `₹300` and `₹2500`).

---

## 💻 How to Instantly Execute the Phase 2 Suite

### 1. Fire the ML Python Engine (Port 5000/8000)
```bash
# Navigate to the Python terminal
cd backend-ml
# Load the virtual environment and requirements
pip install -r requirements.txt
# Produce the predictive framework
python train_model.py
# Boot the live REST server
python ml_service.py
```
*(The raw Machine Learning Endpoint can now be publicly routed!)*

### 2. Run the Glassmorphism React Frontend (Port 5173)
```bash
# Navigate to the new UI folder
cd frontend
# Install package node dependencies
npm install 
# Serve the Vite instance synchronously
npm run dev
```

### 3. Boot the Java Persistence Hub (Port 8080)
Execute the `EarnSureBackendApplication.java` instance securely through your central IntelliJ compiler or Maven interface. The background 60-second polling triggers will automatically fire up mapping against your parameters natively.
