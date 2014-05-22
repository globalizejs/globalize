require.config({
	paths: {
		cldr: "../external/cldrjs/dist/cldr",
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
	"./functional/number/format",
	"./functional/number/parse"

], function() {
	QUnit.start();
});

