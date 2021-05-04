#!/usr/local/bin/python3


import argparse

import logging
logging.getLogger().setLevel(logging.INFO)


def parse_args():
    """
    Parse parameters of the script.
    :return: arguments
    """
    logging.info("Parsing script parameters...")
    parser = argparse.ArgumentParser(description='Measure iOS application performance.')

    # Mandatory arguments - test information
    parser.add_argument('--bundle_id', required=True, type=str, help='Bundle ID of the tested iOS application')
    parser.add_argument('--app_name', required=True, type=str, help='Name of the tested iOS APP file')
    parser.add_argument('--launch_nr', required=False, default=3, type=int, help='Number of launches for computing the average metric')
    parser.add_argument('--device', required=False, nargs='*', choices=["iPhone 8", "iPhone 11"], default=["iPhone 8", "iPhone 11"], help='iPhone type for running the tests on')
    parser.add_argument('--launch_type', required=False, nargs='*', choices=["WARM", "COLD"], default=["WARM", "COLD"], help='Tested launch type')

    # There are 2 mutually exclusive options for getting the APP
    # Option 1 - from local machine
    parser.add_argument('--app_path', required=False, default=None, type=str, help='Path of the APP file')
    # Option 2 - from Google Drive
    parser.add_argument('--file_id', required=False, default=None, type=str, help='Google Drive ID of archive that contains the tested application - used for downloading the app')

    # Arguments necessary for posting test results on the Github repository of the iOS application
    parser.add_argument('--repo_github_token', required=False, default=None, type=str, help='Github token')
    parser.add_argument('--repo_owner', required=False, default=None, type=str, help='Owner of the repository')
    parser.add_argument('--repo_name', required=False, default=None, type=str, help='Name of the repository')
    parser.add_argument('--pr_number', required=False, default=None, type=str, help='PR number on which to post the comment')

    args = parser.parse_args()

    if args.app_path is None and args.file_id is None:
        logging.error("No APP location provided!")
        raise Exception("You must proved the APP path or Google Drive ID")

    if None in [args.repo_github_token, args.repo_owner, args.repo_name, args.pr_number]:
        logging.error("Test report will not be posted on Github PR - at least one Github parameter is missing!")

    return args

parse_args()