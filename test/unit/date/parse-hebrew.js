define([
	"cldr",
	"src/date/parse",
	"src/date/parse-properties",
	"src/gdate/Gdate",
	"src/date/start-of",
	"src/date/tokenizer",
	"src/date/tokenizer-properties",
	"json!cldr-data/main/en/ca-hebrew.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental",
	"src/gdate/Hebrew-date"
], function( Cldr, parse, parseProperties, Gdate, startOf, tokenizer, numberTokenizerProperties,
	enCaHebrew, enNumbers, likelySubtags, weekData ) {

var cldr, date1, date2;

function assertParse( assert, stringDate, pattern, cldr, date ) {
	var tokenizerProperties, tokens;

	tokenizerProperties = numberTokenizerProperties( pattern, cldr );
	tokens = tokenizer( stringDate, simpleNumberParser, tokenizerProperties );

	assert.deepEqual( parse( stringDate, tokens, parseProperties( cldr ) ), date );
}

// Simple number parser for this test purposes.
function simpleNumberParser( value ) {
	return +value;
}

Cldr.load(
	enCaHebrew,
	enNumbers,
	likelySubtags,
	weekData
);

cldr = new Cldr( "en" );

midnight = new Date();
midnight = startOf( midnight, "day", "hebrew" );

QUnit.module( "Hebrew Calendar Date Parse" );

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
	date1 = startOf( date1, "month", "gregorian" );
	assertParse( assert, "1", "M", cldr, date1 );
	assertParse( assert, "1", "L", cldr, date1 );
});

QUnit.test( "should parse month (MM|LL) with padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month", "gregorian" );
	assertParse( assert, "01", "MM", cldr, date1 );
	assertParse( assert, "01", "LL", cldr, date1 );
});

QUnit.test( "should parse month (MMM|LLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month", "gregorian" );
	assertParse( assert, "Jan", "MMM", cldr, date1 );
	assertParse( assert, "Jan", "LLL", cldr, date1 );
});

QUnit.test( "should parse month (MMMM|LLLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month", "gregorian" );
	assertParse( assert, "January", "MMMM", cldr, date1 );
	assertParse( assert, "January", "LLLL", cldr, date1 );
});

QUnit.test( "should parse month (MMMMM|LLLLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month", "gregorian" );
	assertParse( assert, "J", "MMMMM", cldr, date1 );
	assertParse( assert, "J", "LLLLL", cldr, date1 );
});

/**
 *  Day
 */

QUnit.test( "should parse day (d) with no padding", function( assert ) {
	var OrigDate;

	date1 = new Date();
	date1.setDate( 2 );
	date1 = startOf( date1, "day", "gregorian" );
	assertParse( assert, "2", "d", cldr, date1 );

	date1 = new Date( 2014, 1, 28 );
	date1 = startOf( date1, "day", "gregorian" );
	FakeDate.today = new Date( 2014, 1 );
	assertParse( assert, "29", "d", cldr, null );
	assertParse( assert, "28", "d", cldr, date1 );

	date2 = new Date( 2016, 1, 29 );
	date2 = startOf( date2, "day", "gregorian" );
	FakeDate.today = new Date( 2016, 1 );
	assertParse( assert, "30", "d", cldr, null );
	assertParse( assert, "29", "d", cldr, date2 );

	Date = OrigDate;
});

QUnit.test( "should parse day (dd) with padding", function( assert ) {
	date1 = new Date();
	date1.setDate( 2 );
	date1 = startOf( date1, "day", "gregorian" );
	assertParse( assert, "02", "dd", cldr, date1 );
});

QUnit.test( "should parse day of year (D) with no padding", function( assert ) {

	date1 = new Date();
	date1.setMonth( 0 );
	date1.setDate( 2 );
	date1 = startOf( date1, "day", "gregorian" );
	assertParse( assert, "2", "D", cldr, date1 );
});

QUnit.test( "should parse day of year (DD|DDD) with padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1.setDate( 2 );
	date1 = startOf( date1, "day", "gregorian" );
	assertParse( assert, "02", "DD", cldr, date1 );
	assertParse( assert, "002", "DDD", cldr, date1 );
});

});
