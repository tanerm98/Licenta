#!/usr/local/bin/python3

import json
import logging
import os
import subprocess

from flask import Flask, request, jsonify, Response

logging.getLogger().setLevel(logging.INFO)

GET = "GET"
POST = "POST"

app = Flask(__name__)

BUSY = False

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3004)