define([
	"cldr",
	"src/date/format",
	"src/date/format-properties",
	"src/gdate/Gdate",
	"src/util/string/pad",
	"json!cldr-data/main/en/ca-chinese.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental",
	"src/gdate/Chinese-date"
], function( Cldr, format, formatProperties, Gdate, stringPad, enCaChinese,
	likelySubtags, timeData, weekData ) {
var cldr,
	date1 = new Date( 2017, 6, 24 ), //  ( 2 month6bis 35, to test leap year formatting)
	date2 = new Date( 2015, 1, 19 ), // (New Years 32 to test non-leap year formatting)
	date3 = new Date( 2015, 5, 23 ), //  (8 month5 32, 2d quarter)
	date4 = new Date( 2016, 2, 25 ); // (17 month2 33, 1st quarter, day 47 of the year)

function simpleFormatter( pad ) {
	return function( value ) {
		return stringPad( value, pad );
	};
}

Cldr.load(
	enCaChinese,
	likelySubtags,
	timeData,
	weekData
);

cldr = new Cldr( "en-u-ca-chinese" );

QUnit.assert.dateFormat = function( date, pattern, cldr, expected ) {
	var pad,
		numberFormatters = [],
		properties = formatProperties( pattern, cldr );
		
	// Create simple number formatters for this test purposes.
	for ( pad in properties.numberFormatters ) {
		numberFormatters[ pad ] = simpleFormatter( pad );
	}

	this.equal( format( date, numberFormatters, properties ), expected );
};

QUnit.module( "Chinese CalendarDate Format" );

/**
 *  Eras are not well defined in the Chinese calendar; no specific formatting set
 */

/**
 *  Year
 */

QUnit.test( "should format year (y) with no padding", function( assert ) {
	assert.dateFormat( date1, "y", cldr, "34" );
	assert.dateFormat( date2, "y", cldr, "32" );
});

QUnit.test( "should format year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date1, "yy", cldr, "34" );
	assert.dateFormat( date2, "yy", cldr, "32" );
});

QUnit.test( "should format year (yyy+) with padding", function( assert ) {
	assert.dateFormat( date1, "yyy", cldr, "034" );
	assert.dateFormat( date2, "yyy", cldr, "032" );
	assert.dateFormat( date1, "yyyyy", cldr, "00034" );
	assert.dateFormat( date2, "yyyyy", cldr, "00032" );
});

QUnit.test( "should format year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.dateFormat( date3, "Y", cldr, "32" );
	assert.dateFormat( date4, "Y", cldr, "33" );
});

QUnit.test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date3, "YY", cldr, "32" );
	assert.dateFormat( date4, "YY", cldr, "33" );
});

QUnit.test( "should format year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.dateFormat( date3, "YYY", cldr, "032" );
	assert.dateFormat( date4, "YYY", cldr, "033" );
	assert.dateFormat( date3, "YYYYY", cldr, "00032" );
	assert.dateFormat( date4, "YYYYY", cldr, "00033" );
});

/**
 *  Quarter
 */

QUnit.test( "should format quarter (Q|q) with no padding", function( assert ) {
	assert.dateFormat( date1, "Q", cldr, "2" );
	assert.dateFormat( date2, "Q", cldr, "1" );
	assert.dateFormat( date3, "q", cldr, "2" );
	assert.dateFormat( date4, "q", cldr, "1" );
});

QUnit.test( "should format quarter (QQ|qq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQ", cldr, "02" );
	assert.dateFormat( date2, "QQ", cldr, "01" );
	assert.dateFormat( date3, "qq", cldr, "02" );
	assert.dateFormat( date4, "qq", cldr, "01" );
});

QUnit.test( "should format quarter (QQQ|qqq)", function( assert ) {
	assert.dateFormat( date1, "QQQ", cldr, "Q2" );
	assert.dateFormat( date2, "QQQ", cldr, "Q1" );
	assert.dateFormat( date3, "qqq", cldr, "Q2" );
	assert.dateFormat( date4, "qqq", cldr, "Q1" );
});

