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

    premium = base_premium

    # Feature 1: The model charges ₹2 less per week if the worker operates in a zone historically safe from water logging.
    if not historical_waterlogging:
        premium -= 2.0
    
    # Simple ML emulation adjustment for dynamic predictive weather
    if predictive_weather == 'storm':
        premium += 5.0
    elif predictive_weather == 'extreme_heat':
        premium += 3.0
        
    # ML Feature: High risk inflation adjuster for war/petroleum shortage constraints
    if geopolitical_fuel_shortage:
        premium += 12.0
        
    return jsonify({
        "base_premium_inr": base_premium,
        "calculated_premium_inr": max(30.0, premium),
        "risk_factors_analyzed": {
            "zone_risk": zone_risk,
            "historical_waterlogging": historical_waterlogging,
            "predictive_weather": predictive_weather
        }
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)
