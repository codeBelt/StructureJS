@echo off

set BASE=%~dp0
set NODE_DIR=%BASE%node\windows
set MODULES=%BASE%..\node_modules\

echo =============================================================
echo Uninstalling standalone node...
echo =============================================================

    if exist "%NODE_DIR%" (
        rmdir /s /q "%NODE_DIR%"
    )
    echo OK
    
echo =============================================================
echo Uninstalling modules...
echo =============================================================
    
    if exist "%MODULES%" (
        rmdir /s /q "%MODULES%"
    )
    echo OK

echo DONE