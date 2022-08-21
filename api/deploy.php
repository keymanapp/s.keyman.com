<?php

require_once 'webhooks.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: max-age=0');

if(!isset($_SERVER['s_keyman_com_deploy_key'])) {
  die('Incomplete setup');
}

// If secret is not set, this will die
$json = getWebhookData($_SERVER['s_keyman_com_deploy_key']);

// This triggers the continuous webjob in App_Data/WebJobs/continuous/deploy
file_put_contents('../.MUST_DEPLOY', "must deploy");

echo `{ "result": "Triggered deployment via background web job" }`;
