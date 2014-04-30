require.config({
	paths: {
		cldr: "../external/cldrjs/dist/cldr",
		fixtures: "./fixtures",
		globalize: "../src",
		json: "../external/requirejs-plugins/src/json",
		text: "../external/requirejs-text/text"
	}
});

require([

	/* core */
	"./unit/core/locale",

	/* date */
	"./unit/date/expand-pattern",
	"./unit/date/format",
	"./unit/date/tokenizer",
	"./unit/date/parse",

	/* number */
	"./unit/number/format/integer-fraction-digits",
	"./unit/number/format/significant-digits",
	"./unit/number/format/grouping-separator",
	"./unit/number/format"

], function() {
	QUnit.start();
});
