<?php
  require_once __DIR__ . '/../tools/autoload.php';
  use Keyman\Site\Common\KeymanHosts;

  echo "<p>TIER: " . KeymanHosts::Instance()->Tier() . "</p>";
