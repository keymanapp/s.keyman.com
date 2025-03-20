#!/usr/bin/env bash

THIS_SCRIPT="$(readlink -f "${BASH_SOURCE[0]}")"
THIS_SCRIPT_PATH="$(dirname "$THIS_SCRIPT")"

echo "---- Generating static file ----"

cd "$THIS_SCRIPT_PATH/../deploy"
./kmwversion.sh
cd ../
