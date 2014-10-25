#!/bin/sh

PLATFORM=$(uname | tr '[A-Z]' '[a-z]')
ARCH=$(getconf LONG_BIT)
BASE="$(cd "$(dirname "$_")"; pwd)"
NODE_DIR="$BASE/node/$PLATFORM-x$ARCH"
NODE="$NODE_DIR/bin/node"

# options
VERSION=''
while getopts "v:" opt; do
    case "$opt" in
        v) VERSION="$OPTARG";;
    esac
done

printf '=============================================================\n'
printf 'Installing standalone node...\n'
printf '=============================================================\n'

# install node, if needed
if [ ! -e "$NODE_DIR" ]; then
    # determine latest version, if needed
    if [ -z "$VERSION" ]; then
        printf 'Determining latest version of Node.js...\n'
            VERSION=$(curl -L -s http://nodejs.org/dist/latest/ \
                | grep -E -o -s '[0-9]+\.[0-9]+\.[0-9]+' \
                | tail -n 1)
        printf 'OK\n\n'
    fi

    printf "Installing Node.js v%s to %s...\n" $VERSION $NODE_DIR
    SLUG="node-v$VERSION-$PLATFORM-x$ARCH"
    URL="http://nodejs.org/dist/v$VERSION/$SLUG.tar.gz"

    mkdir -p "$NODE_DIR"
    curl -L "$URL" | tar fxz - --strip-components=1 -C "$NODE_DIR"
else
    printf "Standalone node already installed, not installing\n" 
fi

chmod 770 "$NODE"

printf 'OK\n\n'

printf '=============================================================\n'
printf 'Installing global dependencies...\n'
printf '=============================================================\n'

"$NODE_DIR/bin/npm" install --global bower
"$NODE_DIR/bin/npm" install --global grunt-cli

printf 'DONE\n'