module.exports = function(grunt) {

	"use strict";

	var mountFolder = function ( connect, path ) {
		return connect.static( require( "path" ).resolve( path ) );
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		connect: {
			options: {
				port: 9001,
				hostname: "localhost"
			},
			test: {
				options: {
					middleware: function ( connect ) {
						return [
							mountFolder( connect, "." ),
							mountFolder( connect, "test" )
						];
					}
				}
			}
		},
		jshint: {
			source: {
				src: [ "src/**/*.js" ],
				options: {
					jshintrc: "src/.jshintrc"
				}
			},
			grunt: {
				src: [ "Gruntfile.js" ],
				options: {
					jshintrc: ".jshintrc"
				}
			},
			src: [
				"lib/globalize.js",
				"lib/cultures/*.js",
				"Gruntfile.js",
				"test/*.js"
			]
		},
		uglify: {
			dist: {
				options: {
					beautify: {
						ascii_only: true
					},
					banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
						"<%= grunt.template.today('isoDate') %>\n" +
						"<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
						"* Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
						" Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n"
				},
				expand: true,
				cwd: "lib",
				src: [ "**/*.js" ],
				dest: "dist/",
				rename: function( destBase, destPath ) {
					return destBase + destPath.replace( /\.js$/, ".min.js" );
				}
			}
		},
		mocha: {
			all: {
				options: {
					urls: [ "http://localhost:<%= connect.options.port %>/index.html" ]
				}
			}
		},
		watch: {
			files: [ "src/*.js", "test/spec/*.js", "test/*.html" ],
			tasks: [ "jshint", "test" ]
		},
		clean: {
			dist: [
				"dist"
			]
		}
	});

	require( "matchdep" ).filterDev( "grunt-*" ).forEach( grunt.loadNpmTasks );

	grunt.registerTask( "test", [
		"connect:test",
		"mocha"
	]);

	// Default task.
	grunt.registerTask( "default", [ "jshint", "clean", "uglify", "qunit" ] );

};
