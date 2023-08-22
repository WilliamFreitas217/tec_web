# from django.test import TestCase
#
# # Create your tests here.
import requests

URL = 'http://localhost:8000/'
HEADERS = {'Content-Type': 'application/json'}


DATA = {
        "username": "artri",
        "password": "vaibeyblayde"
    }


def test_create_new_user(skip_create=True):
    if not skip_create:
        response = requests.post(f"{URL}/api/register/", headers=HEADERS, json=DATA)
        assert response.status_code == 201, "User not created"

    response = requests.post(f"{URL}/api/token/", headers=HEADERS, json=DATA)
    token_data = response.json()
    if 'detail' not in token_data.keys():
        print("Access Token:", token_data['access'])
        print("Refresh Token:", token_data['refresh'])
        HEADERS['Authorization'] = f'Bearer {token_data["access"]}'
    else:
        print(token_data['detail'])


def test_create_todo_item():
    url = f'{URL}/api/todo/'

    data = {
        "title": "Buy groceries",
        "description": "Milk, eggs, bread",
        "completed": False
    }

    response = requests.post(url, headers=HEADERS, json=data)

    print(response.status_code)
    print(response.json())


def test_get_todos_of_a_user():
    url = f'{URL}/api/user-todos/'

    response = requests.get(url, headers=HEADERS)
    print(response.json())
    assert response.status_code == 200, "request_failed"


def test_get_todo(todo_id):
    url = f'{URL}/api/todo/{todo_id}/'
    response = requests.get(url, headers=HEADERS)
    print(response.json())
    return response.json()


def test_update_todo(todo_id, data):
    url = f'{URL}/api/todo/{todo_id}/'
    response = requests.put(url, json=data, headers=HEADERS)
    print(response)
    print(response.json())
    return response.json()


def test_patch_todo(todo_id, data):
    url = f'{URL}/api/todo/{todo_id}/'
    response = requests.patch(url, json=data, headers=HEADERS)
    return response.json()


def test_delete_todo(todo_id):
    url = f'{URL}/api/todo/{todo_id}/'
    response = requests.delete(url, headers=HEADERS)
    return response.status_code


test_create_new_user(skip_create=True)
# test_create_todo_item()
test_get_todos_of_a_user()
test_get_todo(1)
# test_update_todo(1, {"title": "buy vegetables", "description": "Milk, eggs, bread", "completed": False})

# test_patch_todo(1, {"completed": False})

test_delete_todo(1)
