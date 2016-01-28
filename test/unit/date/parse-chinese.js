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

cldr = new Cldr( "en-u-ca-Chinese" );

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
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 1 );
	assertParse( assert, "1 5776", "M y", cldr, date1 );
	assertParse( assert, "1 5776", "L y", cldr, date1 );
	date2 = new Gdate.calendars.chinese( 0, 5776, "7-leap", 1 );
	assertParse( assert, "7 5776", "M y", cldr, date2 );
	assertParse( assert, "7 5776", "L y", cldr, date2 );
});

QUnit.test( "should parse month (MM|LL) with padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 1 );
	assertParse( assert, "01 5776", "MM y", cldr, date1 );
	assertParse( assert, "01 5776", "LL y", cldr, date1 );
});

QUnit.test( "should parse month (MMM|LLL)", function( assert ) {
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 1 );
	assertParse( assert, "Tishri 5776", "MMM y", cldr, date1 );
	assertParse( assert, "Tishri 5776", "LLL y", cldr, date1 );
	date2 = new Gdate.calendars.chinese( 0, 5776, 7, 1, "leap" );
	assertParse( assert, "Adar II 5776", "MMM y", cldr, date2 );
	assertParse( assert, "Adar II 5776", "LLL y", cldr, date2 );
});

QUnit.test( "should parse month (MMMM|LLLL)", function( assert ) {
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 1 );
	assertParse( assert, "Tishri 5776", "MMMM y", cldr, date1 );
	assertParse( assert, "Tishri 5776", "LLLL y", cldr, date1 );
});

QUnit.test( "should parse month (MMMMM|LLLLL)", function( assert ) {
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 1 );
	assertParse( assert, "1 5776", "MMMMM y", cldr, date1 );
	assertParse( assert, "1 5776", "LLLLL y", cldr, date1 );
});

/**
 *  Day
 */

QUnit.test( "should parse day (d) with no padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 2 );
	assertParse( assert, "2 1 5776", "d M y", cldr, date1 );

	date2 = new Gdate.calendars.chinese( 0, 5776, "7-leap", 29 );
	assertParse( assert, "30 7 5776", "d M y", cldr, null );
	assertParse( assert, "29 7 5776", "d M y", cldr, date2 );

	date2 = new Gdate.calendars.chinese( 0, 5775, 7, 29 );
	assertParse( assert, "30 7 5775", "d M y", cldr, null );
	assertParse( assert, "29 7 5775", "d M y", cldr, date2 );

});

QUnit.test( "should parse day (dd) with padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 2 );
	assertParse( assert, "02 1 5776", "dd M y", cldr, date1 );
});

QUnit.test( "should parse day of year (D) with no padding", function( assert ) {
	date1 = new Gdate.calendars.hebrew( 0, 5776, 6, 14 );
	assertParse( assert, "163 5776", "D y", cldr, date1 );
});

QUnit.test( "should parse day of year (DD|DDD) with padding", function( assert ) {
	date1 = new Gdate.calendars.chinese( 0, 5776, 1, 2 );
	assertParse( assert, "02 5776", "DD y", cldr, date1 );
	assertParse( assert, "002 5776", "DDD y", cldr, date1 );
});

});