QUnit.test( "should format quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQQQ", cldr, "2nd quarter" );
	assert.dateFormat( date2, "QQQQ", cldr, "1st quarter" );
	assert.dateFormat( date3, "qqqq", cldr, "2nd quarter" );
	assert.dateFormat( date4, "qqqq", cldr, "1st quarter" );
});

/**
 *  Month
 */

QUnit.test( "should format month (M|L) with no padding", function( assert ) {
	assert.dateFormat( date1, "M", cldr, "6bis" );
	assert.dateFormat( date2, "M", cldr, "1" );
	assert.dateFormat( date1, "L", cldr, "6bis" );
	assert.dateFormat( date2, "L", cldr, "1" );
});

QUnit.test( "should format month (MM|LL) with padding", function( assert ) {
	assert.dateFormat( date1, "MM", cldr, "06bis" );
	assert.dateFormat( date2, "MM", cldr, "01" );
	assert.dateFormat( date1, "LL", cldr, "06bis" );
	assert.dateFormat( date2, "LL", cldr, "01" );
});

QUnit.test( "should format month (MMM|LLL)", function( assert ) {
	assert.dateFormat( date1, "MMM", cldr, "Mo6bis" );
	assert.dateFormat( date2, "MMM", cldr, "Mo1" );
	assert.dateFormat( date1, "LLL", cldr, "Mo6bis" );
	assert.dateFormat( date2, "LLL", cldr, "Mo1" );
});

QUnit.test( "should format month (MMMM|LLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMM", cldr, "Month6bis" );
	assert.dateFormat( date2, "MMMM", cldr, "Month1" );
	assert.dateFormat( date1, "LLLL", cldr, "Month6bis" );
	assert.dateFormat( date2, "LLLL", cldr, "Month1" );
});

QUnit.test( "should format month (MMMMM|LLLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMMM", cldr, "6b" );
	assert.dateFormat( date2, "MMMMM", cldr, "1" );
	assert.dateFormat( date1, "LLLLL", cldr, "6b" );
	assert.dateFormat( date2, "LLLLL", cldr, "1" );
});

/**
 *  Week
 */

QUnit.test( "should format week of year (w) with no padding", function( assert ) {
	assert.dateFormat( date1, "w", cldr, "27" );
	assert.dateFormat( date2, "w", cldr, "1" );
});

QUnit.test( "should format week of year (ww) with padding", function( assert ) {
	assert.dateFormat( date1, "ww", cldr, "27" );
	assert.dateFormat( date2, "ww", cldr, "01" );
});

QUnit.test( "should format week of month (W)", function( assert ) {
	assert.dateFormat( date1, "W", cldr, "1" );
	assert.dateFormat( date2, "W", cldr, "1" );
	assert.dateFormat( date3, "W", cldr, "2" );
});

/**
 *  Day
 */

QUnit.test( "should format day (d) with no padding", function( assert ) {
	assert.dateFormat( date1, "d", cldr, "2" );
	assert.dateFormat( date2, "d", cldr, "1" );
});

QUnit.test( "should format day (dd) with padding", function( assert ) {
	assert.dateFormat( date3, "dd", cldr, "08" );
	assert.dateFormat( date4, "dd", cldr, "17" );
});

QUnit.test( "should format day of year (D) with no padding", function( assert ) {
	assert.dateFormat( date2, "D", cldr, "1" );
	assert.dateFormat( date4, "D", cldr, "47" );
});

QUnit.test( "should format day of year (DD|DDD) with padding", function( assert ) {
	assert.dateFormat( date4, "DD", cldr, "47" );
	assert.dateFormat( date4, "DDD", cldr, "047" );
	assert.dateFormat( date2, "DD", cldr, "01" );
});

QUnit.test( "should format day of week in month (F)", function( assert ) {
	assert.dateFormat( date1, "F", cldr, "1" );
	assert.dateFormat( date4, "F", cldr, "3" );
});

});
