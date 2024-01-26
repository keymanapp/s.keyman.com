<?php
  header("Content-Type: text/plain");

  // Test web server ready
  if (!file_exists(__DIR__ . '/../metadata/kmwversions.json')) {
    die('/metadata/kmwversions.json not ready');
  }

  echo "ready\n";
