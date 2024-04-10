import numpy as np
import torch
from torch import nn, optim
from torch.utils.data import DataLoader, TensorDataset

# Define the path to your data
data_path = "/Users/Meghana/Downloads/Data/"

# Load your training data
x_train = np.load(data_path + 'train_data.npy')
y_train = np.load(data_path + 'train_label.npy')

# Convert numpy arrays to PyTorch tensors
x_train_tensor = torch.Tensor(x_train)
y_train_tensor = torch.LongTensor(y_train)

# Define your model
class EEGAutoencoderClassifier(nn.Module):
    def __init__(self, num_classes):
        super(EEGAutoencoderClassifier, self).__init__()
        self.encoder = nn.Sequential(
            nn.Linear(64 * 795, 512),  # Increase the number of neurons
            nn.ReLU(),
            nn.Linear(512, 256),  # Add more layers
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

# Create a TensorDataset and DataLoader for training data
train_dataset = TensorDataset(x_train_tensor, y_train_tensor)
batch_size = 64
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

# Create an instance of the model
num_classes = 5
model = EEGAutoencoderClassifier(num_classes)

# Define your criterion and optimizer
criterion = nn.NLLLoss()
optimizer = optim.Adam(model.parameters(), lr=0.0001)

# Add learning rate scheduling
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=50, gamma=0.1)

# Training loop
num_epochs = 20
for epoch in range(num_epochs):
    model.train()
    for data, labels in train_loader:
        optimizer.zero_grad()
        outputs = model(data)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
    scheduler.step()

    print(f'Epoch {epoch + 1}/{num_epochs}, Loss: {loss.item()}')

# Evaluate the model
model.eval()
correct = 0
total = 0
predicted_words = []

# Assuming you have your test data loaded into x_test and y_test
x_test = np.load(data_path + 'test_data.npy')
y_test = np.load(data_path + 'test_label.npy')

# Convert numpy arrays to PyTorch tensors
x_test_tensor = torch.Tensor(x_test)
y_test_tensor = torch.LongTensor(y_test)

# Create a TensorDataset and DataLoader for test data
test_dataset = TensorDataset(x_test_tensor, y_test_tensor)
test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

# Define your classes
classes = ["hello", "help me", "stop", "thank you", "yes"]

with torch.no_grad():
    for data, labels in test_loader:
        outputs = model(data)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

        # Convert predicted indices to words
        predicted_words.extend([classes[i] for i in predicted])

accuracy = correct / total
print(f'Test Accuracy: {accuracy * 100:.2f}%')
print("Predicted words:", predicted_words)
