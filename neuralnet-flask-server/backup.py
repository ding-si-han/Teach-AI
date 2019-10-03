from threading import Timer
from flask import Flask, jsonify
from datetime import datetime as dt
import random

app = Flask(__name__)
DATA = "data"

def update_data(interval):
    Timer(interval, update_data, [interval]).start()
    global TIMESTAMP, person1, person2, person3, average
    TIMESTAMP = dt.now().minute * 60 + dt.now().second
    person1 = random.randint(1,5)
    person2 = random.randint(1,5)
    person3 = random.randint(1,5)
    average = (person1 + person2 + person3) / 3
    average = str(round(average, 2))
    

# update data every second
update_data(1.5)

@app.route("/")
def index():
    return  jsonify(
        timestamp= TIMESTAMP,
        person1 = person1,
        person1name = "John",
        person2 = person2,
        person2name = "Tim",
        person3 = person3,
        person3name = "Western",
        average = average,
        sleepingValue = 2,
        raiseHandValue = 1,
        numPerson = 3,
        alertToilet = "John",
        # alertToilet = null

    )

if __name__ == "__main__":
    app.run(debug=True)