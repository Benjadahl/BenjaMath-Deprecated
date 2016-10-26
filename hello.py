#!/usr/bin/env python3

from flask import *
import socketserver
from http.server import BaseHTTPRequestHandler

class TCPHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print("xDD")
        print(self.path)
        if self.path == "/test":
            print("lewl")

        self.send_response(200)


app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World! This is powered by Python backend."

if __name__ == "__main__":
    HOST, PORT = "localhost", 9995
    server = socketserver.TCPServer((HOST, PORT), TCPHandler)
    print('oh hello')
    server.serve_forever()
