from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/predict_premium', methods=['POST'])
def predict_premium():
    data = request.json
    
    # Extract parametric factors
    zone_risk = data.get('zone_risk', 'low')
    historical_waterlogging = data.get('historical_waterlogging', False)
    predictive_weather = data.get('predictive_weather', 'clear')
    geopolitical_fuel_shortage = data.get('geopolitical_fuel_shortage', False)
    hazardous_material_spill = data.get('hazardous_material_spill', False)
    
    # Task 4 Extraction: Active Delivery Worker Load Volume
    avg_rides = data.get('avg_rides', 100)

    # Hard baseline requirement for parametric model
    base_premium = 45.0
    premium = base_premium

    # ML Feature: Weekly Worker Exposure Model Tracking High Ride Density 
    if avg_rides >= 200:
        premium += 9.5
    elif avg_rides >= 140:
        premium += 5.0
    elif avg_rides < 50:
        premium -= 3.5

    # Feature 1: Zone Risk Assessment
    if zone_risk == 'high':
        premium += 10.0
    elif zone_risk == 'medium':
        premium += 5.0
        
    # Feature 2: Historical Waterlogging Map
    if not historical_waterlogging:
        premium -= 2.0  # Discount if zone has clean history
        
    # Feature 3: Weather Prediction Adjustment
    if predictive_weather == 'heavy_rain':
        premium += 15.0
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
            "hazardous_material_spill": hazardous_material_spill,
            "avg_rides": avg_rides
        }
    })

if __name__ == '__main__':
    # Run the web api on port 5000 binding to native environment
    app.run(host='0.0.0.0', port=5000, debug=True)
