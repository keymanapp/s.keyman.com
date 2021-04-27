<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: max-age=0');

$result = search();
emit($result);

function version_filter($a) {
  if($a == '.' || $a == '..') return false;
  return preg_match('/^\d+\.\d+(\.\d+)*$/', $a);
}

function version_compare_backward($a, $b) {
  return version_compare($a, $b, '<');
}

function search() {
  $result = [];
  $dirs = scandir(__DIR__ . "/../kmw/engine");
  $dirs = array_filter($dirs, 'version_filter');
  if(count($dirs) > 0) {
    usort($dirs, 'version_compare_backward');
    $result['versions'] = $dirs;
  } else {
    $result['error'] = 'No releases found';
  }
  return $result;
}

function emit($result) {
  echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
}

