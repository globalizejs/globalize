config.init({
	pkg: "<json:package.json>",
	lint: {
		files: [ "lib/globalize.js", "lib/cultures/*.js", "test/*.js" ]
	},
	qunit: {
		files: [ "test/*.html" ]
	},
	watch: {
		files: [ "<config:lint.files>", "test/*.html" ],
		tasks: "lint qunit"
	},
	jshint: {
		options: {
			eqnull: true
		}
	}
});

// Default task.
task.registerTask( "default", "lint qunit" );
