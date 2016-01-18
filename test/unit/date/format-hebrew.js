define([
	"cldr",
	"src/date/format",
	"src/date/format-properties",
	"src/gdate/Gdate",
	"src/util/string/pad",
	"json!cldr-data/main/he/ca-hebrew.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental",
	"src/gdate/Hebrew-date"
], function( Cldr, format, formatProperties, Gdate, stringPad, heCaHebrew,
	likelySubtags, timeData, weekData ) {
var cldr,
	date1 = new Date( 2016, 1, 23 ), // 14 Adar I 5776 (to test leap year formatting)
	date2 = new Date( 2015, 2, 5 ), // 14 Adar 5775 (to test non-leap year formatting)
	// note that Adar in a non-leap year is month "7-leap", which is 3d quarter
	date3 = new Date( 2015, 6, 23 ), // thu, 7 Av 5775 (4th quarter)
	date4 = new Date( 2015, 3, 25 ), // sat, 6 Iyar 5775 (3d quarter)
	date5 = new Date( 2015, 8, 19 ); // sat, 6 Tishri 5775

function simpleFormatter( pad ) {
	return function( value ) {
		return stringPad( value, pad );
	};
}

Cldr.load(
	heCaHebrew,
	likelySubtags,
	timeData,
	weekData
);

cldr = new Cldr( "he-u-ca-hebrew" );

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

QUnit.module( "Hebrew CalendarDate Format" );

/**
 *  Era
 */

QUnit.test( "should format era (G|GG|GGG)", function( assert ) {
	assert.dateFormat( date1, "G", cldr, "לבה״ע" );
	assert.dateFormat( date1, "GG", cldr, "לבה״ע" );
	assert.dateFormat( date1, "GGG", cldr, "לבה״ע" );
});

QUnit.test( "should format era (GGGG)", function( assert ) {
	assert.dateFormat( date1, "GGGG", cldr, "לבה״ע" );
});

QUnit.test( "should format era (GGGGG)", function( assert ) {
	assert.dateFormat( date1, "GGGGG", cldr, "לבה״ע" );
});

/**
 *  Year
 */

QUnit.test( "should format year (y) with no padding", function( assert ) {
	assert.dateFormat( date1, "y", cldr, "5776" );
	assert.dateFormat( date2, "y", cldr, "5775" );
});

QUnit.test( "should format year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date1, "yy", cldr, "76" );
	assert.dateFormat( date2, "yy", cldr, "75" );
});

QUnit.test( "should format year (yyy+) with padding", function( assert ) {
	assert.dateFormat( date1, "yyy", cldr, "5776" );
	assert.dateFormat( date2, "yyy", cldr, "5775" );
	assert.dateFormat( date1, "yyyyy", cldr, "05776" );
	assert.dateFormat( date2, "yyyyy", cldr, "05775" );
});

QUnit.test( "should format year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.dateFormat( date3, "Y", cldr, "5775" );
	assert.dateFormat( date4, "Y", cldr, "5775" );
});

QUnit.test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date3, "YY", cldr, "75" );
	assert.dateFormat( date4, "YY", cldr, "75" );
});

QUnit.test( "should format year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.dateFormat( date3, "YYY", cldr, "5775" );
	assert.dateFormat( date4, "YYY", cldr, "5775" );
	assert.dateFormat( date3, "YYYYY", cldr, "05775" );
	assert.dateFormat( date4, "YYYYY", cldr, "05775" );
});

/**
 *  Quarter
 */

QUnit.test( "should format quarter (Q|q) with no padding", function( assert ) {
	assert.dateFormat( date1, "Q", cldr, "2" );
	assert.dateFormat( date2, "Q", cldr, "3" );
	assert.dateFormat( date3, "q", cldr, "4" );
	assert.dateFormat( date4, "q", cldr, "3" );
});

QUnit.test( "should format quarter (QQ|qq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQ", cldr, "02" );
	assert.dateFormat( date2, "QQ", cldr, "03" );
	assert.dateFormat( date3, "qq", cldr, "04" );
	assert.dateFormat( date4, "qq", cldr, "03" );
});

