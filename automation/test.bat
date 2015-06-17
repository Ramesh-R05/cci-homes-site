@echo on

if %1=="home" call :home

echo  unknown site name: %1

:home
copy /Y test.home-cucumberrc.rb %USERPROFILE%\.cucumberrc.rb
cd .\home\
call rake
cd ..
exit  /b