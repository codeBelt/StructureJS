#!/usr/bin/env sh

BASE="$HOME"
NODE_DIR="$BASE/.node"

export N_PREFIX=$HOME/.node
export PATH=$N_PREFIX/bin:$PATH

printf '=============================================================\n'
printf 'Installing node...\n'
printf '=============================================================\n'

    mkdir -p $N_PREFIX/bin
    curl -o $N_PREFIX/bin/n https://raw.githubusercontent.com/visionmedia/n/master/bin/n
    chmod +x $N_PREFIX/bin/n
    n stable

printf '=============================================================\n'
printf 'Installing global dependencies...\n'
printf '=============================================================\n'

    npm install --global bower
    npm install --global grunt-cli
    printf 'OK\n\n'

printf '=============================================================\n'
printf 'You are not done yet!\n'
printf '\n'
printf '1. Look for a hidden file in your home directory called .profile or\n'
printf '   .bash_profile.\n'
printf '2. Open the .profile or .bash_profile file in an editor. Append the\n'
printf '   following lines to the bottom:\n'
printf '   export N_PREFIX=$HOME/.node\n'
printf '   export PATH=$N_PREFIX/bin:$PATH\n'
printf '3. Open a new terminal window (if you are already logged into a terminal\n'
printf '   window, log out/close the session)\n'
printf '4. Ensure node is working correctly by entering the following:\n'
printf '   node --version\n'
printf '=============================================================\n\n'

printf 'DONE\n'