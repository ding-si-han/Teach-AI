# FLASK LIBRARIES
from threading import Timer
from flask import Flask, jsonify
from datetime import datetime as dt
import random

# TF LIBRARIES
import keras, os, pickle, ast
# import implicit
import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import OneHotEncoder
from IPython.display import SVG
from keras.models import model_from_json
from keras.optimizers import Adam
from keras.layers import Dense,Dropout, Activation
from keras.layers.normalization import BatchNormalization
from keras.callbacks import CSVLogger
from keras.utils.vis_utils import model_to_dot
from IPython.display import SVG
from keras.callbacks import ReduceLROnPlateau, History
from keras.regularizers import l1,l2
import seaborn as sns
sns.set()

# SET PARAMS
import time
i = 0
# global count = 0
global loaded_model
count = 0
predictArray = []


app = Flask(__name__)
DATA = "data"


# server_configuration = {
#     "port": 5000,
#     "host": "localhost",
#     "debug": True

# }


# LOAD MODEL

print("LOADED MODEL")
# load json and create model
json_file = open('model.json', 'r')
loaded_model_json = json_file.read()
json_file.close()
loaded_model = model_from_json(loaded_model_json)

# load weights into new model
loaded_model.load_weights("model.h5")
print("Loaded model from disk")

loaded_model.compile(loss='categorical_crossentropy', optimizer= Adam(lr = 0.000005), metrics=['categorical_accuracy'])

#useful variables
emo_order = [3,0,2,1]
pose_order = [2,1,0]
gaze_order = [1,0]

#PRINT METRICS
def hello(model):
    global i, predictions
    # read csv from the bottom
    df_test = _data()

    # change to numpy format
    A = df_test.iloc[i:i + 1,:6].to_numpy()

    #make prediction
    print()
    print(A)
    print("Happy: ", A[0][0])
    print("Looking away: ", A[0][-1])
    print("Raising Hand: ", A[0][-3])
    print("Sleeping : ", A[0][-2])
    # print("Angry: ", A[i][1])
    # print("Disgusted: ", A[i][2])
    try:
        predictions = loaded_model.predict_classes(A, verbose = 1) + 1
    except:
        predictions = 0

    #we want to convert the np array to an integer value
    print(int(predictions))
    print("read csv, reading from second {}".format(i))
    i = i + 1

    #reset count every 5 seconds
    if i == 5:
        i = 0

# READ DATA
def _data():
    df_emo = pd.read_csv('Expression.csv')
    df_emo = df_emo.drop(columns = ['_x', '_y', '_width', '_height', 'fearful', 'neutral', 'sad','surprised', 'numPerson', 'personId'])
    df_emo = df_emo[df_emo.columns[emo_order]]
    df_emo = df_emo.groupby(['timestamp']).mean()

    df_pose = pd.read_csv('Pose.csv')
    df_pose = df_pose.drop(columns = ['eyeCoordX', 'eyeCoordY', 'numPersons', 'personId'])
    df_pose = df_pose[df_pose.columns[pose_order]]
    df_pose = df_pose.groupby(['timestamp']).max()

    df_gaze = pd.read_csv('HeadGaze.csv')
    df_gaze = df_gaze.drop(columns = ['xCord', 'yCord', 'count', 'numPerson', 'personId'])
    df_gaze = df_gaze[df_gaze.columns[gaze_order]]
    df_gaze = df_gaze.groupby(['timestamp']).mean()

    # merge the different dataframes
    df_test = df_emo.merge(df_pose, on = 'timestamp', how = 'left')
    df_test = df_test.merge(df_gaze, on = 'timestamp', how = 'left')

    #fill up the nan values
    df_test = df_test.fillna(method = 'bfill')

    #fill up the rest of nan values
    df_test = df_test.fillna(method = 'ffill')

    #to check if there are still any NaN values (assuming nothing has been read at all to fill)
    df_test = df_test.fillna(0)

    #currently indexed with the timestamp, change back to normal index and drop timestamp column
    df_test = df_test.reset_index()
    df_test = df_test.drop(columns = ['timestamp'])


    return df_test

def predict_at_time(interval):
    Timer(interval, predict_at_time, [interval]).start()
    global count, loaded_model, predictions, predictArray, person1, person6
    print("PREDICT AT TIME") 
    hello(loaded_model)          
    print("count number {}".format(count))
    # print("type is ", type(predictions[0].item()))
    if len(predictArray) < 7:
        predictArray.append(predictions[0].item())
    else:
        predictArray.append(predictions[0].item())
        predictArray.pop(0)
    print(predictArray)    
    person1 = sum(predictArray) / len(predictArray)

    print(person1)
    person6 = round (person1)
    person1 = str(round(person1, 2))
    print(type(person1))

    count += 1

def update_data(interval):
    Timer(interval, update_data, [interval]).start()
    global TIMESTAMP, person1, person2, person3, average
    TIMESTAMP = dt.now().minute * 60 + dt.now().second
    # person1 = random.randint(1,5)
    # person1 = random.randint(1,5)
    person2 = random.randint(1,5)
    person3 = random.randint(1,5)
    average = ( person2 + person3) / 3
    average = str(round(average, 2))

    print("UPDATED DATA")


# update data every second
predict_at_time(1)
update_data(1) 
# predict_at_time(1)





# FLASK ROUTING 
@app.route("/")
def index():
    return  jsonify(
        timestamp= TIMESTAMP,
        person6 = person6,
        person1 = person1,
        person1name = "John",
        person2 = person2,
        average = average,
        sleepingValue = 2,
        raiseHandValue = 1,
        numPerson = 2,
        alertToilet = "John",
        realtime = dt.now()
        # alertToilet = null

    )


if __name__ == '__main__':
    app.run(host='0.0.0.0',port= 500,debug=True)