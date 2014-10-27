@echo off

set BASE=%~dp0
set NODE_DIR=%BASE%node\windows\
set BIT_64=
set BIT_32=32
If Defined ProgramFiles(x86) (
    set BIT=%BIT_64%
) Else (
    set BIT=%BIT_32%
)

REM TODO: Scrape node website for latest version number
set NODE_VERSION=latest
set NPM_VERSION=1.3.15
set NODE="%NODE_DIR%node%BIT%.exe"

echo =============================================================
echo Installing standalone node...
echo =============================================================

if exist "%NODE_DIR%node%BIT_32%.exe" (
    goto installed
) else (
    goto not_installed
)

:not_installed

md "%NODE_DIR%"

echo Downloading 32-bit node v%NODE_VERSION%
cscript //Nologo "%BASE%utils\curl.vbs" "http://nodejs.org/dist/%NODE_VERSION%/node.exe" "%NODE_DIR%node%BIT_32%.exe"

echo Downloading 64-bit node v%NODE_VERSION%
cscript //Nologo "%BASE%utils\curl.vbs" "http://nodejs.org/dist/%NODE_VERSION%/x64/node.exe" "%NODE_DIR%node%BIT_64%.exe"

echo Downloading npm v%NPM_VERSION%
cscript //Nologo "%BASE%utils\curl.vbs" "http://nodejs.org/dist/npm/npm-%NPM_VERSION%.zip" "%NODE_DIR%npm.zip"

echo Unzipping npm
cscript //Nologo "%BASE%utils\unzip.vbs" "%NODE_DIR%npm.zip" "%NODE_DIR%"

goto continue

:installed

echo Standalone node already installed, not installing
goto continue

:continue

echo OK

echo =============================================================
echo Installing global dependencies...
echo =============================================================

call "%NODE_DIR%npm" install --global bower
call "%NODE_DIR%npm" install --global grunt-cli

echo DONE