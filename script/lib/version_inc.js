var packageJson = require( "../../package.json" );
var semver = require( "semver" );

// Note argv[0] is supposed to be `node`, argv[1] to be this file.
var next = process.argv[ 2 ];
var prereleaseIdentifier = process.argv[ 3 ];
console.log( semver.inc( packageJson.version, next, prereleaseIdentifier ) );
