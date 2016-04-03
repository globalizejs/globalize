define([
	"cldr",
	"src/date/expand-pattern",
	"json!cldr-data/main/de/ca-gregorian.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/ru/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, expandPattern, deCaGregorian, enCaGregorian, ruCaGregorian, likelySubtags ) {

var de, en, ru;

Cldr.load( deCaGregorian, enCaGregorian, ruCaGregorian, likelySubtags );

de = new Cldr( "de" );
en = new Cldr( "en" );
ru = new Cldr( "ru" );

/**
 * Test actual patterns here
 * @see https://ssl.icu-project.org/icu4jweb/flexTest.jsp
 */

QUnit.module( "Date Expand Pattern" );


QUnit.test( "should expand {skeleton: \"<skeleton>\"}", function( assert ) {
	var cldrs = {
		en: en,
		de: de,
		ru: ru
	};
	var cases = {
		en: {
			"GyMMMEd": "E, MMM d, y G",
			"GyMMMEdhms": "E, MMM d, y G, h:mm:ss a",
			"MMMMEdhm": "E, MMMM d 'at' h:mm a",
			"hhmm": "hh:mm a",
			"HHmm": "HH:mm",
			"EHmss": "E HH:mm:ss",
			"MMMMh": "LLLL, h a"
		},
		de: {
			"yMMMMd": "d. MMMM y",
			"MMMMd": "d. MMMM",
			"MMMM": "LLLL",
			"MMMMy": "MMMM y",
			"EEEE": "cccc",
			"cccc": "cccc",
			"EEEEMMMMd": "EEEE, d. MMMM",
			"ccccMMMMd": "EEEE, d. MMMM",
			"HHmm": "HH:mm",
			"EEEEHHmm": "EEEE, HH:mm",
			"EEEEHmm": "EEEE, HH:mm",
			"ccccHmm": "EEEE, HH:mm",
			"MMMMEdhm": "E, d. MMMM 'um' h:mm a"
		},
		ru: {
			"yMMMMd": "d MMMM y 'г'.",
			"MMMMd": "d MMMM",
			"MMMM": "LLLL",
			"MMMMy": "LLLL y 'г'.",
			"EEEE": "cccc",
			"cccc": "cccc",
			"EEEEMMMMd": "cccc, d MMMM",
			"ccccMMMMd": "cccc, d MMMM",
			"HHmm": "HH:mm",
			"EEEEHHmm": "EEEE HH:mm",
			"EEEEHmm": "EEEE HH:mm",
			"ccccHHmm": "EEEE HH:mm",
			"ccccHmm": "EEEE HH:mm",
			"MMMMEdhm": "ccc, d MMMM, h:mm a"
		}
	};
	Object.keys( cases ).forEach( function( locale ) {
		Object.keys( cases[locale] ).forEach( function( skeleton ) {
			var expected = cases[locale][skeleton];
			assert.equal( expandPattern( {skeleton: skeleton}, cldrs[locale] ), expected, locale + ", " + skeleton );
		} );
	} );
});

QUnit.test( "should expand {date: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { date: "full" }, en ), "EEEE, MMMM d, y" );
});

QUnit.test( "should expand {time: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { time: "full" }, en ), "h:mm:ss a zzzz" );
});

QUnit.test( "should expand {datetime: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { datetime: "full" }, en ), "EEEE, MMMM d, y 'at' h:mm:ss a zzzz" );
});

QUnit.test( "should expand {raw: \"<pattern>\"}", function( assert ) {
	assert.equal( expandPattern( { raw: "MMM d" }, en ), "MMM d" );
});

});
