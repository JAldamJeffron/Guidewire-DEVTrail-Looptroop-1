from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # CRITICAL: Opens up ML logic to React natively

@app.route('/api/predict_premium', methods=['POST'])
def predict_premium():
    data = request.json
    
    zone_risk = data.get('zone_risk', 'low')
    historical_waterlogging = data.get('historical_waterlogging', False)
    predictive_weather = data.get('predictive_weather', 'clear')
    geopolitical_fuel_shortage = data.get('geopolitical_fuel_shortage', False)
    hazardous_material_spill = data.get('hazardous_material_spill', False)
    avg_rides = data.get('avg_rides', 100)

    base_premium = 45.0
    premium = base_premium
    reasons = ["Base Algorithm Kickoff (₹45.0)"]

    if avg_rides >= 200:
        premium += 9.5
        reasons.append("Critical risk: High ride volume exposure (+₹9.50)")
    elif avg_rides >= 140:
        premium += 5.0
        reasons.append("Elevated risk: Above average ride volume (+₹5.00)")
    elif avg_rides < 50:
        premium -= 3.5
        reasons.append("Low risk: Favorable low-ride volume (-₹3.50)")

    if zone_risk == 'high':
        premium += 10.0
        reasons.append("High crime/danger zone penalty (+₹10.0)")
        
    if not historical_waterlogging:
        premium -= 2.0  
        reasons.append("Historical Safety: No waterlogging discount (-₹2.0)")
        
    if predictive_weather == 'heavy_rain':
        premium += 15.0
        reasons.append("Live Weather: Heavy Cyclone predicted (+₹15.0)")
    elif predictive_weather == 'extreme_heat':
        premium += 3.0
        reasons.append("Live Weather: Extreme heat routing (+₹3.0)")

    base_avg_daily_loss = 850.0 
    if geopolitical_fuel_shortage:
        cost = (base_avg_daily_loss * 2.0) * 0.012
        premium += cost
        reasons.append(f"Macro Scale: Fuel Scarcity Actuarial bump (+₹{round(cost, 2)})")
        
    if hazardous_material_spill:
        cost = (base_avg_daily_loss * 3.0) * 0.015
        premium += cost
        reasons.append(f"Bio-Scale: Toxic Spill probability shift (+₹{round(cost, 2)})")
        
    # GUARD RAILS guaranteeing it doesnt go too high or too low
    old_premium = premium
    guarded_premium = max(35.0, min(75.0, premium))
    
    if guarded_premium < old_premium:
        reasons.append(f"⚠️ CAP REACHED: Actuarial Ceiling blocked total from exceeding ₹75 limit (Saved ₹{round(old_premium - 75.0, 2)})")
    elif guarded_premium > old_premium:
        reasons.append(f"🛡️ FLOOR REACHED: Actuarial Limit blocked total from dropping below ₹35 safety limit.")

    return jsonify({
        "base_premium_inr": base_premium,
        "calculated_premium_inr": guarded_premium,
        "reasons": reasons,
        "risk_factors_analyzed": {
            "predictive_weather": predictive_weather,
            "avg_rides": avg_rides
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
