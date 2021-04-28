#!/usr/local/bin/python3


from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload
from google.oauth2 import service_account
import io
import json
import subprocess
import zipfile
import os

import logging
logging.getLogger().setLevel(logging.INFO)


def download_file_from_google_drive(file_id, file_name):
    """
    Download file from Google Drive;
    Used for downloading the tested apps.
    :param file_id: ID of file from Google Drive
    :return: True - if download successful; False - if download failed.

    Usage: download_file_from_google_drive('1OR2c_ZOVyiz1SwSYoEP2FzuvL9Ldphrk', 'app.zip')
    """
    try:
        logging.info("Downloading file from Google Drive...")
        with open('gdrive_api_service_credentials.json') as json_file:
            credz = json.load(json_file)

        credentials = service_account.Credentials.from_service_account_info(credz)
        drive_service = build('drive', 'v3', credentials=credentials)

        request = drive_service.files().get_media(fileId=file_id)
        fh = io.FileIO(file_name, 'wb')
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while done is False:
            status, done = downloader.next_chunk()
            logging.info("Status: %d%% downloaded..." % int(status.progress() * 100))

    except Exception as e:
        logging.error("Download failed with error '{ERROR}'".format(ERROR=e))
        return False

    logging.info("Download successful!")
    return True


def unzip_archive(archive_name):
    """
    Unzips archive with APP file.
    :param archive_name: name of archive downloaded from Google Drive.
    :return: APP file name if successful; None if failure.
    Usage: unzip_archive("app.zip")
    """
    try:
        logging.info("Extracting archive '{ARCHIVE}'...".format(ARCHIVE=archive_name))
        with zipfile.ZipFile(archive_name, 'r') as zip_ref:
            zip_ref.extractall(os.getcwd())
            app_name = str(zip_ref.namelist()[0])[:-1]

    except Exception as e:
        logging.error("Extracting failed with error '{ERROR}'".format(ERROR=e))
        return None

    logging.info("Extracted app name: '{NAME}'".format(NAME=app_name))
    return app_name


def comment_on_pr(auth_token, comment, repo_owner, repo_name, pr_number):
    """
    Posts comment on a pull-request in a Github repository
    :param auth_token: authentication token for the Github account
    :param comment: the message to be posted
    :param repo_owner: owner of the repository
    :param repo_name: name of the repository
    :param pr_number: pull-request ID
    :return: True - if comment successful; False - if comment failed.

    Usage: comment_on_pr("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", "Test de comment 1", "tanerm98", "Licenta", 1)
    """
    try:
        logging.info("Posting comment '{COMMENT}' on PR '{PR}' for repository '{REPO}'...".format(
            COMMENT=comment,
            PR=pr_number,
            REPO=repo_name)
        )

        command = "curl -s -H "
        command += "\"Authorization: token {TOKEN}\" ".format(TOKEN=auth_token)
        command += "-X POST -d "
        command += "'{BODY}' ".format(BODY=str({"body": comment}).replace("'", "\""))
        command += "\"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/issues/{PR_NUMBER}/comments\"".format(
            REPO_OWNER=repo_owner,
            REPO_NAME=repo_name,
            PR_NUMBER=pr_number
        )
        subprocess.Popen(command, shell=True).wait()

    except Exception as e:
        logging.error("Commenting failed with error '{ERROR}'".format(ERROR=e))
        return False

    logging.info("Comment posted successfuly!")
    return True
