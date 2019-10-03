from flask import Flask, jsonify
app = Flask(__name__)
from threading import Timer

x = 0
y = 0

def update_data(interval):
    Timer(interval, update_data, [interval]).start()
    global x, y
    if x > 400:
        x = 0
        y = 0
    x += 1
    y += 2

    print("UPDATED DATA")


# update data every second
update_data(0.25) 

@app.route('/')
def hello():
    return jsonify(
        x = x,
        y = y
    )

if __name__ == '__main__':
    app.run()