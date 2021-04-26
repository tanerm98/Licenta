#!/usr/local/bin/python3

from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from google.oauth2 import service_account
import io
import json
import subprocess

def download_file_from_google_drive(file_id):
    with open('gdrive_api_service_credentials.json') as json_file:
        credz = json.load(json_file)

    # More info: https://cloud.google.com/docs/authentication
    credentials = service_account.Credentials.from_service_account_info(credz)
    drive_service = build('drive', 'v3', credentials=credentials)

    request = drive_service.files().get_media(fileId=file_id)
    fh = io.FileIO("app.zip", 'wb')
    downloader = MediaIoBaseDownload(fh, request)
    done = False
    while done is False:
        status, done = downloader.next_chunk()
        print("Download %d%%." % int(status.progress() * 100))

def comment_on_PR(auth_token, message, repo_owner, repo_name, pr_number):
    command = "curl -s -H "
    command += "\"Authorization: token {TOKEN}\" ".format(TOKEN=auth_token)
    command += "-X POST -d "
    command += "'{BODY}' ".format(BODY=str({"body": message}).replace("'", "\""))
    command += "\"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues/{PR_NUMBER}/comments\"".format(
        REPO_OWNER=repo_owner,
        REPO_NAME=repo_name,
        PR_NUMBER=pr_number
    )
    subprocess.Popen(command, shell=True).wait()

# download_file_from_google_drive('1OR2c_ZOVyiz1SwSYoEP2FzuvL9Ldphrk')
# comment_on_PR("", "Test de comment", "tanerm98", "Licenta", 1)