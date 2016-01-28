require([
	"qunit",

	// core
	"./unit/core",
	"./unit/core/locale",

	// currency
	"./unit/currency/code-properties",
	"./unit/currency/name-properties",
	"./unit/currency/symbol-properties",

	"./unit/currency/name-format",

	// Gdate
	"./unit/gdate/astronomy",
	"./unit/gdate/Gregorian-date",
	"./unit/gdate/Hebrew-date",
	"./unit/gdate/Islamic-date",
	"./unit/gdate/Chinese-date",

	// date
	"./unit/date/expand-pattern",
	"./unit/date/timezone-hour-format",

	"./unit/date/format-properties",
	"./unit/date/parse-properties",
	"./unit/date/tokenizer-properties",

	"./unit/date/format",
	"./unit/date/format-hebrew",
	"./unit/date/format-chinese",

	"./unit/date/tokenizer",
	"./unit/date/tokenizer-hebrew",
	"./unit/date/parse",
	"./unit/date/parse-hebrew",

	// number
	"./unit/number/pattern-properties",
	"./unit/number/format/integer-fraction-digits",
	"./unit/number/format/significant-digits",
	"./unit/number/format/grouping-separator",
	"./unit/number/format-properties",
	"./unit/number/format",
	"./unit/number/parse-properties",
	"./unit/number/parse",

	// relative time
	"./unit/relative-time/properties",
	"./unit/relative-time/format",

	/* unit */
	"./unit/unit/get",
	"./unit/unit/format"

], function() {
	QUnit.start();
}, function( error ) {
	QUnit.test( "requirejs load failure", function( assert ) {
		assert.ok( false, "requirejs failed to load: " + QUnit.jsDump.parse( error ) );
	});
	QUnit.start();
});
