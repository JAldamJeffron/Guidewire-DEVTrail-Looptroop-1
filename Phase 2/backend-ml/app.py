from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import uvicorn
import os

app = FastAPI(title="EarnSure ML Premium Pricing Engine", 
              description="Phase 2 APIs predicting weekly localized policy metrics.",
              version="1.0.0")

# Pre-boot model loader
MODEL_PATH = "model.pkl"
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
    else:
        model = None
        print("Warning: model.pkl not found. Please execute train_model.py first.")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

class RiskFactors(BaseModel):
    weather_severity: float
    grid_instability: float
    pollution_level: float
    civic_disruptions: float

@app.post("/api/predict_premium")
def predict_premium(factors: RiskFactors):
    if model is None:
        return {"error": "Prediction model binary not found."}
        
    # Translate input into inference DataFrame schema
    input_data = pd.DataFrame([{
        "weather_severity": factors.weather_severity,
        "grid_instability": factors.grid_instability,
        "pollution_level": factors.pollution_level,
        "civic_disruptions": factors.civic_disruptions
    }])
    
    # Regressor Output
    predicted_premium = model.predict(input_data)[0]
    
    # Establish economic floor rules. Premium cannot drop below ₹30.
    final_premium = max(30.0, round(predicted_premium, 2))
    
    return {
        "base_premium_inr": 45.0,
        "calculated_premium_inr": final_premium,
        "risk_factors_analyzed": factors.dict(),
        "status": "ML_PRICED"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
