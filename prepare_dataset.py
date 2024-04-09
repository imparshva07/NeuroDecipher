import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def load_dataset(filepath):
    """
    Load the dataset from a CSV file.
    """
    return pd.read_csv(filepath)

def preprocess_data(data):
    """
    Preprocess the dataset: Clean data, handle missing values, etc.
    Adjust this function based on your dataset's needs.
    """
    # Example: Drop rows with missing values
    data = data.dropna()
    return data

def split_dataset(data, label_column):
    """
    Split the dataset into features and labels, and then into training and test sets.
    """
    X = data.drop(label_column, axis=1)
    y = data[label_column]
    
    # Split dataset into training (80%) and test (20%) set
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    return X_train, X_test, y_train, y_test

def normalize_data(X_train, X_test):
    """
    Normalize features using StandardScaler
    """
    scaler = StandardScaler()
    X_train_scaled
