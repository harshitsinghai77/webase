from flask import Flask, redirect, url_for, request, render_template, jsonify, send_file
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
from werkzeug.utils import secure_filename
import requests
import numpy as np
from PIL import Image
import io
import json
import os
import base64
from imageColorization.colorize import *
from faceAging.faceapp import *
from real_estate.classify import *
from backgroundRemoval.remove import *
from gender_classification.detect_gender import *
from fashion.deepFashion import *
from nsfw.nsfw import *
from textExtraction.smartTextExtraction import *
from styleTransfer.style import *

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def index():
    return 'Hello Flask - Flask'


@app.route('/removeBackground', methods=['GET', 'POST'])
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


@app.route('/imageColorization', methods=['GET', 'POST'])
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


@app.route('/neural-style-transfer', methods=['GET', 'POST'])
def styleTransfer():
    if request.method == 'POST':
        content = request.json

        if 'imageUrl' not in content:
            return 'URL not found'

        result = get_style(content['imageUrl'])
        return base64.b64encode(result)

    return None


@app.route('/faceAging', methods=['GET', 'POST'])
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


@app.route('/gender-classification', methods=['GET', 'POST'])
def genderClassification():
    if request.method == 'POST':
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'

        label = detectGender(content['imageUrl'])
        return jsonify(label)

    return None


@app.route('/textExtraction', methods=['GET', 'POST'])
def textExtraction():
    if request.method == 'POST':
        content = request.json
        if 'imageUrl' not in content:
            return 'ImageURL not found'

        text = extract_text(content['imageUrl'])
        return jsonify(text)

    return None


@app.route('/realEstate', methods=['GET', 'POST'])
def realEstate():

    if request.method == 'POST':
        content = request.json

        if 'imageUrl' not in content:
            return 'URL not found'

        result = classify_real_estate(content['imageUrl'])
        return jsonify(result)

    return None


@app.route('/deepFashion', methods=['GET', 'POST'])
def deepFashion():

    if request.method == 'POST':
        content = request.json

        if 'imageUrl' not in content:
            return 'URL not found'

        result = deep_fashion(content['imageUrl'])
        return jsonify(result)

    return None


@app.route('/predict-nsfw', methods=['GET', 'POST'])
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
