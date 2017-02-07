# CLIENT.Project

## Build Files
Builds the project either in the develop or production mode depending on what is set for ```BUILD_MODE``` in **build-env.js** file.

    $ gulp

    // Override the BUILD_MODE with one of the following flag
    $ gulp --dev
    $ gulp --prod

By default the ```BUILD_MODE``` in **build-env.js** file production mode. Don't forget to change this so you not always building in production mode.

## Watch Files

    $ gulp watch

	// Automatically open project in the browser:
    $ gulp watch --open

	// All at once:
    $ gulp && gulp watch --open


## Other Tasks

    // Build YUIDocs:
    $ gulp docs

    // Check for linting issues:
    $ gulp lint

    // Helper task for "gulp && gulp watch"
    $ gulp launch
    $ gulp launch --open

## Install
After code is committed to source control and pulled down to another computer you will need to do the following:

    $ cp build-env.js.dist build-env.js
    $ npm install
