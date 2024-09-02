#!/usr/bin/env bash

# Set strict mode
set -euo pipefail
IFS=$'\n\t'

# Default values
DEFAULT_BRANCH="main"
REMOTE="origin"

# Function to display error messages
error_exit() {
    echo "Error: $1" >&2
    exit 1
}

# Function to display usage information
usage() {
    echo "Usage: $0 [-b <branch>] [-r <remote>] [-h]"
    echo "  -b <branch>  Specify the branch to use (default: $DEFAULT_BRANCH)"
    echo "  -r <remote>  Specify the remote to use (default: $REMOTE)"
    echo "  -h           Display this help message"
    exit 1
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Parse command-line options
while getopts ":b:r:h" opt; do
    case ${opt} in
        b )
            DEFAULT_BRANCH=$OPTARG
            ;;
        r )
            REMOTE=$OPTARG
            ;;
        h )
            usage
            ;;
        \? )
            echo "Invalid option: $OPTARG" 1>&2
            usage
            ;;
        : )
            echo "Invalid option: $OPTARG requires an argument" 1>&2
            usage
            ;;
    esac
done
shift $((OPTIND -1))

# Check if required commands are available
command_exists npx || error_exit "npx is not installed. Please install Node.js and npm."
command_exists git || error_exit "git is not installed. Please install git."

# Check if we're in a git repository
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || error_exit "Not in a git repository. Please run this script from a git repository root."

# Ensure we're on the default branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "$DEFAULT_BRANCH" ]; then
    read -p "Not on $DEFAULT_BRANCH branch. Switch to $DEFAULT_BRANCH? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git checkout "$DEFAULT_BRANCH" || error_exit "Failed to switch to $DEFAULT_BRANCH branch"
    else
        error_exit "Please switch to the $DEFAULT_BRANCH branch before running this script."
    fi
fi

# Ensure the working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    error_exit "Working directory is not clean. Please commit or stash your changes."
fi

# Pull latest changes
echo "Pulling latest changes..."
git pull "$REMOTE" "$DEFAULT_BRANCH" || error_exit "Failed to pull latest changes"

# Run standard-version to bump version and update changelog
echo "Running standard-version..."
npx standard-version || error_exit "Failed to run standard-version"

# Push changes and tags
echo "Pushing changes and tags..."
git push --follow-tags "$REMOTE" "$DEFAULT_BRANCH" || error_exit "Failed to push changes and tags"

echo "Version bump and push completed successfully!"