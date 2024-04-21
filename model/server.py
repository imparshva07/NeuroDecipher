from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS

import torch
from model import EEGAutoencoderClassifier  # Import your PyTorch model class

app = Flask(__name__)
CORS(app)

# Load the model's state dictionary
model_state_dict = torch.load('Model_Demo.pth', map_location=torch.device('cpu'))

# Create an instance of your model
model = EEGAutoencoderClassifier(num_classes=5)  # Adjust num_classes accordingly

# Load the state dictionary into the model
model.load_state_dict(model_state_dict)

# Set the model to evaluation mode
model.eval()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive EEG signals from request
        eeg_signals = request.json['eeg_signals']

        # Convert to PyTorch tensor
        inputs = torch.tensor(eeg_signals).float()

        # Make prediction using the model
        with torch.no_grad():
            output = model(inputs.unsqueeze(0))  # Unsqueeze to add batch dimension
            _, predicted = torch.max(output, 1)
            prediction = predicted.item()

        # Return prediction
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
