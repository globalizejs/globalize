require([
	"qunit",

	// core
	"./functional/core",
	"./functional/core/load",
	"./functional/core/locale",

	// currency
	"./functional/currency/currency-formatter",
	"./functional/currency/format-currency",

	// date
	"./functional/date/date-formatter",
	"./functional/date/date-parser",
	"./functional/date/format-date",
	"./functional/date/parse-date",

	// message
	"./functional/message/message-formatter",
	"./functional/message/format-message",

	// number
	"./functional/number/number-formatter",
	"./functional/number/number-parser",
	"./functional/number/format-number",
	"./functional/number/parse-number",
	"./functional/number/shape-number",

	// plural
	"./functional/plural/plural",
	"./functional/plural/plural-generator",

	// relative-time
	"./functional/relative-time/format-relative-time",
	"./functional/relative-time/relative-time-formatter"

], function() {
	QUnit.start();
}, function( error ) {
	QUnit.test( "requirejs load failure", function( assert ) {
		assert.ok( false, "requirejs failed to load: " + QUnit.jsDump.parse( error ) );
	});
	QUnit.start();
});

