# Guidewire-DEVTrail-Looptroop
# Project EarnSure: AI-Parametric Insurance for Q-Commerce

## The Vision
We are building a zero-touch, AI-powered parametric insurance platform exclusively for Q-Commerce delivery partners (e.g: Zepto, Blinkit, Instamart). Q-Commerce relies on hyper-local 10-minute delivery windows, making riders extremely vulnerable to external, uncontrollable disruptions. Our platform provides an automated financial safety net, strictly covering **loss of income**.

## Persona & Core Workflow
**Target Persona:** Q-Commerce Delivery Partners operating in high-density urban grids.

**The Workflow:**
1. **Vernacular Onboarding:** The rider downloads the app and completes a seamless onboarding process with native Tamil language support, ensuring full comprehension of policy terms without needing customer service. 
2. **Weekly Subscription:** The rider opts into a dynamic premium deducted weekly, securing their estimated hourly earnings against external downtime. 
3. **Passive Grid Monitoring:** The app runs efficiently in the background, monitoring local weather, traffic and power grid stability via external APIs.
4. **Zero-Touch Claim:** When an external disruption halts deliveries, the system automatically detects the anomaly, verifies the rider's location and instantly credits the lost wages directly to their account via UPI.

## The Financial Model: Weekly Premium 
Gig workers operate on a week-to-week cash flow. Our financial model reflects this by structuring premiums and coverage on a strict **Weekly basis**. The AI calculates the exact risk for the rider's specific 2-4 km operational radius for the upcoming 7 days. This policy strictly excludes coverage for health, life, accidents or vehicle repairs. 

## Parametric Triggers (Loss of Income)
Our system monitors the following external disruptions to trigger automated payouts:
* **Dark Store Blackouts:** Utilizing advanced power grid estimation architecture, the system tracks the electricity stability of local micro-warehouses. If a dark store loses power and cannot process orders, riders assigned to that hub are compensated for the downtime.
* **Severe Environmental Hazards:** Integration with weather APIs detects extreme localized events, such as heavy rain, floods or severe pollution that force platforms to pause operations.
* **Telecom/Network Dead Zones:** Monitoring regional cellular and internet uptime to detect complete network blackouts that prevent riders from receiving order pings.

## Platform Justification: Mobile-First
We are developing a **Mobile application**. Delivery partners are entirely mobile-dependent and rarely access web dashboards during their shifts. The application is highly optimized for battery efficiency and background processing on standard mid-range Android devices, ensuring it does not drain the battery they rely on for navigation. 

## AI & Machine Learning Integration
* **Dynamic Premium Calculation:** A machine learning model analyzes hyper-local historical data (e.g: flood frequency in specific underpasses, localized grid stability) to dynamically adjust the weekly premium for each specific rider.
* **Intelligent Fraud Detection:** The AI cross-references GPS telemetry with the known location of the disruption. It actively detects location anomalies, GPS spoofing and duplicate claims before authorizing the zero-touch payout.

## Tech Stack
* **Backend Core:** Java and C++ for high-performance API processing, real-time trigger monitoring and secure payment gateway simulation.
* **Frontend:** React Native for a cross-platform, responsive mobile interface.
* **AI/ML:** Python (TensorFlow/Scikit-learn) for predictive risk modeling and fraud detection algorithms.
* **External Integrations:** Mock Weather APIs, Simulated Traffic Data and Sandbox Payment Gateways (Razorpay/Stripe).

## Development Plan (6-Week Roadmap)
* **Weeks 1-2 (Seed):** Finalize architecture, deploy backend environments and establish the API connections for the primary parametric triggers.
* **Weeks 3-4 (Scale):** Implement the AI dynamic pricing model, build the Tamil-localized mobile frontend and demonstrate a successful automated claim trigger.
* **Weeks 5-6 (Soar):** Integrate the mock instant payout systems, refine the advanced fraud detection models and finalize the investor pitch deck and 5-minute demo video.

***
