#!/usr/local/bin/python3

from flask import Flask
# from flask import request, jsonify, Response
# from datetime import datetime
# from time import sleep
# import os
# import json
#
# import logging
# logging.getLogger().setLevel(logging.INFO)

# GET = "GET"
# POST = "POST"

app = Flask(__name__)


# @app.route("/ruta1", methods=[GET])
# def hello():
#     response = app.response_class(
#         response=json.dumps({"message": "Hello, World!"}),
#         status=201,
#         mimetype='application/json'
#     )
#     return response
#
#
# @app.route("/ruta2", methods=[POST])
# def salut():
#     response = app.response_class(
#         response=json.dumps({"message": "Salut, Lume!"}),
#         status=201,
#         mimetype='application/json'
#     )
#     return response


@app.route('/')
def main():
    return 'hi'


if __name__ == '__main__':
    app.run(host='localhost', port=5001)