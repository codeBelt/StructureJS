@echo off

set BASE=%~dp0
set NODE_DIR=%BASE%node\temp\
set BIT_64=
set BIT_32=32
If Defined ProgramFiles(x86) (
    set BIT=%BIT_64%
) Else (
    set BIT=%BIT_32%
)

REM TODO: Scrape node website for latest version number
set NODE_VERSION=0.10.26
set NODE=%NODE_DIR%node%BIT%.msi

echo =============================================================
echo Installing node...
echo =============================================================

if "%BIT%" == "%BIT_32%" (
    set URL=http://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x86.msi
) else (
    set URL=http://nodejs.org/dist/v%NODE_VERSION%/x64/node-v%NODE_VERSION%-x64.msi
)

echo Downloading node v%NODE_VERSION% from %URL%
if not exist "%NODE_DIR%" (
    md "%NODE_DIR%"
)
cscript //Nologo "%BASE%utils\curl.vbs" "%URL%" "%NODE%"
msiexec.exe /i "%NODE%"

echo OK

echo =============================================================
echo Installing global dependencies...
echo =============================================================

SET PATH=%PATH%;%AppData%\npm;%ProgramFiles%\nodejs\

call npm install --global bower
call npm install --global grunt-cli

echo DONE