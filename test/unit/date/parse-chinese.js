define([
	"cldr",
	"src/date/parse",
	"src/date/parse-properties",
	"src/date/tokenizer",
	"src/date/tokenizer-properties",
	"src/gdate/Gdate",
	"json!cldr-data/main/en/ca-chinese.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental",
	"src/gdate/Chinese-date"
], function( Cldr, parse, parseProperties, tokenizer, numberTokenizerProperties, Gdate,
	enCaChinese, enNumbers, likelySubtags, weekData ) {

var cldr, date1, date2;

function assertParse( assert, stringDate, pattern, cldr, date ) {
	var tokenizerProperties, tokens;

	tokenizerProperties = numberTokenizerProperties( pattern, cldr );
	tokens = tokenizer( stringDate, simpleNumberParser, tokenizerProperties );
	if ( date ) {
		assert.deepEqual( parse( stringDate, tokens, parseProperties( cldr ) ), date.toDate() );
	} else {
		assert.equal( parse( stringDate, tokens, parseProperties( cldr ) ), date );
	}
}

// Simple number parser for this test purposes.
function simpleNumberParser( value ) {
	return +value;
}

Cldr.load(
	enCaChinese,
	enNumbers,
	likelySubtags,
	weekData
);

cldr = new Cldr( "en-u-ca-chinese" );

QUnit.module( "Chinese Calendar Date Parse" );

/**
 *  Era not really used for Chinese calendar
 */

/**
 *  Year is the same as Gregorian
 */

/**
 *  Month
 */

QUnit.test( "should parse month (M|L) with no padding", function( assert ) {
	var date1, date2;

	// 1 month6bis 34 cycle 78, to test leap years
	date1 = new Gdate.calendars.chinese(new Date( 2017, 6, 23 ) );
	assertParse( assert, "6bis 34", "M y", cldr, date1 );
	assertParse( assert, "6bis 34", "L y", cldr, date1 );

	// 1 month1 32 cycle 78, new years
	date2 = new Gdate.calendars.chinese( new Date( 2015, 1, 19 ) );
	assertParse( assert, "1 32", "M y", cldr, date2 );
	assertParse( assert, "1 32", "L y", cldr, date2 );
});

QUnit.test( "should parse month (MM|LL) with padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( new Date( 2015, 1, 19 ) );
	assertParse( assert, "01 32", "MM y", cldr, date1 );
	assertParse( assert, "01 32", "LL y", cldr, date1 );
});

QUnit.test( "should parse month (MMM|LLL)", function( assert ) {
	date1 = new Gdate.calendars.chinese( new Date( 2017, 6, 23 ) );
	assertParse( assert, "Mo6bis 34", "MMM y", cldr, date1 );
	assertParse( assert, "Mo6bis 34", "LLL y", cldr, date1 );
	date2 = new Gdate.calendars.chinese( new Date( 2015, 1, 19 ) );
	assertParse( assert, "Mo1 32", "MMM y", cldr, date2 );
	assertParse( assert, "Mo1 32", "LLL y", cldr, date2 );
});

QUnit.test( "should parse month (MMMM|LLLL)", function( assert ) {
	date1 = new Gdate.calendars.chinese( new Date( 2017, 6, 23 ) );
	assertParse( assert, "Month6bis 34", "MMMM y", cldr, date1 );
	assertParse( assert, "Month6bis 34", "LLLL y", cldr, date1 );
	date2 = new Gdate.calendars.chinese( new Date( 2015, 1, 19 ) );
	assertParse( assert, "Month1 32", "MMMM y", cldr, date2 );
	assertParse( assert, "Month1 32", "LLLL y", cldr, date2 );
});

QUnit.test( "should parse month (MMMMM|LLLLL)", function( assert ) {
	date1 = new Gdate.calendars.chinese( new Date( 2017, 6, 23 ) );
	assertParse( assert, "6b 34", "MMMMM y", cldr, date1 );
	assertParse( assert, "6b 34", "LLLLL y", cldr, date1 );
	date2 = new Gdate.calendars.chinese( new Date( 2015, 1, 19 ) );
	assertParse( assert, "1 32", "MMMMM y", cldr, date2 );
	assertParse( assert, "1 32", "LLLLL y", cldr, date2 );
});

/**
 *  Day
 */

QUnit.test( "should parse day (d) with no padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( new Date( 2017, 6, 24 ) );
	assertParse( assert, "2 6bis 34", "d M y", cldr, date1 );
	assertParse( assert, "31 6bis 34", "d M y", cldr, null );
});

QUnit.test( "should parse day (dd) with padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( new Date( 2017, 6, 24 ) );
	assertParse( assert, "02 6bis 34", "dd M y", cldr, date1 );
});

QUnit.test( "should parse day of year (D) with no padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( new Date( 2016, 2, 25 ) );
	assertParse( assert, "47 33", "D y", cldr, date1 );
});

QUnit.test( "should parse day of year (DD|DDD) with padding", function( assert ) {
	date2 = new Gdate.calendars.chinese( new Date( 2015, 1, 19 ) );
	assertParse( assert, "01 32", "DD y", cldr, date2 );
	assertParse( assert, "001 32", "DDD y", cldr, date2 );
});

});
