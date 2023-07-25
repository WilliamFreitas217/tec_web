# from django.test import TestCase
#
# # Create your tests here.
import requests

url = 'http://localhost:8000/api/token/'
headers = {'Content-Type': 'application/json'}
data = {
    "email": "wdvcf.eng16@uea.edu.br",
    "password": "123qweasd"
}

response = requests.post(url, headers=headers, json=data)
token_data = response.json()
if 'detail' not in token_data.keys():
    print("Access Token:", token_data['access'])
    print("Refresh Token:", token_data['refresh'])

    url = 'http://localhost:8000/api/todos/'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {token_data["access"]}'
    }

    data = {
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": False
    }

    response = requests.post(url, headers=headers, json=data)

    print(response.status_code)
    print(response.json())
else:
    print(token_data['detail'])
