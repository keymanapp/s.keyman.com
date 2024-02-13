<?php
  // Determine tier - copied from KeymanHosts.php
  $env = getenv();
  const TIER_DEVELOPMENT = "TIER_DEVELOPMENT";
  const TIER_STAGING = "TIER_STAGING";
  const TIER_PRODUCTION = "TIER_PRODUCTION";
  const TIER_TEST = "TIER_TEST";

  if(isset($env['KEYMANHOSTS_TIER']) && in_array($env['KEYMANHOSTS_TIER'],
      [TIER_DEVELOPMENT, TIER_STAGING,
       TIER_PRODUCTION, TIER_TEST])) {
    $tier = $env['KEYMANHOSTS_TIER'];
  } else if(file_exists(__DIR__ . '/../tier.txt')) {
    $tier = trim(file_get_contents(__DIR__ . '/../tier.txt'));
  } else {
    $tier = TIER_DEVELOPMENT;
  }

  echo "<p>TIER: " . $tier . "</p>";

  echo "<p><a href='./alive'>Alive</a></p>";
  echo "<p><a href='./ready'>Ready</a></p>";
