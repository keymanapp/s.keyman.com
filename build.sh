#!/usr/bin/env bash
## START STANDARD BUILD SCRIPT INCLUDE
# adjust relative paths as necessary
THIS_SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
. "${THIS_SCRIPT%/*}/resources/builder.inc.sh"
## END STANDARD BUILD SCRIPT INCLUDE

################################ Main script ################################

builder_describe "Setup s.keyman.com site to run via Docker." \
  configure \
  clean \
  build \
  start \
  stop \
  test \

builder_parse "$@"

# This script runs from its own folder
cd "$REPO_ROOT"

# Get the docker image ID
function _get_docker_image_id() {
  echo "$(docker images -q s-keyman-website)"
}

# Get the Docker container ID
function _get_docker_container_id() {
  echo "$(docker ps -a -q --filter ancestor=s-keyman-website)"
}

function _stop_docker_container() {
  local S_CONTAINER=$(_get_docker_container_id)
  local CONTAINER_NAME="s-keyman-website"

  if [ ! -z "$S_CONTAINER" ]; then
    docker container stop ${CONTAINER_NAME}
  else
    echo "No Docker container to stop"
  fi
}

function _delete_docker_image() {
  builder_echo "Stopping running container for s.keyman.com"
  _stop_docker_container
  local S_IMAGE=$(_get_docker_image_id)
  if [ ! -z "$S_IMAGE" ]; then
    builder_echo "Removing image $S_IMAGE for s.keyman.com"
    docker rmi "$S_IMAGE"
  else
    builder_echo "No Docker s.keyman.com image to delete"
  fi
}


builder_run_action configure # no action

# Stop and cleanup Docker containers and images used for the site

builder_run_action clean _delete_docker_image

# Stop the Docker containers
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
      docker run -rm -d -p 8054:80 \
        -v //$(pwd):/var/www/html/ \
        -e S_KEYMAN_COM=localhost:8054 \
        --name s-keyman-website \
        s-keyman-website
    else
      docker run -d -p 8054:80 \
        -v $(pwd):/var/www/html/
        -e S_KEYMAN_COM=localhost:8054 \
        --name s-keyman-website \
        s-keyman-website
    fi
  else
    builder_echo error "ERROR: Docker container doesn't exist. Run ./build.sh build first"
    builder_finish_action fail start
  fi

  # No Composer link needed
  builder_finish_action success start
fi

if builder_start_action test; then
  # TODO: lint tests

  docker exec -i s-keyman-website sh -c "php /var/www/html/vendor/bin/phpunit --testdox"

  #composer check-docker-links

  builder_finish_action success test
fi
