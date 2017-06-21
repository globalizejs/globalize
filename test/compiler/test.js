var globalizeCompiler = require( "globalize-compiler" );
var fs = require( "fs" );
var path = require( "path" );
var childProcess = require( "child_process" );
var assert = require( "assert" );
var glob = require( "glob" );

describe( "compiled", function() {
	if ( !fs.existsSync( path.join( __dirname, "_compiled" ) ) ) {
		fs.mkdirSync( path.join( __dirname, "_compiled" ) );
	}
	var files = glob.sync( "cases/*.js", {
		cwd: __dirname
	} );
	files.forEach( function(file) {
		var name = path.basename( file, ".js" );
		describe( name, function() {
			it( "should return identical data", function( done ) {
				var test = require( "./" + file );
				var expectedOutput = "";
				var formatters = [];
				var testCases = test.cases( test.dependencies() );
				testCases.forEach( function( testCase ) {
					formatters.push( testCase.formatter );
					expectedOutput += testCase.formatter.apply( null, testCase.args ) + "\n";
				});
				var out = globalizeCompiler.compile( formatters, {
					template: function( data ) {
						var deps = "var Globalize = " +
							data.dependencies.map( function( dependency ) {
								return "require( \"../../../dist/" + dependency + "\" )";
							} ).join( ";\n" );
						return [
							deps,
							"",
							data.code,
							"",
							"module.exports = Globalize;"
						].join( "\n" );
					}
				} );
				fs.writeFileSync( path.join( __dirname, "_compiled/" + name + ".compiled.js" ), out );
				fs.writeFileSync( path.join( __dirname, "_compiled/" + name + ".test.js" ), [
					"var test = require( \"../" + file + "\" );",
					"var Globalize = require( \"../_compiled/" + name + ".compiled.js\" );",
					"testCases = test.cases( Globalize );",
					"testCases.forEach( function( testCase ) {",
						"console.log( testCase.formatter.apply( null, testCase.args ) );",
					"});"
				].join("\n") );
				var childOutput = "";
				var child = childProcess.fork(
					path.join( __dirname, "_compiled/" + name + ".test.js" ),
					{ silent: true }
				);
				child.on( "error", function( err ) {
					done( err );
				} );
				child.on( "exit", function( exit ) {
					if ( exit !== 0 ) {
						done( new Error( "exited with non-zero" ) );
					}
				} );
				child.stdout.on( "data", function( chunk ) {
					childOutput += chunk.toString();
				} );
				child.stdout.on( "end", function() {
					assert.equal( childOutput, expectedOutput );
					done();
				} );
			} );
		} );
	} );
} );
