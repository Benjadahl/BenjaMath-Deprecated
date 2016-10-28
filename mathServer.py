#!/usr/bin/env python3

from flask import *
from mpmath import *
from sympy import *

app = Flask(__name__)

@app.route("/mathServer/")
def hello():
    print("Sending the mathHandler document")
    return render_template("mathHandler.html")

@app.route('/sendMath/', methods=['POST'])
def sendMath():
    print("Got a math request")
    print(request.json)
    return "DankMemerMan"

if __name__ == "__main__":
    print('oh hello')
    app.run(debug=True, host="0.0.0.0")
