require.config({
	paths: {
		cldr: "../external/cldr/dist/cldr.runtime",
		dist: "../dist",
		fixtures: "./fixtures",
		json: "../external/requirejs-plugins/src/json",
		src: "../src",
		text: "../external/requirejs-text/text"
	}
});

require([

	/* date */
	"./functional/date/format",
	"./functional/date/parse"

], function() {
	QUnit.start();
});

