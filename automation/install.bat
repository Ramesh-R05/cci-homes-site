@echo off

echo.
echo ------------------------------------------------------------
echo  install:  downloading and installing chocolately
echo ------------------------------------------------------------
echo.
@powershell -NoProfile -ExecutionPolicy unrestricted -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin

echo.
echo ------------------------------------------------------------
echo  install:  downloading and installing ruby choc
echo ------------------------------------------------------------
echo.
call choco install ruby1.9

echo.
echo ------------------------------------------------------------
echo  install:  manually add ruby to path so devkit can install
echo ------------------------------------------------------------
echo.
SET PATH=%PATH%;c:\tools\ruby193\bin

echo.
echo ------------------------------------------------------------
echo  install:  downloading and installing other chocs
echo ------------------------------------------------------------
echo.
call choco install ruby.devkit chromedriver2 ansicon
call choco install phantomjs -version 1.9.2

echo.
echo ------------------------------------------------------------
echo  install:  enhancing rubies with devkit
echo ------------------------------------------------------------
echo.
cd c:\tools\devkit
call ruby dk.rb init
call ruby dk.rb install
cd c:\git\womens-network\automation 

echo.
echo ------------------------------------------------------------
echo  install:  downloading and installing gem bundler
echo ------------------------------------------------------------
echo.
call gem install bundler --source http://rubygems.org

echo.
echo ------------------------------------------------------------
echo  install:  set gem system to 2.3.0 so native ext work on win
echo ------------------------------------------------------------
echo.
@echo on
call gem update --system 2.3.0
@echo off

echo.
echo ------------------------------------------------------------
echo  install:  install gems
echo ------------------------------------------------------------
echo.
call bundle install

echo.
echo ------------------------------------------------------------
echo  install:  setup done
echo ------------------------------------------------------------
echo.
echo  restart command prompt.
echo.
echo  edit project web.config to use a test solr. see qa guys.
echo.
echo  use `test mm` to run tests.
echo.
