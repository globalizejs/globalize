require.config({
	paths: {
		cldr: "../external/cldrjs/dist/cldr",
		"cldr-data": "../external/cldr-data",
		globalize: "../dist/globalize",
		json: "../external/requirejs-plugins/src/json",
		src: "../src",
		text: "../external/requirejs-text/text"
	},

	// Increase the default of 7 seconds for high-latency envs like browserstack-runner.
	waitSeconds: 30
});

require([

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

	// plural
	"./functional/plural/plural"

], function() {
	QUnit.start();
}, function( error ) {
	QUnit.test( "requirejs load failure", function( assert ) {
		assert.ok( false, "requirejs failed to load: " + QUnit.jsDump.parse( error ) );
	});
	QUnit.start();
});

