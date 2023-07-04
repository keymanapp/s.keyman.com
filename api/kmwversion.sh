#!//usr/bin/env bash
# Creates a static JSON file of KMW versions in descending order 

set -eu

. ./jq.inc.sh

# Sort the versions in descending order
# https://stackoverflow.com/questions/65315720/how-to-sort-release-version-string-in-descending-order-with-bash
function _sortVersions () {
  local sorted=( $(echo "$@" | sed 's/ /\n/g' | sort -t. -k1,1rn -k2,2rn -k3,3rn) )
  echo "${sorted[*]}"
}

# Get a directory listing of KMW versions sorted in descending order
function _search () {
  cd ../kmw/engine
  local arr=( */ );       # This creates an array of the full paths to all subdirs
  if [ "${arr[0]}" != "*/" ]; then
    arr=("${arr[@]%/}")     # This removes the trailing slash on each item
    arr=("${arr[@]##*/}")   # This removes the path prefix, leaving just the dir names

    #echo "before sort, arr is ${arr[@]}"
    local sorted_arr=$(_sortVersions "${arr[@]}")
    echo ${sorted_arr[*]}
  fi  

  cd ../../api
}

# Write result to JSON file
function _emit () {
  if [ ! -z "$result" ]; then
    $JQ -nc '{versions: $ARGS.positional}' --args ${result[@]} | \
      $JQ --indent 4 > ../metadata/kmwversions.json 
  else
    $JQ -nc '{error: "No releases found"}' | \
      $JQ --indent 4 > ../metadata/kmwversions.json    
  fi
}

declare -a result
result=$(_search)
#echo "result is ${result[*]}"

_emit
