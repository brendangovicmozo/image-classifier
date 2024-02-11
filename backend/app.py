from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

app = Flask(__name__)

# Load the pre-trained model
model = load_model('model.h5')

# Define a function for image preprocessing
def preprocess_image(image):
    # Resize the image to the required input shape of the model
    image = image.resize((224, 224))
    # Convert image to numpy array
    image = np.asarray(image) / 255.0
    # Add batch dimension and return
    return np.expand_dims(image, axis=0)

@app.route('/')
def index():
    return "API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'my_image' not in request.files:
        return jsonify({'error': 'No image found'}), 400

    image = request.files['my_image']
    image = Image.open(io.BytesIO(image.read()))

    # Preprocess the image
    processed_image = preprocess_image(image)

    # Predict
    prediction = model.predict(processed_image)
    predicted_class = np.argmax(prediction)

    return jsonify({'prediction': str(predicted_class)})

if __name__ == '__main__':
    app.run(debug=True)
