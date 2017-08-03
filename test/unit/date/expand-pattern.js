define([
	"cldr",
	"src/date/expand-pattern",
	"json!cldr-data/main/de/ca-gregorian.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/ru/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, expandPattern, deCaGregorian, enCaGregorian, ruCaGregorian, likelySubtags,
	timeData ) {

var de, en, ru;

Cldr.load( deCaGregorian, enCaGregorian, ruCaGregorian, likelySubtags, timeData );

de = new Cldr( "de" );
en = new Cldr( "en" );
ru = new Cldr( "ru" );

QUnit.assert.expandPattern = function( cldr, style, expected ) {
	this.equal( expandPattern( style, cldr ), expected );
};

/**
 * Test actual patterns here
 * @see https://ssl.icu-project.org/icu4jweb/flexTest.jsp
 */

QUnit.module( "Date Expand Pattern" );

QUnit.test( "should expand {skeleton: \"<skeleton>\"}", function( assert ) {

	// Direct map.
	assert.expandPattern( en, { skeleton: "GyMMMEd" }, "E, MMM d, y G" );
	assert.expandPattern( de, { skeleton: "MMMMd" }, "d. MMMM" );
	assert.expandPattern( ru, { skeleton: "MMMMd" }, "d MMMM" );

	// Preferred hour (j).
	assert.expandPattern( en, { skeleton: "jmm" }, "h:mm a" );
	assert.expandPattern( de, { skeleton: "jmm" }, "HH:mm" );
	assert.expandPattern( ru, { skeleton: "jmm" }, "H:mm" );

	// Best matches the whole skeleton.
	assert.expandPattern( en, { skeleton: "hhmm" }, "hh:mm a" );
	assert.expandPattern( en, { skeleton: "HHmm" }, "HH:mm" );
	assert.expandPattern( en, { skeleton: "EHmss" }, "E HH:mm:ss" );
	assert.expandPattern( en, { skeleton: "hhmmssSS" }, "hh:mm:ss.SS a" );
	assert.expandPattern( en, { skeleton: "yy" }, "yy" );
	assert.expandPattern( de, { skeleton: "yMMMMd" }, "d. MMMM y" );
	assert.expandPattern( de, { skeleton: "MMMM" }, "LLLL" );
	assert.expandPattern( de, { skeleton: "yMMMM" }, "MMMM y" );
	assert.expandPattern( de, { skeleton: "EEEE" }, "cccc" );
	assert.expandPattern( de, { skeleton: "cccc" }, "cccc" );
	assert.expandPattern( de, { skeleton: "MMMMEEEEd" }, "EEEE, d. MMMM" );
	assert.expandPattern( de, { skeleton: "MMMMccccd" }, "EEEE, d. MMMM" );
	assert.expandPattern( de, { skeleton: "HHmm" }, "HH:mm" );
	assert.expandPattern( de, { skeleton: "HHmmssSS" }, "HH:mm:ss,SS" );
	assert.expandPattern( de, { skeleton: "EEEEHHmm" }, "EEEE, HH:mm" );
	assert.expandPattern( de, { skeleton: "EEEEHmm" }, "EEEE, HH:mm" );
	assert.expandPattern( de, { skeleton: "ccccHmm" }, "EEEE, HH:mm" );
	assert.expandPattern( ru, { skeleton: "yMMMMd" }, "d MMMM y 'г'." );
	assert.expandPattern( ru, { skeleton: "MMMM" }, "LLLL" );
	assert.expandPattern( ru, { skeleton: "yMMMM" }, "LLLL y 'г'." );
	assert.expandPattern( ru, { skeleton: "EEEE" }, "cccc" );
	assert.expandPattern( ru, { skeleton: "cccc" }, "cccc" );
	assert.expandPattern( ru, { skeleton: "MMMMEEEEd" }, "cccc, d MMMM" );
	assert.expandPattern( ru, { skeleton: "MMMMccccd" }, "cccc, d MMMM" );
	assert.expandPattern( ru, { skeleton: "HHmm" }, "HH:mm" );
	assert.expandPattern( ru, { skeleton: "EEEEHHmm" }, "EEEE HH:mm" );
	assert.expandPattern( ru, { skeleton: "EEEEHmm" }, "EEEE HH:mm" );
	assert.expandPattern( ru, { skeleton: "ccccHHmm" }, "EEEE HH:mm" );
	assert.expandPattern( ru, { skeleton: "ccccHmm" }, "EEEE HH:mm" );

	// Best matches the date and time parts individually then combine them together.
	assert.expandPattern( en, { skeleton: "GyMMMEdhms" }, "E, MMM d, y G, h:mm:ss a" );
	assert.expandPattern( en, { skeleton: "MMMMEdhm" }, "E, MMMM d 'at' h:mm a" );
	assert.expandPattern( en, { skeleton: "MMMMh" }, "LLLL 'at' h a" );
	assert.expandPattern( de, { skeleton: "MMMMEdhm" }, "E, d. MMMM 'um' h:mm a" );
	assert.expandPattern( ru, { skeleton: "MMMMEdhm" }, "ccc, d MMMM, h:mm a" );
});

QUnit.test( "should throw exception on invalid skeletons", function( assert ) {
	// Invalid characters.
	assert.throws(function() {
		expandPattern({ skeleton: "MMM d" }, en );
	});
	assert.throws(function() {
		expandPattern({ skeleton: "MM/dd" }, en );
	});

	// Invalid order.
	assert.throws(function() {
		expandPattern({ skeleton: "dM" }, en );
	});
	assert.throws(function() {
		expandPattern({ skeleton: "My" }, en );
		expandPattern({ skeleton: "MMMy" }, en );
	});
});

QUnit.test( "should expand {date: \"(full, ...)\"}", function( assert ) {
	assert.expandPattern( en, { date: "full" }, "EEEE, MMMM d, y" );
});

QUnit.test( "should expand {time: \"(full, ...)\"}", function( assert ) {
	assert.expandPattern( en, { time: "full" }, "h:mm:ss a zzzz" );
});

QUnit.test( "should expand {datetime: \"(full, ...)\"}", function( assert ) {
	assert.expandPattern( en, { datetime: "full" }, "EEEE, MMMM d, y 'at' h:mm:ss a zzzz" );
});

QUnit.test( "should expand {raw: \"<pattern>\"}", function( assert ) {
	assert.expandPattern( en, { raw: "MMM d" }, "MMM d" );
});

});
