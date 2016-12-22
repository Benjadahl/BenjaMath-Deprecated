#!/usr/bin/env python3

from flask import *
from mpmath import *
from sympy import *
from sympy.parsing.sympy_parser import parse_expr
import json

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

@app.route('/solveEq/', methods=['POST'])
def solveEq():
    print(request.json)
    expressions = request.json["eq"].split("=")
    variable = request.json["variable"]
    #Loop through the list while both keeping the value and the index stored
    for i, expression in enumerate(expressions):
        expressions[i] = parse_expr(expression)
    eq = expressions[0] - expressions[1]
    results = str(solve(eq, Symbol(variable)))
    return json.dumps(results)

if __name__ == "__main__":
    print('oh hello')
    app.run(debug=True, host="0.0.0.0")
