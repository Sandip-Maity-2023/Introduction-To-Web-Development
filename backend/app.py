from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load your trained model
model = tf.keras.models.load_model("model.h5")

def preprocess(image):
    image = image.resize((224, 224))  # change if needed
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    image = Image.open(file).convert('RGB')

    processed = preprocess(image)
    prediction = model.predict(processed)[0][0]

    return jsonify({
        "condition": "Cataract" if prediction > 0.5 else "Normal",
        "confidence": float(prediction * 100)
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)