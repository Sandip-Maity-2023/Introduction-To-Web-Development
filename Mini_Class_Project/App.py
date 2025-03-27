# Import necessary libraries
import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib
from flask_cors import CORS

# Step 1: Define a dictionary-based rule-based system
disease_priority = {
    "heart attack": 10,
    "stroke": 9,
    "cancer": 8,
    "severe infection": 8,
    "diabetes": 5,
    "asthma": 6,
    "fracture": 7,
    "migraine": 3,
    "flu": 2,
    "cold": 1,
    "pneumonia": 7,
    "tuberculosis": 6,
    "kidney failure": 9,
    "liver disease": 7,
    "appendicitis": 8,
    "unknown": 4  # Default score for unknown diseases
}

# Step 2: Create a dataset for Machine Learning training
data = {
    "disease": list(disease_priority.keys()),  # Disease names
    "priority_score": list(disease_priority.values())  # Corresponding scores
}

df = pd.DataFrame(data)  # Convert to Pandas DataFrame

# Step 3: Convert disease names into numerical vectors using TF-IDF
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["disease"])  # Transform text into numerical features
y = df["priority_score"]  # Target variable (priority score)

# Step 4: Split dataset into training & testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Train the Machine Learning model (Random Forest Regressor)
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Step 6: Save the trained model & vectorizer for later use
joblib.dump(model, "disease_priority_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")

model = joblib.load("disease_priority_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")


print("✅ Model training complete!")

# Step 7: Flask API for serving predictions
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json  # Get JSON data from frontend
        disease_name = data.get("disease", "").lower().strip()  # Normalize input

        # Use rule-based system if disease is found in dictionary
        if disease_name in disease_priority:
            score = disease_priority[disease_name]
        else:
            # Otherwise, use the trained ML model for prediction
            disease_vector = vectorizer.transform([disease_name])  # Convert text to numerical
            score = model.predict(disease_vector)[0]  # Predict priority score

        response = {"disease": disease_name, "priority_score": round(score, 2)}
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
