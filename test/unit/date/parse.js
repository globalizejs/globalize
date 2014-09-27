define([
	"cldr",
	"src/date/parse",
	"src/date/parse-properties",
	"src/date/start-of",
	"src/date/tokenizer",
	"src/date/tokenizer-properties",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json",
	"cldr/supplemental"
], function( Cldr, parse, parseProperties, startOf, tokenizer, tokenizerProperties, enCaGregorian,
	likelySubtags, timeData, weekData ) {

var cldr, date1, date2;

function assertParse( assert, stringDate, pattern, cldr, date ) {
	var tokens = tokenizer( stringDate, tokenizerProperties( pattern, cldr ) );
	assert.deepEqual( parse( stringDate, tokens, parseProperties( cldr ) ), date );
}

Cldr.load( enCaGregorian );
Cldr.load( likelySubtags );
Cldr.load( timeData );
Cldr.load( weekData );

cldr = new Cldr( "en" );

QUnit.module( "Date Parse" );

/**
 *  Era
 */

QUnit.test( "should parse era (G|GG|GGG)", function( assert ) {
	date1 = new Date( 0, 0 );
	date2 = new Date( 0, 0 );
	date1.setFullYear( 4 );
	date2.setFullYear( -4 );
	assertParse( assert, "AD 4", "G y", cldr, date1 );
	assertParse( assert, "BC 5", "G y", cldr, date2 );
	assertParse( assert, "AD 4", "GG y", cldr, date1 );
	assertParse( assert, "BC 5", "GG y", cldr, date2 );
	assertParse( assert, "AD 4", "GGG y", cldr, date1 );
	assertParse( assert, "BC 5", "GGG y", cldr, date2 );
});

QUnit.test( "should parse era (GGGG)", function( assert ) {
	date1 = new Date( 0, 0 );
	date2 = new Date( 0, 0 );
	date1.setFullYear( 4 );
	date2.setFullYear( -4 );
	assertParse( assert, "Anno Domini 4", "GGGG y", cldr, date1 );
	assertParse( assert, "Before Christ 5", "GGGG y", cldr, date2 );
});

QUnit.test( "should parse era (GGGGG)", function( assert ) {
	date1 = new Date( 0, 0 );
	date2 = new Date( 0, 0 );
	date1.setFullYear( 4 );
	date2.setFullYear( -4 );
	assertParse( assert, "A 4", "GGGGG y", cldr, date1 );
	assertParse( assert, "B 5", "GGGGG y", cldr, date2 );
});

/**
 *  Year
 */

QUnit.test( "should parse year (y) with no padding", function( assert ) {
	assertParse( assert, "1982", "y", cldr, new Date( 1982, 0 ) );
});

QUnit.test( "should parse year (yy) with padding, and limit 2 digits", function( assert ) {
	// This may change in the future, eg. 82 could eventually be 2082.
	assertParse( assert, "82", "yy", cldr, new Date( 1982, 0 ) );
});

QUnit.test( "should parse year (yyy+) with padding", function( assert ) {
	assertParse( assert, "1982", "yyy", cldr, new Date( 1982, 0 ) );
	assertParse( assert, "01982", "yyyyy", cldr, new Date( 1982, 0 ) );
});

/**
 *  Month
 */

QUnit.test( "should parse month (M|L) with no padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assertParse( assert, "1", "M", cldr, date1 );
	assertParse( assert, "1", "L", cldr, date1 );
});

QUnit.test( "should parse month (MM|LL) with padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assertParse( assert, "01", "MM", cldr, date1 );
	assertParse( assert, "01", "LL", cldr, date1 );
});

QUnit.test( "should parse month (MMM|LLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assertParse( assert, "Jan", "MMM", cldr, date1 );
	assertParse( assert, "Jan", "LLL", cldr, date1 );
});

QUnit.test( "should parse month (MMMM|LLLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assertParse( assert, "January", "MMMM", cldr, date1 );
	assertParse( assert, "January", "LLLL", cldr, date1 );
});

QUnit.test( "should parse month (MMMMM|LLLLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assertParse( assert, "J", "MMMMM", cldr, date1 );
	assertParse( assert, "J", "LLLLL", cldr, date1 );
});

/**
 *  Day
 */

QUnit.test( "should parse day (d) with no padding", function( assert ) {
	date1 = new Date();
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assertParse( assert, "2", "d", cldr, date1 );
});

QUnit.test( "should parse day (dd) with padding", function( assert ) {
	date1 = new Date();
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assertParse( assert, "02", "dd", cldr, date1 );
});

QUnit.test( "should parse day of year (D) with no padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assertParse( assert, "2", "D", cldr, date1 );
});

QUnit.test( "should parse day of year (DD|DDD) with padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assertParse( assert, "02", "DD", cldr, date1 );
	assertParse( assert, "002", "DDD", cldr, date1 );
});

/**
 *  Period
 */

QUnit.test( "should parse period (a)", function( assert ) {
	date1 = new Date();
	date2 = new Date();
	date1.setHours( 5 );
	date2.setHours( 17 );
	date1 = startOf( date1, "hour" );
	date2 = startOf( date2, "hour" );
	assertParse( assert, "5 AM", "h a", cldr, date1 );
	assertParse( assert, "5 PM", "h a", cldr, date2 );
});

/**
 *  Hour
 */

