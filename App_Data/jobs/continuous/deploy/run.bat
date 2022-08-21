@echo off
rem This script is a Kudu webjob. See README.md

:run
if exist \home\site\wwwroot\.MUST_DEPLOY if not exist \home\site\wwwroot\.DEPLOYING goto deploy
sleep 5 > nul
goto run

:deploy
echo Triggering deployment
echo Deploying site > \home\site\wwwroot\.DEPLOYING
del \home\site\wwwroot\.MUST_DEPLOY
cd \home\site\wwwroot
echo ------------------------------------
echo Running git pull
echo ------------------------------------
git pull
echo ------------------------------------
echo git pull exit code: %errorlevel%
echo ------------------------------------
del \home\site\wwwroot\.DEPLOYING

rem We'll exit the script (Kudu will restart it) so we get logs for subsequent runs in Kudu
rem (only first 100 lines by default go to the kudu logs). This will cause a 60 second delay,
rem which is probably not a bad thing in any case ;-)
