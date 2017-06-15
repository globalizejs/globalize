var fs = require( "fs" );
var packageJson = require( "../../package.json" );
var path = require( "path" );

// Note argv[0] is supposed to be `node`, argv[1] to be this file.
packageJson.version = process.argv[ 2 ];

fs.writeFileSync(
	path.join( __dirname, "../../package.json" ),
	JSON.stringify( packageJson, null, 2 ) + "\n"
);
