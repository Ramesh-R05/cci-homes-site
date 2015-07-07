@echo on

if %1=="homes" call :homes

echo  unknown site name: %1

:homes
copy /Y test.homes-cucumberrc.rb %USERPROFILE%\.cucumberrc.rb
cd .\homes\
call rake
cd ..
exit  /b