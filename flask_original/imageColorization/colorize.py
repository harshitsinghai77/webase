import requests

def imageColorization():
    url = 'http://iizuka.cs.tsukuba.ac.jp/projects/colorization/web/'
    img_path = 'imageColorization/uploads/colorize.jpg'
    files = {'file': (img_path, open(img_path, 'rb'),'image/jpg')}
    response = requests.post(url, files=files)
    return response.content
