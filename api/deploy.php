<?php

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: max-age=0');

if(!isset($_REQUEST['key']) || !isset($_SERVER['s_keyman_com_deploy_key'])) {
  echo `{ "error": "Invalid key" }`;
  exit(0);
}

$key = $_REQUEST['key'];
if($key != $_SERVER['s_keyman_com_deploy_key']) {
  echo `{ "error": "Invalid key" }`;
  exit(0);
}

// This triggers the continuous webjob in App_Data/WebJobs/continuous/deploy
file_put_contents('../.MUST_DEPLOY', "must deploy");

echo `{ "result": "Triggered deployment via background web job" }`;
