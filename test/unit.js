require.config({
	paths: {
		cldr: "../external/cldr/dist/cldr.runtime",
		fixtures: "./fixtures",
		globalize: "../src",
		json: "../external/requirejs-plugins/src/json",
		text: "../external/requirejs-text/text"
	}
});

require([

	/* date */
	"./unit/date/expand-pattern",
	"./unit/date/format",
	"./unit/date/tokenizer",
	"./unit/date/parse"

], function() {
	QUnit.start();
});

