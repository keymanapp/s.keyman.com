#!/usr/bin/env bash
## START STANDARD SITE BUILD SCRIPT INCLUDE
readonly THIS_SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
readonly BOOTSTRAP="$(dirname "$THIS_SCRIPT")/resources/bootstrap.inc.sh"
readonly BOOTSTRAP_VERSION=v1.0.5
[ -f "$BOOTSTRAP" ] && source "$BOOTSTRAP" || source <(curl -fs https://raw.githubusercontent.com/keymanapp/shared-sites/$BOOTSTRAP_VERSION/bootstrap.inc.sh)
## END STANDARD SITE BUILD SCRIPT INCLUDE

readonly S_KEYMAN_CONTAINER_NAME=s-keyman-website
readonly S_KEYMAN_CONTAINER_DESC=s-keyman-com-app
readonly S_KEYMAN_IMAGE_NAME=s-keyman-website
readonly HOST_S_KEYMAN_COM=s.keyman.com.localhost

source _common/keyman-local-ports.inc.sh
source _common/docker.inc.sh

################################ Main script ################################

builder_describe \
  "Setup s.keyman.com site to run via Docker." \
  configure \
  clean \
  build \
  start \
  stop \
  test \

builder_parse "$@"

function test_docker_container() {
  # Note: ci.yml replicates these

  # TODO: Run unit tests
  #docker exec $S_KEYMAN_CONTAINER_DESC sh -c "vendor/bin/phpunit --testdox"

  # Lint .php files for obvious errors
  docker exec $S_KEYMAN_CONTAINER_DESC sh -c "find . -name '*.php' | grep -v '/vendor/' | xargs -n 1 -d '\\n' php -l"

  # Link checker not needed. No html files to verify

  # Verify static file generated
  if [ ! -f ./metadata/kmwversions.json ]; then
    builder_die "Failed to generate static file"
  fi
}

# Custom cleanup of static file
function clean_docker_container_s() {
  clean_docker_container $S_KEYMAN_IMAGE_NAME $S_KEYMAN_CONTAINER_NAME

  # Cleanup static file
   if [ -f ./metadata/kmwversions.json ]; then
    rm ./metadata/kmwversions.json
  fi
}

builder_run_action configure   bootstrap_configure
builder_run_action clean       clean_docker_container_s
builder_run_action stop        stop_docker_container  $S_KEYMAN_IMAGE_NAME $S_KEYMAN_CONTAINER_NAME
builder_run_action build       build_docker_container $S_KEYMAN_IMAGE_NAME $S_KEYMAN_CONTAINER_NAME
builder_run_action start       start_docker_container $S_KEYMAN_IMAGE_NAME $S_KEYMAN_CONTAINER_NAME $S_KEYMAN_CONTAINER_DESC $HOST_S_KEYMAN_COM $PORT_S_KEYMAN_COM

builder_run_action test        test_docker_container
