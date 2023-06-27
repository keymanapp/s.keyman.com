#!//usr/bin/env bash
# Creates a static JSON file of KMW versions in descending order 

set -eu

. ./jq.inc.sh

# Get a directory listing of KMW versions
function _getKMWVersions () {
  cd ../kmw/engine
  local arr=( */ );       # This creates an array of the full paths to all subdirs
  arr=("${arr[@]%/}")     # This removes the trailing slash on each item
  arr=("${arr[@]##*/}")   # This removes the path prefix, leaving just the dir names
  cd ../../api
  echo ${arr[*]}
}


# Sort the versions in descending order
# https://stackoverflow.com/questions/65315720/how-to-sort-release-version-string-in-descending-order-with-bash
function _sortVersions () {
  sorted=( $(echo "$@" | sed 's/ /\n/g' | sort -t. -k1,1rn -k2,2rn -k3,3rn) )
  echo "${sorted[*]}"
}

declare -a v
v=$(_getKMWVersions)
#echo "v is ${v[*]}"

sortedVersions=$(_sortVersions "${v[@]}")
#echo "sorted is ${sortedVersions[*]}"

# Create JSON file and pretty-print
$JQ -nc '{versions: $ARGS.positional}' --args ${sortedVersions[@]} | $JQ --indent 4 > ../metadata/kmwversions.json
