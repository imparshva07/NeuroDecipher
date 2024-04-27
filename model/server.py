# fastapi_server.py
import json
from tkinter.tix import Form
from fastapi import FastAPI, Form, File
from typing import List
from pydantic import BaseModel, Field
import numpy as np
import torch
import logging

app = FastAPI()

# Define request body model
class EEGData(BaseModel):
    List[float]

    class Config:
        arbitrary_types_allowed = True

# Define the model architecture
class ComplexEEGClassifier(torch.nn.Module):
    def __init__(self, num_classes):
        super(ComplexEEGClassifier, self).__init__()
        self.encoder = torch.nn.Sequential(
            torch.nn.Linear(64 * 795, 256),
            torch.nn.ReLU(),
            torch.nn.Linear(256, 128),
            torch.nn.ReLU(),
            torch.nn.Linear(128, 64),
            torch.nn.ReLU()
        )
        self.classifier = torch.nn.Sequential(
            torch.nn.Linear(64, num_classes),
            torch.nn.LogSoftmax(dim=1)
        )

    def forward(self, x):
        x = x.view(x.size(0), -1)
        x = self.encoder(x)
        x = self.classifier(x)
        return x

# Load the trained model
model = ComplexEEGClassifier(num_classes=5)
model.load_state_dict(torch.load("complex_model.pt"))
model.eval()

@app.post("/predict-helpme")
async def predict_eeg(eeg_data: EEGData):
    try:
        # Load EEG data from JSON file
        with open('help_me_eeg_data.json', 'r') as file:
            eeg_data_dict = json.load(file)
        
        # Extract the EEG signal from the dictionary
        eeg_signal = eeg_data_dict["eeg_signal"]

        # Convert the EEG signal to a PyTorch tensor
        eeg_tensor = torch.tensor(eeg_signal, dtype=torch.float32)

        # Perform prediction using your model
        outputs = model(eeg_tensor)

        # Map class indices to class labels
        class_labels = ["hello", "help me", "stop", "thank you", "yes"]  # Replace with your actual class labels
        predicted_class_indices = outputs.argmax(dim=1)
        predicted_class_labels = [class_labels[idx] for idx in predicted_class_indices]

        return {"predicted_class": predicted_class_labels}
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict-hello")
async def predict_eeg(eeg_data: EEGData):
    try:
        # Load EEG data from JSON file
        with open('hello_eeg_data.json', 'r') as file:
            eeg_data_dict = json.load(file)
        
        # Extract the EEG signal from the dictionary
        eeg_signal = eeg_data_dict["eeg_signal"]

        # Convert the EEG signal to a PyTorch tensor
        eeg_tensor = torch.tensor(eeg_signal, dtype=torch.float32)

        # Perform prediction using your model
        outputs = model(eeg_tensor)

        # Map class indices to class labels
        class_labels = ["hello", "help me", "stop", "thank you", "yes"]  # Replace with your actual class labels
        predicted_class_indices = outputs.argmax(dim=1)
        predicted_class_labels = [class_labels[idx] for idx in predicted_class_indices]

        return {"predicted_class": predicted_class_labels}
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict-yes")
async def predict_eeg(eeg_data: EEGData):
    try:
        # Load EEG data from JSON file
        with open('yes_eeg_data.json', 'r') as file:
            eeg_data_dict = json.load(file)
        
        # Extract the EEG signal from the dictionary
        eeg_signal = eeg_data_dict["eeg_signal"]

        # Convert the EEG signal to a PyTorch tensor
        eeg_tensor = torch.tensor(eeg_signal, dtype=torch.float32)

        # Perform prediction using your model
        outputs = model(eeg_tensor)

        # Map class indices to class labels
        class_labels = ["hello", "help me", "stop", "thank you", "yes"]  # Replace with your actual class labels
        predicted_class_indices = outputs.argmax(dim=1)
        predicted_class_labels = [class_labels[idx] for idx in predicted_class_indices]

        return {"predicted_class": predicted_class_labels}
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict-thankyou")
async def predict_eeg(eeg_data: EEGData):
    try:
        # Load EEG data from JSON file
        with open('thank you_eeg_data.json', 'r') as file:
            eeg_data_dict = json.load(file)
        
        # Extract the EEG signal from the dictionary
        eeg_signal = eeg_data_dict["eeg_signal"]

        # Convert the EEG signal to a PyTorch tensor
        eeg_tensor = torch.tensor(eeg_signal, dtype=torch.float32)

        # Perform prediction using your model
        outputs = model(eeg_tensor)

        # Map class indices to class labels
        class_labels = ["hello", "help me", "stop", "thank you", "yes"]  # Replace with your actual class labels
        predicted_class_indices = outputs.argmax(dim=1)
        predicted_class_labels = [class_labels[idx] for idx in predicted_class_indices]

        return {"predicted_class": predicted_class_labels}
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict-stop")
async def predict_eeg(eeg_data: EEGData):
    try:
        # Load EEG data from JSON file
        with open('stop_eeg_data.json', 'r') as file:
            eeg_data_dict = json.load(file)
        
        # Extract the EEG signal from the dictionary
        eeg_signal = eeg_data_dict["eeg_signal"]

        # Convert the EEG signal to a PyTorch tensor
        eeg_tensor = torch.tensor(eeg_signal, dtype=torch.float32)

        # Perform prediction using your model
        outputs = model(eeg_tensor)

        # Map class indices to class labels
        class_labels = ["hello", "help me", "stop", "thank you", "yes"]  # Replace with your actual class labels
        predicted_class_indices = outputs.argmax(dim=1)
        predicted_class_labels = [class_labels[idx] for idx in predicted_class_indices]

        return {"predicted_class": predicted_class_labels}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
