module.exports = function(grunt) {
	grunt.initConfig({
		pkg: "<json:package.json>",
		lint: {
			all: [ "lib/globalize.js", "lib/cultures/*.js", "test/*.js" ]
		},
		qunit: {
			all: [ "test/*.html" ]
		},
		watch: {
			scripts: {
				files: [ "<config:lint.files>", "test/*.html" ]
			},
			tasks: "lint qunit"
		},
		jshint: {
			options: {
				eqnull: true
			}
		}
	});

	// Default task.
	grunt.registerTask( "default", "lint qunit" );
};
