<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: max-age=0');

if(!isset($_REQUEST['majorVersion']) || !preg_match('/^\d+$/', $_REQUEST['majorVersion'])) {
  $result = [];
  $result['error'] = 'Invalid majorVersion parameter, must be integer';
  emit($result);
  exit();
}

$majorVersion = $_REQUEST['majorVersion'];
$result = search($majorVersion);
emit($result);

function version_filter($a) {
  global $majorVersion;
  if($a == '.' || $a == '..') return false;
  return preg_match('/^'.$majorVersion.'\.\d+(\.\d+)*$/', $a);
}

function version_compare_backward($a, $b) {
  return version_compare($a, $b, '<');
}

function search($majorVersion) {
  $result = [];
  $dirs = scandir(__DIR__ . "/../kmw/engine");
  $dirs = array_filter($dirs, 'version_filter');
  if(count($dirs) > 0) {
    usort($dirs, 'version_compare_backward');
    $result['version'] = $dirs[0];
  } else {
    $result['error'] = 'No releases found';
  }
  return $result;
}

function emit($result) {
  echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}

