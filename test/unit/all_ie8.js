define([
	"qunit",

	// shim
	"external/es5-shim/es5-shim",

	// core
	"test/unit/core",
	"test/unit/core/locale",

	// currency
	"test/unit/currency/code-properties",
	"test/unit/currency/name-properties",
	"test/unit/currency/symbol-properties",

	"test/unit/currency/name-format",

	// date
	"test/unit/date/expand-pattern",
	"test/unit/date/timezone-hour-format",

	"test/unit/date/format-properties",
	"test/unit/date/parse-properties",
	"test/unit/date/tokenizer-properties",

	"test/unit/date/format",
	"test/unit/date/tokenizer",

	"test/unit/date/parse",

	// number
	"test/unit/number/pattern-properties",
	"test/unit/number/format/integer-fraction-digits",
	"test/unit/number/format/significant-digits",
	"test/unit/number/format/grouping-separator",
	"test/unit/number/format-properties",
	"test/unit/number/format",
	"test/unit/number/parse-properties",
	"test/unit/number/parse",

	// relative time
	"test/unit/relative-time/properties",
	"test/unit/relative-time/format"

], function() {
	QUnit.start();
}, function( error ) {
	QUnit.test( "requirejs load failure", function( assert ) {
		assert.ok( false, "requirejs failed to load: " + QUnit.jsDump.parse( error ) );
	});
	QUnit.start();
});
