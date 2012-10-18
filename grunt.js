module.exports = function( grunt ) {

grunt.initConfig({
	pkg: "<json:package.json>",
	meta: {
		banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - " +
				"<%= grunt.template.today('isoDate') %>\n" +
				"<%= pkg.homepage ? '* ' + pkg.homepage + '\n' : '' %>" +
				"* Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
				" Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */"
	},
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
	},
	min: {
		"dist/globalize.min.js": [ "<banner:meta.banner>", "lib/globalize.js" ]
	}
});

// Default task.
grunt.registerTask( "default", "lint qunit" );

}

