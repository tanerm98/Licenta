#!/usr/local/bin/python3

import googleapiclient, httplib2, oauth2client
from googleapiclient import discovery
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from google.oauth2 import service_account
from httplib2 import Http
from oauth2client import file, client, tools
import io
import json

def download_file_from_google_drive():
    file_id = '1OR2c_ZOVyiz1SwSYoEP2FzuvL9Ldphrk'

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

download_file_from_google_drive()