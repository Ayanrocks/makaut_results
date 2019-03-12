from flask import Flask, jsonify
from cookie import get_cookie
import os, logging, datetime


if not os.path.exists('.logs'):
    os.makedirs('.logs')

app = Flask(__name__)

def log_it():
    now=datetime.datetime.now().strftime("%d-%m-%y")
    log_DIR = "./.logs/"
    if(os.path.isfile(log_DIR+now+'.log')):
        logging.basicConfig(filename=f'{log_DIR}{now}.log',level=logging.DEBUG)
    else:
        fs = open(log_DIR+now+'.log','w+')
        fs.close()
        log_it()

@app.route('/')
def index():
    log_it()
    print("l")
    return jsonify(get_cookie())