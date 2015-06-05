define([
	"intern!qunit",

	// core
	"test/functional/core",
	"test/functional/core/load",
	"test/functional/core/locale",

	// currency
	"test/functional/currency/currency-formatter",
	"test/functional/currency/format-currency",

	// date
	"test/functional/date/date-formatter",
	"test/functional/date/date-parser",
	"test/functional/date/format-date",
	"test/functional/date/parse-date",

	// message
	"test/functional/message/message-formatter",
	"test/functional/message/format-message",

	// number
	"test/functional/number/number-formatter",
	"test/functional/number/number-parser",
	"test/functional/number/format-number",
	"test/functional/number/parse-number",

	// plural
	"test/functional/plural/plural",

	// relative-time
	"test/functional/relative-time/format-relative-time",
	"test/functional/relative-time/relative-time-formatter"
], function ( QUnit ) {
	QUnit.start();
}, function ( QUnit, error ) {
	QUnit.test( "requirejs load failure", function( assert ) {
		assert.ok( false, "requirejs failed to load: " + QUnit.jsDump.parse( error ) );
	});
	QUnit.start();
});

