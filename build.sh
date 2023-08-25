#!/usr/bin/env bash
#
# Setup s.keyman.com site to run via Docker.
#
set -eu

## START STANDARD BUILD SCRIPT INCLUDE
# adjust relative paths as necessary
THIS_SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
. "${THIS_SCRIPT%/*}/resources/builder.inc.sh"
## END STANDARD BUILD SCRIPT INCLUDE

################################ Main script ################################

# Get the docker image ID
function _get_docker_image_id() {
  echo "$(docker images -q s-keyman-website)"
}

# Get the Docker container ID
function _get_docker_container_id() {
  echo "$(docker ps -a -q --filter ancestor=s-keyman-website)"
}

function _stop_docker_container() {
  local S_KEYMAN_CONTAINER=$(_get_docker_container_id)
  if [ ! -z "$S_KEYMAN_CONTAINER" ]; then
    docker container stop $S_KEYMAN_CONTAINER
  else
    echo "No Docker container to stop"
  fi
}

function _delete_docker_image() {
  local S_IMAGE=$(_get_docker_image_id)
  if [ ! -z "$S_IMAGE" ]; then
    builder_echo "Removing image $S_IMAGE for s.keyman.com"
    docker rmi "$S_IMAGE"
  else
    builder_echo "No Docker s.keyman.com image to delete"
  fi
}

builder_describe \
  "Setup s.keyman.com site to run via Docker." \
  configure \
  clean \
  build \
  start \
  stop \
  test \

builder_parse "$@"

# This script runs from its own folder
cd "$REPO_ROOT"

builder_run_action configure # no action

if builder_start_action clean; then
  # Cleanup static file
  if [ -f ./metadata/kmwversions.json ]; then
    rm ./metadata/kmwversions.json
  fi

  # Stop and cleanup Docker containers and images used for the site
  _stop_docker_container
  
  S_KEYMAN_CONTAINER=$(_get_docker_container_id)
  if [ ! -z "$S_KEYMAN_CONTAINER" ]; then
    docker container rm $S_KEYMAN_CONTAINER
  else
    echo "No Docker container to clean"
  fi
	
  _delete_docker_image
  
  builder_finish_action success clean
fi


# Stop the Docker container
builder_run_action stop _stop_docker_container

# Build the Docker container
if builder_start_action build; then
  # Download docker image. --mount option requires BuildKit
  DOCKER_BUILDKIT=1 docker build -t s-keyman-website .

  builder_finish_action success build
fi

if builder_start_action start; then
  # Start the Docker container
  if [ ! -z $(_get_docker_image_id) ]; then
    if [[ $OSTYPE =~ msys|cygwin ]]; then
      # Windows needs leading slashes for path
      SITE_HTML="//$(pwd):/var/www/html/"
    else
      SITE_HTML="$(pwd):/var/www/html/"
    fi

    docker run --rm -d -p 8054:80 -v ${SITE_HTML} \
      --name s-keyman-website \
      s-keyman-website

  else
    builder_echo error "ERROR: Docker container doesn't exist. Run ./build.sh build first"
    builder_finish_action fail start
  fi

  builder_finish_action success start
fi

if builder_start_action test; then
  # TODO: lint tests

  # Generate static file
  cd deploy
  ./kmwversion.sh
  cd ../
  
  if [ ! -f ./metadata/kmwversions.json ]; then
    builder_die "Failed to generate static file"
  fi
  builder_finish_action success test
fi
