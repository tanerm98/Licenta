#!/usr/local/bin/python3

import argparse
import subprocess
import logging
import time
logging.getLogger().setLevel(logging.INFO)


def parse_args():
    """
    Parses parameters of the script.
    :return: arguments
    """
    logging.info("Parsing script parameters...")
    parser = argparse.ArgumentParser(description='Measure iOS application performance.')

    # Mandatory arguments - test information
    parser.add_argument('--device', required=False, nargs='*', choices=["iPhone 8", "iPhone 11"], default=["iPhone 8", "iPhone 11"], help='iPhone type for running the tests on')
    parser.add_argument('--launch_type', required=False, nargs='*', choices=["WARM", "COLD"], default=["WARM", "COLD"], help='Tested launch type')
    parser.add_argument('--launch_nr', required=False, default=3, type=int, help='Number of launches for computing the average metric')

    # App information for installing app
    parser.add_argument('--app_name', required=True, type=str, help='Name of the tested iOS APP file')
    # There are 2 mutually exclusive options for getting the APP
    # Option 1 - from local machine
    parser.add_argument('--app_path', required=False, default=None, type=str, help='Path of the APP file')
    # Option 2 - from Google Drive
    parser.add_argument('--file_id', required=False, default=None, type=str, help='Google Drive ID of archive that contains the tested application - used for downloading the app')

    # App information for running app
    parser.add_argument('--bundle_id', required=True, type=str, help='Bundle ID of the tested iOS application')

    # Arguments necessary for posting test results on the Github repository of the iOS application
    parser.add_argument('--repo_github_token', required=False, default=None, type=str, help='Github token')
    parser.add_argument('--repo_owner', required=False, default=None, type=str, help='Owner of the repository')
    parser.add_argument('--repo_name', required=False, default=None, type=str, help='Name of the repository')
    parser.add_argument('--pr_number', required=False, default=None, type=str, help='PR number on which to post the comment')

    args = parser.parse_args()

    if args.app_path is None and args.file_id is None:
        logging.error("No APP location provided! Will check if app is already installed on device.")

    if args.app_path is not None and args.file_id is not None:
        logging.error("Both local path APP and Google Drive file ID provided! Will use local path.")

    if None in [args.repo_github_token, args.repo_owner, args.repo_name, args.pr_number]:
        logging.error("Test report will not be posted on Github PR - at least one Github parameter is missing!")

    return args


def prepare_simulator(simulator_name):
    """
    Erases the contents of tested simulator - similar to factory reset
    :param simulator_name: the simulator name to prepare (ex: iPhone 8, iPhone 11)
    :return: True if everything worked fine - False instead
    """
    logging.info("Preparing simulator {SIMULATOR}...".format(SIMULATOR=simulator_name))

    try:
        subprocess.Popen(
            "xcrun simctl erase '{SIMULATOR}'".format(SIMULATOR=simulator_name),
            shell=True
        ).wait()

    except Exception as e:
        logging.error("Preparing the simulator {SIMULATOR} failed with error '{ERROR}'".format(SIMULATOR=simulator_name, ERROR=e))
        return False

    logging.info("Simulator {SIMULATOR} clean!".format(SIMULATOR=simulator_name))
    return True


def boot_simulator(simulator_name):
    """
    Boots the simulator and waits for it to be ready.
    :param simulator_name: the simulator name to boot (ex: iPhone 8, iPhone 11)
    :return: True if everything worked fine - False instead
    """
    logging.info("Booting simulator {SIMULATOR}...".format(SIMULATOR=simulator_name))

    try:
        subprocess.Popen("xcrun simctl boot '{SIMULATOR}'".format(SIMULATOR=simulator_name), shell=True).wait()
        subprocess.Popen(
            "xcrun simctl launch '{SIMULATOR}' com.apple.Preferences".format(SIMULATOR=simulator_name),
            stdout=subprocess.PIPE,
            shell=True
        ).wait()
        subprocess.Popen(
            "xcrun simctl terminate '{SIMULATOR}' com.apple.Preferences".format(SIMULATOR=simulator_name),
            stdout=subprocess.PIPE,
            shell=True
        ).wait()

    except Exception as e:
        logging.error("Booting the simulators failed with error '{ERROR}'".format(ERROR=e))
        return False

    logging.info("Simulator booted!")
    return True


def shutdown_simulators():
    """
        Shuts down all the simulators
        :return: True if everything worked fine - False instead
        """
    logging.info("Shutting down all simulators...")

    try:
        subprocess.Popen("xcrun simctl shutdown all", shell=True).wait()

    except Exception as e:
        logging.error("Shutting down the simulators failed with error '{ERROR}'".format(ERROR=e))
        return False

    logging.info("Simulators shut down!")
    return True


def run_tests(args):
    test_results = []

    shutdown_simulators()
    for simulator_name in args.device:
        logging.info("Running tests on device {DEVICE}...".format(DEVICE=simulator_name))
        prepare_simulator(simulator_name)
        boot_simulator(simulator_name)

        # test

        shutdown_simulators()
        logging.info("Finished running tests on device {DEVICE}...".format(DEVICE=simulator_name))

    return test_results


def main():
    args = parse_args()
    test_results = run_tests(args)


if __name__ == "__main__":
    main()
