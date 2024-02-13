from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import cv2 as cv
import numpy as np
from tensorflow.keras import models
from sklearn.metrics import precision_recall_fscore_support, accuracy_score

app = Flask(__name__)
CORS(app)

# Load the trained model
test_dir = 'test_data'
model = models.load_model('model.h5')

# Define the class names
class_names = ['banana', 'watermelon', 'orange']

# Function to preprocess the image
def preprocess_image(image_path):
    # Read the image
    img = cv.imread(image_path)
    # Resize the image to (32, 32)
    img = cv.resize(img, (32, 32))
    # Normalize pixel values
    img = img / 255.0
    return img

# Function to make a prediction
def predict_image(image_path):
    # Preprocess the image
    img = preprocess_image(image_path)
    # Make prediction
    prediction = model.predict(np.array([img]))
    # Get the predicted class index
    predicted_class_index = np.argmax(prediction)
    # Get the predicted class name
    predicted_class = class_names[predicted_class_index]
    # Get the probability of the predicted class
    probability = prediction[0][predicted_class_index]
    return predicted_class, probability

# Function to evaluate the model on test data
def evaluate_model(test_dir):
    # Load test data
    test_images = []
    test_labels = []

    # Load images from each class folder
    for class_name, label in enumerate(class_names):
        class_dir = os.path.join(test_dir, str(class_name))  # Adjust to your test data directory structure
        for image_name in os.listdir(class_dir):
            image_path = os.path.join(class_dir, image_name)
            # Read image using OpenCV
            image = cv.imread(image_path)
            if image is None:
                logging.error(f"Failed to load image: {image_path}")
                continue
            # Resize image to (32, 32)
            image = cv.resize(image, (32, 32))
            # Normalize pixel values
            image = image / 255.0
            # Append image and label to lists
            test_images.append(image)
            test_labels.append(label)

    # Convert lists to numpy arrays
    test_images = np.array(test_images)
    test_labels = np.array(test_labels)

    # Make predictions on the test set
    predictions = model.predict(test_images)
    predicted_labels = np.argmax(predictions, axis=1)

    # Compute accuracy
    accuracy = accuracy_score(test_labels, predicted_labels)

    # Compute precision, recall, F1 score
    precision, recall, f1, _ = precision_recall_fscore_support(test_labels, predicted_labels, average='weighted')

    return accuracy, precision, recall, f1

@app.route('/')
def index():
    return "The API is up and running!"

@app.route('/predict', methods=['POST'])
def predict():
    # Check if request contains file
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    # Check if file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    try:
        # Save the file
        file_path = 'uploaded_image.jpg'
        file.save(file_path)
        
        # Make prediction
        predicted_class, probability = predict_image(test_dir)
        
        # Evaluate the model
        accuracy, precision, recall, f1 = evaluate_model()
        
        return jsonify({'class': predicted_class, 'probability': float(probability), 
                        'accuracy': accuracy, 'precision': precision, 'recall': recall, 'f1': f1})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)