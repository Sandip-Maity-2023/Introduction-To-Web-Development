from flask import Flask, render_template, request
import joblib
import pandas as pd
import requests

app = Flask(__name__)

# Load trained model
model = joblib.load("Agri/productivity_model.pkl")

# Load training columns (used during training)
training_columns = joblib.load("Agri/model_columns.pkl")

# Load crop prices (pre-calculated from dataset if available)
try:
    crop_prices = joblib.load("Agri/crop_prices.pkl")
except:
    crop_prices = {}

# --- Helper: Fetch live crop price from FAO ---
def get_fao_price(crop, country="India", year=2020):
    try:
        url = f"https://api.fao.org/faostat/data/PP?area={country}&item={crop}&year={year}&format=JSON"
        response = requests.get(url, timeout=8)
        if response.status_code == 200:
            data = response.json()
            if "data" in data and len(data["data"]) > 0:
                price = data["data"][0]["value"]
                return float(price)
    except Exception as e:
        print(f"⚠️ Error fetching FAO price for {crop}: {e}")
    return None

@app.route("/")
def home():
    return render_template("sam.html")

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        district = request.form["district"]
        crop = request.form["crop"]
        area = float(request.form["area"])

        # Prepare input for model
        upcoming_year = 2024
        input_data = pd.DataFrame({
            "District": [district],
            "Crop": [crop],
            "Area": [area],
            "Year": [upcoming_year]
        })

        input_processed = pd.get_dummies(input_data)
        input_aligned = input_processed.reindex(columns=training_columns, fill_value=0)

        # Prediction
        predicted_productivity = model.predict(input_aligned)[0]

        # --- Get price: from dataset → else FAO ---
        price = crop_prices.get(crop)
        if not price:
            price = get_fao_price(crop, "India", 2020)

        if price:
            estimated_income = predicted_productivity * area * price
            price_text = f"💰 Estimated Income: ₹{estimated_income:,.2f} (at ₹{price}/Kg)"
        else:
            price_text = "⚠️ Price data not available for this crop."

        # --- Suggested crops (Top 3 by price * productivity) ---
        suggestions = []
        for c, p in crop_prices.items():
            income = predicted_productivity * area * p
            suggestions.append((c, income))
        suggestions = sorted(suggestions, key=lambda x: x[1], reverse=True)[:3]

        return render_template(
            "sam.html",
            prediction_text=f"Predicted Productivity: {predicted_productivity:.2f} Kg/Hectare",
            price_text=price_text,
            suggestions=suggestions
        )

if __name__ == "__main__":
    app.run(debug=True)
