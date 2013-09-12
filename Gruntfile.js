module.exports = function(grunt) {

	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON( "package.json" ),
		jshint: {
			dist: {
				src: [ "lib/globalize.js", "lib/cultures/*.js" ],
				options: {
					jshintrc: ".jshintrc"
				}
			},
			grunt: {
				src: [ "Gruntfile.js" ],
				options: {
					jshintrc: ".jshintrc"
				}
			},
			test: {
				src: [ "test/*.js" ],
				options: {
					jshintrc: "test/.jshintrc"
				}
			}
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
		qunit: {
			files: [ "test/*.html" ]
		},
		watch: {
			files: [ "lib/globalize.js", "lib/cultures/*.js", "test/*.js", "test/*.html" ],
			tasks: [ "jshint", "qunit" ]
		}
	});

	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );

	// Default task.
	grunt.registerTask( "default", [ "jshint", "uglify", "qunit" ] );

};

