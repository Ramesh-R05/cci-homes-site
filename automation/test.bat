@echo on

if %1=="mm" call :mm

echo  unknown site name: %1

:mm
copy /Y test.mm-cucumberrc.rb %USERPROFILE%\.cucumberrc.rb
cd .\mm\
call rake
cd ..
exit  /b