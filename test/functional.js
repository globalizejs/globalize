require.config({
	paths: {
		cldr: "../external/cldr.js/dist/cldr",
		fixtures: "./fixtures",
		globalize: "../dist/globalize",
		json: "../external/requirejs-plugins/src/json",
		src: "../src",
		text: "../external/requirejs-text/text"
	}
});

require([

	/* date */
	"./functional/date/format",
	"./functional/date/parse",

	/* number */
	"./functional/number/format"

], function() {
	QUnit.start();
});