QUnit.test( "should parse hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assertParse( assert, "1", "h", cldr, null, "12-hour time without period should return null" );
	assertParse( assert, "0 AM", "h a", cldr, null, "Out of range should return null" );
	assertParse( assert, "13 AM", "h a", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "9 AM", "h a", cldr, date1 );

	date1.setHours( 0 );
	assertParse( assert, "12 AM", "h a", cldr, date1 );

	date1.setHours( 1 );
	assertParse( assert, "1 AM", "h a", cldr, date1 );

	date1.setHours( 12 );
	assertParse( assert, "12 PM", "h a", cldr, date1 );

	date1.setHours( 13 );
	assertParse( assert, "1 PM", "h a", cldr, date1 );
});

QUnit.test( "should parse hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "09 AM", "hh a", cldr, date1 );
});

QUnit.test( "should parse hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assertParse( assert, "24", "H", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 0 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "0", "H", cldr, date1 );

	date1.setHours( 1 );
	assertParse( assert, "1", "H", cldr, date1 );

	date1.setHours( 12 );
	assertParse( assert, "12", "H", cldr, date1 );

	date1.setHours( 16 );
	assertParse( assert, "16", "H", cldr, date1 );
});

QUnit.test( "should parse hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "09", "HH", cldr, date1 );

	date1.setHours( 16 );
	assertParse( assert, "16", "HH", cldr, date1 );
});

QUnit.test( "should parse hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assertParse( assert, "1", "K", cldr, null, "12-hour time without period should return null" );
	assertParse( assert, "12 AM", "K a", cldr, null, "Out of range should return null" );
	assertParse( assert, "13 AM", "K a", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 0 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "0 AM", "K a", cldr, date1 );

	date1.setHours( 8 );
	assertParse( assert, "8 AM", "K a", cldr, date1 );

	date1.setHours( 12 );
	assertParse( assert, "0 PM", "K a", cldr, date1 );

	date1.setHours( 20 );
	assertParse( assert, "8 PM", "K a", cldr, date1 );
});

QUnit.test( "should parse hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 8 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "08 AM", "KK a", cldr, date1 );
});

QUnit.test( "should parse hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assertParse( assert, "0", "k", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 0 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "24", "k", cldr, date1 );

	date1.setHours( 8 );
	assertParse( assert, "8", "k", cldr, date1 );

	date1.setHours( 12 );
	assertParse( assert, "12", "k", cldr, date1 );

	date1.setHours( 20 );
	assertParse( assert, "20", "k", cldr, date1 );
});

QUnit.test( "should parse hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 5 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "05", "kk", cldr, date1 );

	date1.setHours( 17 );
	assertParse( assert, "17", "kk", cldr, date1 );
});

QUnit.test( "should parse hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "9 AM", "j a", cldr, date1 );
});

QUnit.test( "should parse hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assertParse( assert, "09 AM", "jj a", cldr, date1 );
});

/**
 *  Minute
 */

QUnit.test( "should parse minute (m) with no padding", function( assert ) {
	date1 = new Date();
	date1.setMinutes( 5 );
	date1 = startOf( date1, "minute" );
	assertParse( assert, "5", "m", cldr, date1 );
});

QUnit.test( "should parse minute (mm) with padding", function( assert ) {
	date1 = new Date();
	date1.setMinutes( 5 );
	date1 = startOf( date1, "minute" );
	assertParse( assert, "05", "mm", cldr, date1 );
});

/**
 *  Second
 */

QUnit.test( "should parse second (s) with no padding", function( assert ) {
	date1 = new Date();
	date1.setSeconds( 59 );
	date1 = startOf( date1, "second" );
	assertParse( assert, "59", "s", cldr, date1 );
});

QUnit.test( "should parse second (ss) with padding", function( assert ) {
	date1 = new Date();
	date1.setSeconds( 59 );
	date1 = startOf( date1, "second" );
	assertParse( assert, "59", "ss", cldr, date1 );
});

QUnit.test( "should parse milliseconds (S+)", function( assert ) {
	date1 = new Date();
	date1.setSeconds( 0 );
	date1.setMilliseconds( 400 );
	assertParse( assert, "0 4", "s S", cldr, date1 );
	date1.setMilliseconds( 370 );
	assertParse( assert, "0 37", "s SS", cldr, date1 );
	date1.setMilliseconds( 369 );
	assertParse( assert, "0 369", "s SSS", cldr, date1 );
	assertParse( assert, "0 3690", "s SSSS", cldr, date1 );
	assertParse( assert, "0 36900", "s SSSSS", cldr, date1 );
});

QUnit.test( "should parse milliseconds in a day (A+)", function( assert ) {
	date1 = new Date();
	date1 = startOf( date1, "day" );
	date1.setMilliseconds( 63307400 );
	assertParse( assert, "633074", "A", cldr, date1 );
	date1 = startOf( date1, "day" );
	date1.setMilliseconds( 63307370 );
	assertParse( assert, "6330737", "AA", cldr, date1 );
	date1 = startOf( date1, "day" );
	date1.setMilliseconds( 63307369 );
	assertParse( assert, "63307369", "AAA", cldr, date1 );
	assertParse( assert, "633073690", "AAAA", cldr, date1 );
	assertParse( assert, "6330736900", "AAAAA", cldr, date1 );
});

/**
 *  Zone
 */

// TODO all

});
