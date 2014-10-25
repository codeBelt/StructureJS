#!/bin/sh

PLATFORM=$(uname | tr '[A-Z]' '[a-z]')
ARCH=$(getconf LONG_BIT)
BASE="$(cd "$(dirname "$_")"; pwd)"
NODE_DIR="$BASE/node/$PLATFORM-x$ARCH"
MODULES="$BASE/../node_modules"

printf '=============================================================\n'
printf 'Uninstalling standalone node...\n'
printf '=============================================================\n'
    
    rm -rf "$NODE_DIR" 
	printf 'OK\n\n'

printf '=============================================================\n'
printf 'Uninstalling modules...\n'
printf '=============================================================\n'
    
    rm -rf "$MODULES"
	printf 'OK\n\n'

printf 'DONE\n'