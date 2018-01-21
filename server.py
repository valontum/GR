from flask import Flask, url_for, request
app = Flask(__name__)







import base64
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
from time import time
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras.optimizers import Adam
from keras.preprocessing.image import ImageDataGenerator, load_img
from keras.preprocessing.image import array_to_img, img_to_array
from keras import backend as K

import tensorflow as tf
from keras.models import model_from_json
from keras.preprocessing.image import img_to_array
from keras.backend.tensorflow_backend import set_session
from keras.preprocessing.image import ImageDataGenerator, load_img
from PIL import Image
from io import BytesIO


config = tf.ConfigProto()
config.gpu_options.per_process_gpu_memory_fraction = 0.7
config.gpu_options.allow_growth = True
set_session(tf.Session(config=config))

fname = '/traffic-light-detection/models/model_keras_v2.0.8_11195_16_100_1508741543103608'
file = open(fname + '.json', 'r')
json_string = file.read()
file.close()
model = model_from_json(json_string)
model.load_weights(fname + '.h5')


model._make_predict_function()
graph = tf.get_default_graph()



@app.route('/')
def api_root():
    return 'Welcome'

@app.route('/articles')
def api_articles():

    img_width, img_height = 150, 150
    
    
   
    image = load_img("Images/out.jpg")
    

    image = image.resize((img_width, img_height))
    image = img_to_array(image, data_format='channels_last') / 255.
    image = image.reshape((1,) + image.shape)
    
    return str(model.predict_classes(image)[0])



if __name__ == '__main__':
    app.run()
