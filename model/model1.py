
import numpy as np
import torch
import os
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import json

# Load data (Assuming data_path is already defined)
data_path = "/Users/parshvashah/Downloads/"

train_data = np.load(data_path + 'train_data.npy')
test_data = np.load(data_path + 'test_data.npy')
train_label = np.load(data_path + 'train_label.npy')
test_label = np.load(data_path + 'test_label.npy')

# Convert data to PyTorch tensors
x_train_tensor = torch.Tensor(train_data)
y_train_tensor = torch.LongTensor(train_label)
x_test_tensor = torch.Tensor(test_data)
y_test_tensor = torch.LongTensor(test_label)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Create data loaders
train_dataset = TensorDataset(x_train_tensor.to(device), y_train_tensor.to(device))
train_loader = DataLoader(train_dataset, batch_size=64, drop_last=True, shuffle=True)
test_dataset = TensorDataset(x_test_tensor.to(device), y_test_tensor.to(device))
test_loader = DataLoader(test_dataset, batch_size=64, drop_last=True, shuffle=False)

# Define model
class ComplexEEGClassifier(nn.Module):
    def __init__(self, num_classes):
        super(ComplexEEGClassifier, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(64 * 795, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU()
        )
        self.classifier = nn.Sequential(
            nn.Linear(64, num_classes),
            nn.LogSoftmax(dim=1)
        )

    def forward(self, x):
        x = x.view(x.size(0), -1)
        x = self.encoder(x)
        x = self.classifier(x)
        return x


# Define a list of classes corresponding to the predicted indices
classes = ["hello", "help me", "stop", "thank you", "yes"]
# Initialize model, criterion, and optimizer
num_classes = 5  # Assuming 5 classes
model = ComplexEEGClassifier(num_classes).to(device)
criterion = nn.NLLLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 523
for epoch in range(num_epochs):
    model.train()
    epoch_loss = 0.0
    for data, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(data)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        epoch_loss += loss.item()

    print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {epoch_loss}')

# Evaluate model after all epochs
model.eval()
correct = 0
total = 0
predicted_words  = []

with torch.no_grad():
    for data, labels in test_loader:
        outputs = model(data)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

        # Convert predicted indices to words
        predicted_words.extend([classes[i] for i in predicted])

# Save model in .pt format
torch.save(model.state_dict(), 'complex_model.pt')


# Iterate over the predicted words and save them in separate JSON files
for class_name in classes:
    # Filter predicted words for the current class
    class_predicted_words = [word for word in predicted_words if word == class_name]
    
    # Create a dictionary to represent the data in the same shape as the model accepts
    class_data = {
        "eeg_signals": [],
        "labels": []
    }
    
    # Append the corresponding EEG signals and labels to the dictionary
    for i, word in enumerate(predicted_words):
        if word == class_name:
            class_data["eeg_signals"].append(test_data[i].tolist())
            class_data["labels"].append(test_label[i].tolist())
    
    # Save the data dictionary to a JSON file
    with open(f'{class_name}_eeg_data.json', 'w') as file:
        json.dump(class_data, file, indent=4)

# Calculate accuracy
accuracy = correct / total * 100
print(f'Final Test Accuracy: {accuracy:.2f}%')
