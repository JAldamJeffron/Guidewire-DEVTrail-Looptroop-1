from flask import Flask, request, jsonify

app = Flask(__name__)

base_premium = 45.0

@app.route('/api/predict_premium', methods=['POST'])
def predict_premium():
    data = request.json or {}
    zone_risk = data.get('zone_risk', 'moderate')
    historical_waterlogging = data.get('historical_waterlogging', False)
    predictive_weather = data.get('predictive_weather', 'clear')
    geopolitical_fuel_shortage = data.get('geopolitical_fuel_shortage', False)
    hazardous_material_spill = data.get('hazardous_material_spill', False)

    premium = base_premium

    # Feature 1: The model charges ₹2 less per week if the worker operates in a zone historically safe from water logging.
    if not historical_waterlogging:
        premium -= 2.0
    
    # Simple ML emulation adjustment for dynamic predictive weather
    if predictive_weather == 'storm':
        premium += 5.0
    elif predictive_weather == 'extreme_heat':
        premium += 3.0
        
    # Actuarial Modeling: Base average daily wage loss for delivery worker
    base_avg_daily_loss = 850.0 

    # ML Feature: Expected 2-day work loss from geopolitical fuel shortage (Actuarial probability factor = 1.2%)
    if geopolitical_fuel_shortage:
        premium += (base_avg_daily_loss * 2.0) * 0.012
        
    # ML Feature: Expected 3-day work loss due to Biohazard public shutdown (Actuarial probability factor = 1.5%)
    if hazardous_material_spill:
        premium += (base_avg_daily_loss * 3.0) * 0.015
        
    # Ensure cost stays bounded explicitly between a LOW (₹35) and HIGH (₹75) ceiling
    guarded_premium = max(35.0, min(75.0, premium))

    return jsonify({
        "base_premium_inr": base_premium,
        "calculated_premium_inr": guarded_premium,
        "risk_factors_analyzed": {
            "zone_risk": zone_risk,
            "historical_waterlogging": historical_waterlogging,
            "predictive_weather": predictive_weather,
            "hazardous_material_spill": hazardous_material_spill
        }
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
