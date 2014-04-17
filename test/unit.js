require.config({
	paths: {
		cldr: "../external/cldrjs/dist/cldr",
		CLDRPluralRuleParser: "../external/CLDRPluralRuleParser/src/CLDRPluralRuleParser",
		fixtures: "./fixtures",
		json: "../external/requirejs-plugins/src/json",
		src: "../src",
		text: "../external/requirejs-text/text"
	}
});

require([

	// core
	"./unit/core/locale",

	// date
	"./unit/date/expand-pattern",
	"./unit/date/format",
	"./unit/date/tokenizer",
	"./unit/date/parse",

	// message
	"./unit/message/translate",

	// number
	"./unit/number/format/integer-fraction-digits",
	"./unit/number/format/significant-digits",
	"./unit/number/format/grouping-separator",
	"./unit/number/format",
	"./unit/number/parse",

	/* plural */
	"./unit/plural/form"

], function() {
	QUnit.start();
});
