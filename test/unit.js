require.config({
	paths: {
		cldr: "../external/cldrjs/dist/cldr",
		"cldr-data": "../external/cldr-data",
		json: "../external/requirejs-plugins/src/json",
		src: "../src",
		text: "../external/requirejs-text/text"
	},

	// Increase the default of 7 seconds for high-latency envs like browserstack-runner.
	waitSeconds: 30
});

require([

	// core
	"./unit/core",
	"./unit/core/locale",

	// currency
	"./unit/currency/code-properties",
	"./unit/currency/name-properties",
	"./unit/currency/symbol-properties",

	"./unit/currency/name-format",

	// date
	"./unit/date/expand-pattern",
	"./unit/date/timezone-hour-format",

	"./unit/date/format-properties",
	"./unit/date/parse-properties",
	"./unit/date/tokenizer-properties",

	"./unit/date/format",
	"./unit/date/tokenizer",

	"./unit/date/parse",

	// number
	"./unit/number/pattern-properties",
	"./unit/number/format/integer-fraction-digits",
	"./unit/number/format/significant-digits",
	"./unit/number/format/grouping-separator",
	"./unit/number/format-properties",
	"./unit/number/format",
	"./unit/number/parse-properties",
	"./unit/number/parse"

], function() {
	QUnit.start();
}, function( error ) {
	QUnit.test( "requirejs load failure", function( assert ) {
		assert.ok( false, "requirejs failed to load: " + QUnit.jsDump.parse( error ) );
	});
	QUnit.start();
});
