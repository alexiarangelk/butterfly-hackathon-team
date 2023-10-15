import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from PIL import ImageFile, Image
# from numpy import expand_dims
from werkzeug.utils import secure_filename
# from keras.applications.imagenet_utils import preprocess_input, decode_predictions
# from keras.preprocessing import image
# from keras.applications.resnet50 import ResNet50
ImageFile.LOAD_TRUNCATED_IMAGES = True

import tensorflow as tf
import numpy as np
from tensorflow import keras as k
from keras import layers
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import load_model

#For accurate labels
import pandas as pd
imageLabels = pd.read_csv('../back-end/ButterflyId.csv') #Read the CSV file into the variable df (DataFile)

def getPrediction(img_bytes, model):
    #Loads the image and transforms it to (224, 224, 3) shape
    
    original_image = Image.open(img_bytes)
    original_image = original_image.convert('RGB')
    original_image = original_image.resize((224, 224), Image.NEAREST)
    
    resize = tf.image.resize(original_image, (224,224))
    img_array = tf.keras.utils.img_to_array(resize)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    predictions = model.predict(img_array)
    return predictions

def classifyImage(file):
    # Returns the prediction
    model = load_model('../back-end/models/butterflyclassifier4.keras')

    preds = getPrediction(file, model)
    score = tf.nn.softmax(preds[0])

    result = (
        "This image most likely belongs to {} with a {:.2f} percent confidence."
        .format(imageLabels.iloc[np.argmax(score), 0], 100 * np.max(score)))

    return result