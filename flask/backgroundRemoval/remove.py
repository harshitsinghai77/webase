import requests

def backgroundRemoval():
    response = requests.post(
        'https://api.remove.bg/v1.0/removebg',
        files={'image_file': open('backgroundRemoval/uploads/bgRemoval.jpg', 'rb')},
        data={'size': 'auto'},
        headers={'X-Api-Key': 'Nrkv57TErBg1i7upmgVVSUHj'},
    )
    if response.status_code == requests.codes.ok:
        return response.content
    else:
        return error