QUnit.test( "should format quarter (QQQ|qqq)", function( assert ) {
	assert.dateFormat( date1, "QQQ", cldr, "רבעון 2" );
	assert.dateFormat( date2, "QQQ", cldr, "רבעון 3" );
	assert.dateFormat( date3, "qqq", cldr, "רבעון 4" );
	assert.dateFormat( date4, "qqq", cldr, "רבעון 3" );
});

QUnit.test( "should format quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQQQ", cldr, "רבעון 2" );
	assert.dateFormat( date2, "QQQQ", cldr, "רבעון 3" );
	assert.dateFormat( date3, "qqqq", cldr, "רבעון 4" );
	assert.dateFormat( date4, "qqqq", cldr, "רבעון 3" );
});

/**
 *  Month
 */

QUnit.test( "should format month (M|L) with no padding", function( assert ) {
	assert.dateFormat( date1, "M", cldr, "6" );
	assert.dateFormat( date2, "M", cldr, "7" );
	assert.dateFormat( date1, "L", cldr, "6" );
	assert.dateFormat( date2, "L", cldr, "7" );
});

QUnit.test( "should format month (MM|LL) with padding", function( assert ) {
	assert.dateFormat( date1, "MM", cldr, "06" );
	assert.dateFormat( date2, "MM", cldr, "07" );
	assert.dateFormat( date1, "LL", cldr, "06" );
	assert.dateFormat( date2, "LL", cldr, "07" );
});

QUnit.test( "should format month (MMM|LLL)", function( assert ) {
	assert.dateFormat( date1, "MMM", cldr, "אדר א׳" );
	assert.dateFormat( date2, "MMM", cldr, "אדר" );
	assert.dateFormat( date1, "LLL", cldr, "אדר א׳" );
	assert.dateFormat( date2, "LLL", cldr, "אדר" );
});

QUnit.test( "should format month (MMMM|LLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMM", cldr, "אדר א׳" );
	assert.dateFormat( date2, "MMMM", cldr, "אדר" );
	assert.dateFormat( date1, "LLLL", cldr, "אדר א׳" );
	assert.dateFormat( date2, "LLLL", cldr, "אדר" );
});

QUnit.test( "should format month (MMMMM|LLLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMMM", cldr, "א״א" );
	assert.dateFormat( date2, "MMMMM", cldr, "אד׳" );
	assert.dateFormat( date1, "LLLLL", cldr, "א״א" );
	assert.dateFormat( date2, "LLLLL", cldr, "אד׳" );
});

/**
 *  Week
 */

QUnit.test( "should format week of year (w) with no padding", function( assert ) {
	assert.dateFormat( date1, "w", cldr, "24" );
	assert.dateFormat( date2, "w", cldr, "24" );
});

QUnit.test( "should format week of year (ww) with padding", function( assert ) {
	assert.dateFormat( date1, "ww", cldr, "24" );
	assert.dateFormat( date2, "ww", cldr, "24" );
});

QUnit.test( "should format week of month (W)", function( assert ) {
	assert.dateFormat( date1, "W", cldr, "3" );
	assert.dateFormat( date2, "W", cldr, "3" );
	assert.dateFormat( date3, "W", cldr, "2" );
});

/**
 *  Day
 */

QUnit.test( "should format day (d) with no padding", function( assert ) {
	assert.dateFormat( date1, "d", cldr, "14" );
	assert.dateFormat( date2, "d", cldr, "14" );
});

QUnit.test( "should format day (dd) with padding", function( assert ) {
	assert.dateFormat( date3, "dd", cldr, "07" );
	assert.dateFormat( date4, "dd", cldr, "06" );
});

QUnit.test( "should format day of year (D) with no padding", function( assert ) {
	assert.dateFormat( date1, "D", cldr, "163" );
	assert.dateFormat( date5, "D", cldr, "6" );
});

QUnit.test( "should format day of year (DD|DDD) with padding", function( assert ) {
	assert.dateFormat( date5, "DD", cldr, "06" );
	assert.dateFormat( date5, "DDD", cldr, "006" );
	assert.dateFormat( date2, "DD", cldr, "162" );
});

QUnit.test( "should format day of week in month (F)", function( assert ) {
	assert.dateFormat( date1, "F", cldr, "2" );
	assert.dateFormat( date5, "F", cldr, "1" );
});

});
