import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os

def generate_mock_data(n_samples=1000):
    """Generate historical mock data for 3km delivery zones."""
    np.random.seed(42)
    # Scale of 0-10 for different risk factors (0 is safe, 10 is severe risk)
    weather_severity = np.random.uniform(0, 10, n_samples)
    grid_instability = np.random.uniform(0, 10, n_samples)
    pollution_level = np.random.uniform(0, 10, n_samples)
    civic_disruptions = np.random.uniform(0, 10, n_samples)
    
    # Base premium is ₹45. We add risk modifiers based on severity.
    base_premium = 45.0
    
    # A composite risk score evaluating external threats to delivery volume
    risk_score = (weather_severity * 0.4 + 
                  grid_instability * 0.3 + 
                  pollution_level * 0.15 + 
                  civic_disruptions * 0.15)
                  
    # The premium flexes around the base. (Safe zones = cheaper, Risk zones = higher)
    premium = base_premium + (risk_score - 5) * 2.5 
    
    return pd.DataFrame({
        'weather_severity': weather_severity,
        'grid_instability': grid_instability,
        'pollution_level': pollution_level,
        'civic_disruptions': civic_disruptions,
        'premium_adjustment': premium
    })

def train_and_save_model():
    print("🌍 Generating mock data for EarnSure Parametric Risk Assessment...")
    df = generate_mock_data()
    
    X = df[['weather_severity', 'grid_instability', 'pollution_level', 'civic_disruptions']]
    y = df['premium_adjustment']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("🧠 Training Random Forest Regressor (Hyper-Local Risk Adjuster)...")
    model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)
    
    score = model.score(X_test, y_test)
    print(f"✅ Model R^2 Score Validation: {score:.3f}")
    
    print("💾 Saving artifact: model.pkl ...")
    joblib.dump(model, 'model.pkl')
    print("🚀 Training complete!")

if __name__ == "__main__":
    train_and_save_model()
