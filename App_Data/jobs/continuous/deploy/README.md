# Continuous job for deployment of s.keyman.com

This script is a Kudu webjob. See https://github.com/projectkudu/kudu/wiki/WebJobs for details

The script watches for .MUST_DEPLOY to be created. If it is present, then
creates .DEPLOYING, deletes .MUST_DEPLOY, and starts a `git pull`. When it is
finished, it deletes .DEPLOYING, and exits the script. Kudu will restart the
script within one minute of it exiting.

.MUST_DEPLOY is created by /api/deploy.php when it is called with a valid key. The
key is configured as an environment variable in Azure. The deployment webhook is
triggered by GitHub when commits are pushed to master.

Logs are visible in Kudu interface. If the deploy is already running, this will
trigger another deploy a few seconds after the current deploy finishes.

This replaces the standard Kudu deployment because it is too slow for our needs. The typical
`git pull` completes within 30 seconds, whereas the Kudu zip deployment method was taking
over an hour, and often failing with timeouts.

See https://github.com/projectkudu/kudu/issues/3042 for discussions on this.

Modelled off https://github.com/keymanapp/api.keyman.com/tree/master/App_Data/jobs/continuous/database_build/README.md