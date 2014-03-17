require.config({
	paths: {
		cldr: "../external/cldr.js/dist/cldr",
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
	"./unit/date/parse",

	/* number */
	"./unit/number/format/integer-fraction-digits",
	"./unit/number/format"

], function() {
	QUnit.start();
});
