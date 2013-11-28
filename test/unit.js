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

	/* datetime */
	"./unit/datetime/expand_pattern",
	"./unit/datetime/format",
	"./unit/datetime/tokenizer",
	"./unit/datetime/parse"

], function() {
	QUnit.start();
});

