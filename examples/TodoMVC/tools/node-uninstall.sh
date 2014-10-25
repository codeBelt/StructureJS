#!/bin/sh

BASE="$HOME"
NODE_DIR="$BASE/.node"
MODULES="$BASE/../node_modules"

printf '=============================================================\n'
printf 'Uninstalling local node...\n'
printf '=============================================================\n'
    
    rm -rf "$NODE_DIR" 
	printf 'OK\n\n'

printf '=============================================================\n'
printf 'Uninstalling modules...\n'
printf '=============================================================\n'
    
    rm -rf "$MODULES"
	printf 'OK\n\n'

printf 'DONE\n'