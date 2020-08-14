import requests

def get_face_aging():
    url = 'https://changemyface.com/changemyface.php'
    img_path = 'faceAging/uploads/aging.jpg'
    files = {'file': (img_path, open(img_path, 'rb'),'image/jpg')}
    response = requests.post(url, files=files)
    response_dict = response.json()['result']['3']
    return response_dict

