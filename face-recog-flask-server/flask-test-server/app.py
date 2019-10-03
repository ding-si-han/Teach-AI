from flask import Flask, jsonify
app = Flask(__name__)
from threading import Timer
import face_recognition
import cv2
import csv
import numpy as np
from datetime import datetime
import pandas as pd

server_configuration = {
    "port": 5005,
    "host": "localhost",
    "debug": True

}


x = 0
y = 0

def update_data(interval):
    Timer(interval, update_data, [interval]).start()
    global name_dict
    # if x > 400:
    #     x = 0
    #     y = 0
    # x += 1
    # y += 2

    print("UPDATED DATA")

    # READ LAST 5 Lines of CSV (if exists)
    face_df = pd.read_csv("./oneShotLearning.csv")
    # face_x = face_df[" left"].iloc[-1]
    # face_y = face_df[" top"].iloc[-1]
    # face_name = face_df["name"].iloc[-1]
    # print("X COORDINATES: ", face_x.item())
    # print("Y COORDINATES: ", face_y.item())
    # print("FACE NAME: ", face_name)
    # print()
    # print(type(face_x))

    # numPerson = face_df["numPerson"].iloc[-1].item()

    # Find max of timestamp
    max_timestamp = face_df.iloc[-1, 3]
    print(max_timestamp)

    # Filter last 10 seconds frame
    new_df = face_df[face_df.timestamp - max_timestamp > - 3]
    
    # Find unique names
    new_names = new_df.name.unique()
    print(new_names)

    name_dict = {}
    # Find last occurence of name from the bottom
    for name in new_names:
        # Get the latest left, top and presence
        latest_timestamp = new_df[new_df.name == name].iloc[-1, 3]
        latest_left = new_df[new_df.name == name].iloc[-1, 1]
        latest_top = new_df[new_df.name == name].iloc[-1, 2]
        if latest_timestamp == max_timestamp: 
            notDetected = 0
        else:
            notDetected = 1
        name_dict[name] = {
            "latest_timestamp" : latest_timestamp.item(),
            "latest_left" : latest_left.item(),
            "latest_top" : latest_top.item(),
            "notDetected": notDetected,
            "name": name
        }
    print(name_dict)


    # 

update_data(0.2)


@app.route('/')
def hello():
    return jsonify(name_dict)

if __name__ == '__main__':
    app.run(host=server_configuration['host'], 
    port = server_configuration['port'],
    debug = server_configuration['debug'])