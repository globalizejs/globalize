require.config({
	paths: {
		cldr: "../external/cldrjs/dist/cldr",
		"cldr-data": "../external/cldr-data",
		CLDRPluralRuleParser: "../external/CLDRPluralRuleParser/src/CLDRPluralRuleParser",
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
	"./unit/date/format-properties",
	"./unit/date/format",
	"./unit/date/tokenizer-properties",
	"./unit/date/tokenizer",
	"./unit/date/parse-properties",
	"./unit/date/parse",

	// message
	"./unit/message/translate",

	// number
	"./unit/number/pattern-properties",
	"./unit/number/format/integer-fraction-digits",
	"./unit/number/format/significant-digits",
	"./unit/number/format/grouping-separator",
	"./unit/number/format-properties",
	"./unit/number/format",
	"./unit/number/parse-properties",
	"./unit/number/parse",

	/* plural */
	"./unit/plural/form"

], function() {
	QUnit.start();
});
