require.config({
	paths: {
		cldr: "../external/cldrjs/dist/cldr",
		"cldr-data": "../external/cldr-data",
		globalize: "../dist/globalize",
		json: "../external/requirejs-plugins/src/json",
		src: "../src",
		text: "../external/requirejs-text/text"
	}
});

require([

	// core
	"./functional/core",

	// date
	"./functional/date/date-formatter",
	"./functional/date/date-parser",
	"./functional/date/format-date",
	"./functional/date/parse-date",

	// message
	"./functional/message/translate",

	// number
	"./functional/number/number-formatter",
	"./functional/number/number-parser",
	"./functional/number/format-number",
	"./functional/number/parse-number",

	// plural
	"./functional/plural/format-plural",
	"./functional/plural/plural"

], function() {
	QUnit.start();
});

