import requests
import base64

from flask import Flask, request, jsonify
from flask_cors import CORS

from imageColorization.colorize import imageColorization
from faceAging.faceapp import get_face_aging
from real_estate.classify import classify_real_estate
from backgroundRemoval.remove import backgroundRemoval
from fashion.deepFashion import deep_fashion, detectGender
from nsfw.nsfw import nsfw_predict
from textExtraction.smartTextExtraction import extract_text
from styleTransfer.style import get_style

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return 'Flask app running succesfully.'

@app.route('/removeBackground', methods=['GET','POST'])
def removebackground():
    
    if request.method == 'POST':
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'

        r = requests.get(content['imageUrl'])
        if r:   
            with open('backgroundRemoval/uploads/bgRemoval.jpg', 'wb') as f:
                f.write(r.content)
                
            img = backgroundRemoval()
            return base64.b64encode(img)

        else:
            return 'Bad url'
        
    return None

@app.route('/imageColorization', methods=['GET','POST'])
def colorize():
    if request.method == 'POST':
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'

        r = requests.get(content['imageUrl'])
        if r:   
            with open('imageColorization/uploads/colorize.jpg', 'wb') as f:
                f.write(r.content)
            img = imageColorization()
            return base64.b64encode(img)

        else:
            return 'Bad url'
        
    return None

@app.route('/neural-style-transfer', methods=['GET','POST'])
def styleTransfer():
    if request.method == 'POST':
        content = request.json

        if 'imageUrl' not in content:
            return 'URL not found'

        result = get_style(content['imageUrl'])
        return base64.b64encode(result)
   
    return None

@app.route('/faceAging', methods=['GET','POST'])
def faceAging():
    if request.method == 'POST':
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'

        r = requests.get(content['imageUrl'])
        if r:   
            with open('faceAging/uploads/aging.jpg', 'wb') as f:
                f.write(r.content)
            img = get_face_aging()
            return img

        else:
            return 'Bad url'
        
        return None

@app.route('/gender-classification', methods=['GET','POST'])
def genderClassification():
    if request.method == 'POST':
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'

        label = detectGender(content['imageUrl'])
        return jsonify(label)
    
    return None

@app.route('/textExtraction', methods=['GET','POST'])
def textExtraction():
    if request.method == 'POST':
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'

        text = extract_text(content['imageUrl'])
        return jsonify(text)
    
    return None

@app.route('/realEstate', methods=['GET','POST'])
def realEstate():
    
    if request.method == 'POST':
        content = request.json

        if 'imageUrl' not in content:
            return 'URL not found'

        result = classify_real_estate(content['imageUrl'])
        return jsonify(result)

    return None

@app.route('/deepFashion', methods=['GET','POST'])
def deepFashion():
    
    if request.method == 'POST':
        content = request.json

        if 'imageUrl' not in content:
            return 'URL not found'

        result = deep_fashion(content['imageUrl'])
        return jsonify(result)

    return None

@app.route('/predict-nsfw', methods=['GET','POST'])
def nsfw():
    if request.method == 'POST':
        
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'
        
        result = nsfw_predict(content['imageUrl'])
        return jsonify({'nsfw': result})
        
    return None


if __name__ == '__main__':
    app.run(port=5000)
