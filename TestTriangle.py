# test_app.py
import json
import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_patient_login(client):
    data = {
        'name': 'John Doe',
        'ward_no': 'A123',
        'medical_condition': 'Fever',
        'doctor_name': 'Dr. Smith'
    }
    response = client.post('/patient/login', json=data)
    assert response.status_code == 200
    assert json.loads(response.data) == {'message': 'Patient logged in successfully'}

def test_doctor_login(client):
    data = {
        'name': 'Dr. Smith',
        'hospital': 'Hospital ABC'
    }
    response = client.post('/doctor/login', json=data)
    assert response.status_code == 200
    assert json.loads(response.data) == {'message': 'Doctor logged in successfully'}
