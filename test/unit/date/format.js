define([
	"cldr",
	"src/date/format",
	"src/date/format-properties",
	"src/util/string/pad",
	"json!cldr-data/main/de/ca-gregorian.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/en-GB/ca-gregorian.json",
	"json!cldr-data/main/en-IN/ca-gregorian.json",
	"json!cldr-data/main/pt/ca-gregorian.json",
	"json!cldr-data/main/ru/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, format, formatProperties, stringPad, deCaGregorian, enCaGregorian,
	enTimeZoneNames, enGbCaGregorian, enInCaGregorian, ptCaGregorian, ruCaGregorian, likelySubtags,
	timeData, weekData ) {

var cldr,
	year0 = new Date( -62167190400000 ),
	yearBc = new Date( -62482053600000 ),
	date1 = new Date( 1982, 0, 2, 9, 5, 59 ),
	date2 = new Date( 2010, 8, 15, 17, 35, 7, 369 ),
	date3 = new Date( 1981, 11, 31, 12 ), // thu
	date4 = new Date( 1994, 11, 31, 12 ); // sat

function FakeDate( timezoneOffset ) {
	this.timezoneOffset = timezoneOffset;
}

function simpleFormatter( pad ) {
	return function( value ) {
		return stringPad( value, pad );
	};
}

FakeDate.prototype.getTimezoneOffset = function() {
	return this.timezoneOffset * -60;
};

Cldr.load(
	deCaGregorian,
	enCaGregorian,
	enGbCaGregorian,
	enInCaGregorian,
	enTimeZoneNames,
	likelySubtags,
	ptCaGregorian,
	ruCaGregorian,
	timeData,
	weekData
);

cldr = new Cldr( "en" );

QUnit.assert.dateFormat = function( date, pattern, cldr, expected ) {
	var pad,
		numberFormatters = [],
		properties = formatProperties( pattern, cldr );

	// Create simple number formatters for this test purposes.
	for ( pad in properties.numberFormatters ) {
		numberFormatters[ pad ] = simpleFormatter( pad );
	}
	var result = format( date, numberFormatters, properties );
	this.deepEqual( result, expected );
};

QUnit.module( "Date Format" );

/**
 *  Era
 */

QUnit.test( "should format era (G|GG|GGG)", function( assert ) {

	assert.dateFormat( date1, "G", cldr, [{
		type: "era",
		value: "AD"
	}] );
	assert.dateFormat( year0, "G", cldr, [{
		type: "era",
		value: "AD"
	}] );

	assert.dateFormat( yearBc, "G", cldr, [{
		type: "era",
		value: "BC"
	}] );

	assert.dateFormat( date1, "GG", cldr, [{
		type: "era",
		value: "AD"
	}] );
	assert.dateFormat( year0, "GG", cldr, [{
		type: "era",
		value: "AD"
	}] );

	assert.dateFormat( yearBc, "GG", cldr, [{
		type: "era",
		value: "BC"
	}] );

	assert.dateFormat( date1, "GGG", cldr, [{
		type: "era",
		value: "AD"
	}] );

	assert.dateFormat( year0, "GGG", cldr, [{
		type: "era",
		value: "AD"
	}] );

	assert.dateFormat( yearBc, "GGG", cldr, [{
		type: "era",
		value: "BC"
	}] );
});

QUnit.test( "should format era (GGGG)", function( assert ) {
	assert.dateFormat( date1, "GGGG", cldr, [{
		type: "era",
		value: "Anno Domini"
	}] );
	assert.dateFormat( year0, "GGGG", cldr, [{
		type: "era",
		value: "Anno Domini"
	}] );

	assert.dateFormat( yearBc, "GGGG", cldr, [{
		type: "era",
		value: "Before Christ"
	}] );
});

QUnit.test( "should format era (GGGGG)", function( assert ) {
	assert.dateFormat( date1, "GGGGG", cldr, [{
		type: "era",
		value: "A"
	}] );
	assert.dateFormat( year0, "GGGGG", cldr,[{
		type: "era",
		value: "A"
	}] );
	assert.dateFormat( yearBc, "GGGGG", cldr, [{
		type: "era",
		value: "B"
	}] );
});

/**
 *  Year
 */

QUnit.test( "should format year (y) with no padding", function( assert ) {
	assert.dateFormat( date2, "y", cldr, [{
		type: "year",
		value: "2010"
	}] );
	assert.dateFormat( date1, "y", cldr, [{
		type: "year",
		value: "1982"
	}] );
	assert.dateFormat( year0, "y", cldr, [{
		type: "year",
		value: "0"
	}] );
});

QUnit.test( "should format year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date2, "yy", cldr, [{
		type: "year",
		value: "10"
	}] );
	assert.dateFormat( date1, "yy", cldr, [{
		type: "year",
		value: "82"
	}] );
	assert.dateFormat( year0, "yy", cldr, [{
		type: "year",
		value: "00"
	}] );
});

QUnit.test( "should format year (yyy+) with padding", function( assert ) {
	assert.dateFormat( date1, "yyy", cldr, [{
		type: "year",
		value: "1982"
	}] );
	assert.dateFormat( date2, "yyy", cldr, [{
		type: "year",
		value: "2010"
	}] );
	assert.dateFormat( year0, "yyyy", cldr, [{
		type: "year",
		value: "0000"
	}] );
	assert.dateFormat( date1, "yyyyy", cldr, [{
		type: "year",
		value: "01982"
	}] );
	assert.dateFormat( date2, "yyyyy", cldr, [{
		type: "year",
		value: "02010"
	}] );
});

QUnit.test( "should format year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.dateFormat( date3, "Y", cldr, [{
		type: "year",
		value: "1982"
	}] );
	assert.dateFormat( date4, "Y", cldr, [{
		type: "year",
		value: "1994"
	}] );
});

QUnit.test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date3, "YY", cldr, [{
		type: "year",
		value: "82"
	}] );
	assert.dateFormat( date4, "YY", cldr, [{
		type: "year",
		value: "94"
	}] );
});

QUnit.test( "should format year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.dateFormat( date3, "YYY", cldr, [{
		type: "year",
		value: "1982"
	}] );
	assert.dateFormat( date4, "YYY", cldr, [{
		type: "year",
		value: "1994"
	}] );
	assert.dateFormat( date3, "YYYYY", cldr, [{
		type: "year",
		value: "01982"
	}] );
	assert.dateFormat( date4, "YYYYY", cldr, [{
		type: "year",
		value: "01994"
	}] );
});

/**
 *  Quarter
 */

QUnit.test( "should format quarter (Q|q) with no padding", function( assert ) {
	assert.dateFormat( date1, "Q", cldr, [{
		type: "quarter",
		value: "1"
	}] );
	assert.dateFormat( date2, "Q", cldr, [{
		type: "quarter",
		value: "3"
	}] );
	assert.dateFormat( date1, "q", cldr, [{
		type: "quarter",
		value: "1"
	}] );
	assert.dateFormat( date2, "q", cldr, [{
		type: "quarter",
		value: "3"
	}] );
});

QUnit.test( "should format quarter (QQ|qq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQ", cldr, [{
		type: "quarter",
		value: "01"
	}] );
	assert.dateFormat( date2, "QQ", cldr, [{
		type: "quarter",
		value: "03"
	}] );
	assert.dateFormat( date1, "qq", cldr, [{
		type: "quarter",
		value: "01"
	}] );
	assert.dateFormat( date2, "qq", cldr, [{
		type: "quarter",
		value: "03"
	}] );
});

QUnit.test( "should format quarter (QQQ|qqq)", function( assert ) {
	assert.dateFormat( date1, "QQQ", cldr, [{
		type: "quarter",
		value: "Q1"
	}] );
	assert.dateFormat( date2, "QQQ", cldr, [{
		type: "quarter",
		value: "Q3"
	}] );
	assert.dateFormat( date1, "qqq", cldr, [{
		type: "quarter",
		value: "Q1"
	}] );
	assert.dateFormat( date2, "qqq", cldr, [{
		type: "quarter",
		value: "Q3"
	}] );
});

QUnit.test( "should format quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQQQ", cldr, [{
		type: "quarter",
		value: "1st quarter"
	}] );
	assert.dateFormat( date2, "QQQQ", cldr, [{
		type: "quarter",
		value: "3rd quarter"
	}] );
	assert.dateFormat( date1, "qqqq", cldr, [{
		type: "quarter",
		value: "1st quarter"
	}] );
	assert.dateFormat( date2, "qqqq", cldr, [{
		type: "quarter",
		value: "3rd quarter"
	}] );
});

/**
 *  Month
 */

QUnit.test( "should format month (M|L) with no padding", function( assert ) {
	assert.dateFormat( date1, "M", cldr, [{
		type: "month",
		value: "1"
	}] );
	assert.dateFormat( date2, "M", cldr, [{
		type: "month",
		value: "9"
	}] );
	assert.dateFormat( date1, "L", cldr, [{
		type: "month",
		value: "1"
	}] );
	assert.dateFormat( date2, "L", cldr, [{
		type: "month",
		value: "9"
	}] );
});

QUnit.test( "should format month (MM|LL) with padding", function( assert ) {
	assert.dateFormat( date1, "MM", cldr, [{
		type: "month",
		value: "01"
	}] );
	assert.dateFormat( date2, "MM", cldr, [{
		type: "month",
		value: "09"
	}] );
	assert.dateFormat( date1, "LL", cldr, [{
		type: "month",
		value: "01"
	}] );
	assert.dateFormat( date2, "LL", cldr, [{
		type: "month",
		value: "09"
	}] );
});

QUnit.test( "should format month (MMM|LLL)", function( assert ) {
	assert.dateFormat( date1, "MMM", cldr, [{
		type: "month",
		value: "Jan"
	}] );
	assert.dateFormat( date2, "MMM", cldr, [{
		type: "month",
		value: "Sep"
	}] );
	assert.dateFormat( date1, "LLL", cldr, [{
		type: "month",
		value: "Jan"
	}] );
	assert.dateFormat( date2, "LLL", cldr, [{
		type: "month",
		value: "Sep"
	}] );
});


QUnit.test( "should format month (MMMM|LLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMM", cldr, [{
		type: "month",
		value: "January"
	}] );
	assert.dateFormat( date2, "MMMM", cldr, [{
		type: "month",
		value: "September"
	}] );
	assert.dateFormat( date1, "LLLL", cldr, [{
		type: "month",
		value: "January"
	}] );
	assert.dateFormat( date2, "LLLL", cldr, [{
		type: "month",
		value: "September"
	}] );
});

QUnit.test( "should format month (MMMMM|LLLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMMM", cldr, [{
		type: "month",
		value: "J"
	}] );
	assert.dateFormat( date2, "MMMMM", cldr, [{
		type: "month",
		value: "S"
	}] );
	assert.dateFormat( date1, "LLLLL", cldr, [{
		type: "month",
		value: "J"
	}] );
	assert.dateFormat( date2, "LLLLL", cldr, [{
		type: "month",
		value: "S"
	}] );
});

/**
 *  Week
 */

QUnit.test( "should format week of year (w) with no padding", function( assert ) {
	assert.dateFormat( date1, "w", cldr, [{
		type: "week",
		value: "1"
	}] );
	assert.dateFormat( date2, "w", cldr, [{
		type: "week",
		value: "38"
	}] );
});

QUnit.test( "should format week of year (ww) with padding", function( assert ) {
	assert.dateFormat( date1, "ww", cldr, [{
		type: "week",
		value: "01"
	}] );
	assert.dateFormat( date2, "ww", cldr, [{
		type: "week",
		value: "38"
	}] );
});

QUnit.test( "should format week of month (W)", function( assert ) {
	assert.dateFormat( date1, "W", cldr, [{
		type: "week",
		value: "1"
	}] );
	assert.dateFormat( date2, "W", cldr, [{
		type: "week",
		value: "3"
	}] );
	assert.dateFormat( date3, "W", cldr, [{
		type: "week",
		value: "5"
	}] );
});

/**
 *  Day
 */

QUnit.test( "should format day (d) with no padding", function( assert ) {
	assert.dateFormat( date1, "d", cldr, [{
		type: "day",
		value: "2"
	}] );
	assert.dateFormat( date2, "d", cldr, [{
		type: "day",
		value: "15"
	}] );
});

QUnit.test( "should format day (dd) with padding", function( assert ) {
	assert.dateFormat( date1, "dd", cldr, [{
		type: "day",
		value: "02"
	}] );
	assert.dateFormat( date2, "dd", cldr, [{
		type: "day",
		value: "15"
	}] );
});

QUnit.test( "should format day of year (D) with no padding", function( assert ) {
	assert.dateFormat( date1, "D", cldr, [{
		type: "day",
		value: "2"
	}] );
	assert.dateFormat( date2, "D", cldr, [{
		type: "day",
		value: "258"
	}] );
});

QUnit.test( "should format day of year (DD|DDD) with padding", function( assert ) {
	assert.dateFormat( date1, "DD", cldr, [{
		type: "day",
		value: "02"
	}] );
	assert.dateFormat( date1, "DDD", cldr, [{
		type: "day",
		value: "002"
	}] );
	assert.dateFormat( date2, "DD", cldr, [{
		type: "day",
		value: "258"
	}] );
});

QUnit.test( "should format day of week in month (F)", function( assert ) {
	assert.dateFormat( date1, "F", cldr, [{ // TODO is this correct?
		type: "day",
		value: "1"
	}] );
	assert.dateFormat( date2, "F", cldr, [{
		type: "day",
		value: "3"
	}] );
});

/**
 *  Week day
 */
QUnit.test( "should format local day of week (e|c) with no padding", function( assert ) {
	assert.dateFormat( date1, "e", cldr, [{
		type: "weekday",
		value: "7"
	}] );
	assert.dateFormat( date2, "e", cldr, [{
		type: "weekday",
		value: "4"
	}] );
	assert.dateFormat( date1, "c", cldr, [{
		type: "weekday",
		value: "7"
	}] );
	assert.dateFormat( date2, "c", cldr, [{
		type: "weekday",
		value: "4"
	}] );
});

QUnit.test( "should format local day of week (ee|cc) with padding", function( assert ) {
	assert.dateFormat( date1, "ee", cldr, [{
		type: "weekday",
		value: "07"
	}] );
	assert.dateFormat( date2, "ee", cldr, [{
		type: "weekday",
		value: "04"
	}] );
	assert.dateFormat( date1, "cc", cldr, [{
		type: "weekday",
		value: "07"
	}] );
	assert.dateFormat( date2, "cc", cldr, [{
		type: "weekday",
		value: "04"
	}] );
});

QUnit.test( "should format local day of week (E|EE|EEE|eee|ccc)", function( assert ) {
	assert.dateFormat( date1, "E", cldr, [{
		type: "weekday",
		value: "Sat"
	}] );
	assert.dateFormat( date2, "E", cldr, [{
		type: "weekday",
		value: "Wed"
	}] );
	assert.dateFormat( date1, "EE", cldr, [{
		type: "weekday",
		value: "Sat"
	}] );
	assert.dateFormat( date2, "EE", cldr, [{
		type: "weekday",
		value: "Wed"
	}] );
	assert.dateFormat( date1, "EEE", cldr, [{
		type: "weekday",
		value: "Sat"
	}] );
	assert.dateFormat( date2, "EEE", cldr, [{
		type: "weekday",
		value: "Wed"
	}] );
	assert.dateFormat( date1, "eee", cldr, [{
		type: "weekday",
		value: "Sat"
	}] );
	assert.dateFormat( date2, "eee", cldr, [{
		type: "weekday",
		value: "Wed"
	}] );
	assert.dateFormat( date1, "ccc", cldr, [{
		type: "weekday",
		value: "Sat"
	}] );
	assert.dateFormat( date2, "ccc", cldr, [{
		type: "weekday",
		value: "Wed"
	}] );
});

QUnit.test( "should format local day of week (EEEE|eeee|cccc)", function( assert ) {
	assert.dateFormat( date1, "EEEE", cldr, [{
		type: "weekday",
		value: "Saturday"
	}] );
	assert.dateFormat( date2, "EEEE", cldr, [{
		type: "weekday",
		value: "Wednesday"
	}] );
	assert.dateFormat( date1, "eeee", cldr, [{
		type: "weekday",
		value: "Saturday"
	}] );
	assert.dateFormat( date2, "eeee", cldr, [{
		type: "weekday",
		value: "Wednesday"
	}] );
	assert.dateFormat( date1, "cccc", cldr, [{
		type: "weekday",
		value: "Saturday"
	}] );
	assert.dateFormat( date2, "cccc", cldr, [{
		type: "weekday",
		value: "Wednesday"
	}] );
});

QUnit.test( "should format local day of week (EEEEE|eeeee|ccccc)", function( assert ) {
	assert.dateFormat( date1, "EEEEE", cldr, [{
		type: "weekday",
		value: "S"
	}] );
	assert.dateFormat( date2, "EEEEE", cldr, [{
		type: "weekday",
		value: "W"
	}] );
	assert.dateFormat( date1, "eeeee", cldr, [{
		type: "weekday",
		value: "S"
	}] );
	assert.dateFormat( date2, "eeeee", cldr, [{
		type: "weekday",
		value: "W"
	}] );
	assert.dateFormat( date1, "ccccc", cldr, [{
		type: "weekday",
		value: "S"
	}] );
	assert.dateFormat( date2, "ccccc", cldr, [{
		type: "weekday",
		value: "W"
	}] );
});

QUnit.test( "should format local day of week (EEEEEE|eeeeee|cccccc)", function( assert ) {
	assert.dateFormat( date1, "EEEEEE", cldr, [{
		type: "weekday",
		value: "Sa"
	}] );
	assert.dateFormat( date2, "EEEEEE", cldr, [{
		type: "weekday",
		value: "We"
	}] );
	assert.dateFormat( date1, "eeeeee", cldr, [{
		type: "weekday",
		value: "Sa"
	}] );
	assert.dateFormat( date2, "eeeeee", cldr, [{
		type: "weekday",
		value: "We"
	}] );
	assert.dateFormat( date1, "cccccc", cldr, [{
		type: "weekday",
		value: "Sa"
	}] );
	assert.dateFormat( date2, "cccccc", cldr, [{
		type: "weekday",
		value: "We"
	}] );
});
/**
 *  Period
 */

QUnit.test( "should format period (a)", function( assert ) {
	assert.dateFormat( date1, "a", cldr, [{
		type: "dayperiod",
		value: "AM"
	}] );
	assert.dateFormat( date2, "a", cldr, [{
		type: "dayperiod",
		value: "PM"
	}] );
});

/**
 *  Hour
 */
QUnit.test( "should format hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assert.dateFormat( date1, "h", cldr, [{
		type: "hour",
		value: "9"
	}] );
	assert.dateFormat( date2, "h", cldr, [{
		type: "hour",
		value: "5"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "h", cldr, [{
		type: "hour",
		value: "12"
	}] );
});

QUnit.test( "should format hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	assert.dateFormat( date1, "hh", cldr, [{
		type: "hour",
		value: "09"
	}] );
	assert.dateFormat( date2, "hh", cldr, [{
		type: "hour",
		value: "05"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "hh", cldr,[{
		type: "hour",
		value: "12"
	}] );
});

QUnit.test( "should format hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assert.dateFormat( date1, "H", cldr, [{
		type: "hour",
		value: "9"
	}] );
	assert.dateFormat( date2, "H", cldr, [{
		type: "hour",
		value: "17"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "H", cldr, [{
		type: "hour",
		value: "0"
	}] );
});

QUnit.test( "should format hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	assert.dateFormat( date1, "HH", cldr, [{
		type: "hour",
		value: "09"
	}] );
	assert.dateFormat( date2, "HH", cldr, [{
		type: "hour",
		value: "17"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "HH", cldr, [{
		type: "hour",
		value: "00"
	}] );
});

QUnit.test( "should format hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assert.dateFormat( date1, "K", cldr, [{
		type: "hour",
		value: "9"
	}] );
	assert.dateFormat( date2, "K", cldr, [{
		type: "hour",
		value: "5"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "K", cldr, [{
		type: "hour",
		value: "0"
	}] );
});

QUnit.test( "should format hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	assert.dateFormat( date1, "KK", cldr, [{
		type: "hour",
		value: "09"
	}] );
	assert.dateFormat( date2, "KK", cldr, [{
		type: "hour",
		value: "05"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "KK", cldr, [{
		type: "hour",
		value: "00"
	}] );
});

QUnit.test( "should format hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assert.dateFormat( date1, "k", cldr, [{
		type: "hour",
		value: "9"
	}] );
	assert.dateFormat( date2, "k", cldr, [{
		type: "hour",
		value: "17"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "k", cldr, [{
		type: "hour",
		value: "24"
	}] );
});

QUnit.test( "should format hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	assert.dateFormat( date1, "kk", cldr, [{
		type: "hour",
		value: "09"
	}] );
	assert.dateFormat( date2, "kk", cldr, [{
		type: "hour",
		value: "17"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "kk", cldr, [{
		type: "hour",
		value: "24"
	}] );
});

QUnit.test( "should format hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	assert.dateFormat( date2, "j", cldr, [{
		type: "hour",
		value: "5"
	}] );
	assert.dateFormat( date2, "j", new Cldr( "pt-BR" ), [{
		type: "hour",
		value: "17"
	}] );
	assert.dateFormat( date2, "j", new Cldr( "de" ), [{
		type: "hour",
		value: "17"
	}] );
	assert.dateFormat( date2, "j", new Cldr( "en-IN" ), [{
		type: "hour",
		value: "5"
	}] );
	assert.dateFormat( date2, "j", new Cldr( "en-GB" ), [{
		type: "hour",
		value: "17"
	}] );
	assert.dateFormat( date2, "j", new Cldr( "ru" ), [{
		type: "hour",
		value: "17"
	}] );
});

QUnit.test( "should format hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	assert.dateFormat( date1, "jj", cldr, [{
		type: "hour",
		value: "09"
	}] );
	assert.dateFormat( date2, "jj", cldr, [{
		type: "hour",
		value: "05"
	}] );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "jj", cldr, [{
		type: "hour",
		value: "12"
	}] );
});

/**
 *  Minute
 */
QUnit.test( "should format minute (m) with no padding", function( assert ) {
	assert.dateFormat( date1, "m", cldr, [{
		type: "minute",
		value: "5"
	}] );
	assert.dateFormat( date2, "m", cldr, [{
		type: "minute",
		value: "35"
	}] );
});

QUnit.test( "should format minute (mm) with padding", function( assert ) {
	assert.dateFormat( date1, "mm", cldr, [{
		type: "minute",
		value: "05"
	}] );
	assert.dateFormat( date2, "mm", cldr, [{
		type: "minute",
		value: "35"
	}] );
});
/**
 *  Second
 */
QUnit.test( "should format second (s) with no padding", function( assert ) {
	assert.dateFormat( date1, "s", cldr, [{
		type: "second",
		value: "59"
	}] );
	assert.dateFormat( date2, "s", cldr, [{
		type: "second",
		value: "7"
	}] );
});

QUnit.test( "should format second (ss) with padding", function( assert ) {
	assert.dateFormat( date1, "ss", cldr, [{
		type: "second",
		value: "59"
	}] );
	assert.dateFormat( date2, "ss", cldr, [{
		type: "second",
		value: "07"
	}] );
});

QUnit.test( "should format various milliseconds (S+)", function( assert ) {
	assert.dateFormat( date2, "S", cldr, [{
		type: "second",
		value: "4"
	}] );
	assert.dateFormat( date2, "SS", cldr, [{
		type: "second",
		value: "37"
	}] );
	assert.dateFormat( date2, "SSS", cldr, [{
		type: "second",
		value: "369"
	}] );
	assert.dateFormat( date2, "SSSS", cldr, [{
		type: "second",
		value: "3690"
	}] );
	assert.dateFormat( date2, "SSSSS", cldr, [{
		type: "second",
		value: "36900"
	}] );
});

QUnit.test( "should format various milliseconds (A+)", function( assert ) {
	assert.dateFormat( date2, "A", cldr, [{
		type: "second",
		value: "633074"
	}] );

	assert.dateFormat( date2, "AA", cldr, [{
		type: "second",
		value: "6330737"
	}] );
   	
	assert.dateFormat( date2, "AAA", cldr, [{
		type: "second",
		value: "63307369"
	}] );
	
	assert.dateFormat( date2, "AAAA", cldr, [{
		type: "second",
		value: "633073690"
	}] );
	
	assert.dateFormat( date2, "AAAAA", cldr, [{
		type: "second",
		value: "6330736900"
	}] );
});

/**
 *  Zone
 */
QUnit.test( "should format timezone (z)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "z", cldr, [{
		type: "zone",
    	value: "GMT"
   }] );
	assert.dateFormat( date, "zz", cldr, [{
		type: "zone",
    	value: "GMT"
   }] );
	assert.dateFormat( date, "zzz", cldr, [{
		type: "zone",
    	value: "GMT"
   }] );
	assert.dateFormat( date, "zzzz", cldr, [{
		type: "zone",
    	value: "GMT"
   }] );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "z", cldr,[{
		type: "zone",
    	value: "GMT-3"
   }] );
	assert.dateFormat( date, "zz", cldr,[{
		type: "zone",
    	value: "GMT-3"
   }] );
	assert.dateFormat( date, "zzz", cldr,[{
		type: "zone",
    	value: "GMT-3"
   }] );
	assert.dateFormat( date, "zzzz", cldr, [{
		type: "zone",
    	value: "GMT-03:00"
   }] );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "z", cldr, [{
		type: "zone",
    	value: "GMT+11"
   }] );
	assert.dateFormat( date, "zz", cldr, [{
		type: "zone",
    	value: "GMT+11"
   }] );
	assert.dateFormat( date, "zzz", cldr, [{
		type: "zone",
    	value: "GMT+11"
   }] );
	assert.dateFormat( date, "zzzz", cldr, [{
		type: "zone",
    	value: "GMT+11:00"
   }] );
});

QUnit.test( "should format timezone (Z)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "Z", cldr, [{
		type: "zone",
    	value: "+0000"
   }] );
   
	assert.dateFormat( date, "ZZ", cldr, [{
		type: "zone",
    	value: "+0000"
   }] );

	assert.dateFormat( date, "ZZZ", cldr, [{
		type: "zone",
    	value: "+0000"
   }] );

	assert.dateFormat( date, "ZZZZ", cldr,[{
		type: "zone",
    	value: "GMT"
   }] );
	assert.dateFormat( date, "ZZZZZ", cldr, [{
		type: "zone",
    	value: "Z"
   }] );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "Z", cldr, [{
		type: "zone",
    	value: "-0300"
   }] );
	assert.dateFormat( date, "ZZ", cldr, [{
		type: "zone",
    	value: "-0300"
   }] );

	assert.dateFormat( date, "ZZZ", cldr, [{
		type: "zone",
    	value: "-0300"
   }] );

	assert.dateFormat( date, "ZZZZ", cldr, [{
		type: "zone",
    	value: "GMT-03:00"
   }] );

	assert.dateFormat( date, "ZZZZZ", cldr, [{
		type: "zone",
    	value: "-03:00"
   }] );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "Z", cldr, [{
		type: "zone",
    	value: "+1100"
   }] );
	assert.dateFormat( date, "ZZ", cldr, [{
		type: "zone",
    	value: "+1100"
   }] );
	assert.dateFormat( date, "ZZZ", cldr, [{
		type: "zone",
    	value: "+1100"
   }] );

	assert.dateFormat( date, "ZZZZ", cldr, [{
		type: "zone",
    	value: "GMT+11:00"
   }] );
	assert.dateFormat( date, "ZZZZZ", cldr, [{
		type: "zone",
    	value: "+11:00"
   }] );
});

QUnit.test( "should format timezone (O)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "O", cldr, [{
		type: "zone",
    	value: "GMT"
   }] );
	assert.dateFormat( date, "OOOO", cldr, [{
		type: "zone",
    	value: "GMT"
   }] );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "O", cldr, [{
		type: "zone",
    	value: "GMT-3"
   }] );

	assert.dateFormat( date, "OOOO", cldr, [{
		type: "zone",
    	value: "GMT-03:00"
   }] );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "O", cldr, [{
		type: "zone",
    	value: "GMT+11"
   }] );

	assert.dateFormat( date, "OOOO", cldr, [{
		type: "zone",
    	value: "GMT+11:00"
   }] );
});

QUnit.test( "should format timezone (X)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "X", cldr, [{
		type: "zone",
    	value: "Z"
   }] );

	assert.dateFormat( date, "XX", cldr, [{
		type: "zone",
    	value: "Z"
   }] );

	assert.dateFormat( date, "XXX", cldr, [{
		type: "zone",
    	value: "Z"
   }] );

	assert.dateFormat( date, "XXXX", cldr, [{
		type: "zone",
    	value: "Z"
   }] );

	assert.dateFormat( date, "XXXXX", cldr, [{
		type: "zone",
    	value: "Z"
   }] );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "X", cldr, [{
		type: "zone",
    	value: "-03"
   }] );

	assert.dateFormat( date, "XX", cldr, [{
		type: "zone",
    	value: "-0300"
   }] );

	assert.dateFormat( date, "XXX", cldr, [{
		type: "zone",
    	value: "-03:00"
   }] );

	assert.dateFormat( date, "XXXX", cldr, [{
		type: "zone",
    	value: "-0300"
   }] );

	assert.dateFormat( date, "XXXXX", cldr, [{
		type: "zone",
    	value: "-03:00"
   }] );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// date = new FakeDate( -7.883 );
	// assert.dateFormat( date, "X", cldr, "-0752" );
	// assert.dateFormat( date, "XX", cldr, "-0752" );
	// assert.dateFormat( date, "XXX", cldr, "-07:52" );
	// assert.dateFormat( date, "XXXX", cldr, "-075258" );
	// assert.dateFormat( date, "XXXXX", cldr, "-07:52:58" );

	date = new FakeDate( 5.5 );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// assert.dateFormat( date, "X", cldr, "+0530" );
	assert.dateFormat( date, "XX", cldr, [{
		type: "zone",
    	value: "+0530"
   }] );

	assert.dateFormat( date, "XXX", cldr, [{
		type: "zone",
    	value: "+05:30"
   }] );

	assert.dateFormat( date, "XXXX", cldr, [{
		type: "zone",
    	value: "+0530"
   }] );

	assert.dateFormat( date, "XXXXX", cldr, [{
		type: "zone",
    	value: "+05:30"
   }] );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "X", cldr, [{
		type: "zone",
    	value: "+11"
   }] );

	assert.dateFormat( date, "XX", cldr, [{
		type: "zone",
    	value: "+1100"
   }] );

	assert.dateFormat( date, "XXX", cldr, [{
		type: "zone",
    	value: "+11:00"
   }] );

	assert.dateFormat( date, "XXXX", cldr, [{
		type: "zone",
    	value: "+1100"
   }] );

	assert.dateFormat( date, "XXXXX", cldr, [{
		type: "zone",
    	value: "+11:00"
   }] );
});

QUnit.test( "should format timezone (x)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "x", cldr, [{
		type: "zone",
    	value: "+00"
   }] );
	assert.dateFormat( date, "xx", cldr, [{
		type: "zone",
    	value: "+0000"
   }] );

	assert.dateFormat( date, "xxx", cldr, [{
		type: "zone",
    	value: "+00:00"
   }] );

	assert.dateFormat( date, "xxxx", cldr, [{
		type: "zone",
    	value: "+0000"
   }] );

	assert.dateFormat( date, "xxxxx", cldr, [{
		type: "zone",
    	value: "+00:00"
   }] );


	date = new FakeDate( -3 );
	assert.dateFormat( date, "x", cldr, [{
		type: "zone",
    	value: "-03"
   }] );
	assert.dateFormat( date, "xx", cldr, [{
		type: "zone",
    	value: "-0300"
   }] );
	assert.dateFormat( date, "xxx", cldr, [{
		type: "zone",
    	value: "-03:00"
   }] );
	assert.dateFormat( date, "xxxx", cldr, [{
		type: "zone",
    	value: "-0300"
   }] );
	assert.dateFormat( date, "xxxxx", cldr, [{
		type: "zone",
    	value: "-03:00"
   }] );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// date = new FakeDate( -7.883 );
	// assert.dateFormat( date, "x", cldr, "-0752" );
	// assert.dateFormat( date, "xx", cldr, "-0752" );
	// assert.dateFormat( date, "xxx", cldr, "-07:52" );
	// assert.dateFormat( date, "xxxx", cldr, "-075258" );
	// assert.dateFormat( date, "xxxxx", cldr, "-07:52:58" );

	date = new FakeDate( 5.5 );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// assert.dateFormat( date, "x", cldr, "+0530" );
	assert.dateFormat( date, "xx", cldr, [{
		type: "zone",
    	value: "+0530"
   }] );

	assert.dateFormat( date, "xxx", cldr, [{
		type: "zone",
    	value: "+05:30"
   }] );

	assert.dateFormat( date, "xxxx", cldr, [{
		type: "zone",
    	value: "+0530"
   }] );

	assert.dateFormat( date, "xxxxx", cldr, [{
		type: "zone",
    	value: "+05:30"
   }] );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "x", cldr, [{
		type: "zone",
    	value: "+11"
   }] );

	assert.dateFormat( date, "xx", cldr, [{
		type: "zone",
    	value: "+1100"
   }] );

	assert.dateFormat( date, "xxx", cldr,  [{
		type: "zone",
    	value: "+11:00"
   }] );

	assert.dateFormat( date, "xxxx", cldr,  [{
		type: "zone",
    	value: "+1100"
   }] );

	assert.dateFormat( date, "xxxxx", cldr,  [{
		type: "zone",
    	value: "+11:00"
   }] );
});

/**
 *  Literal
 */
QUnit.test( "should format literal (')", function( assert ) {

	var result = [
   {
     "type": "year",
     "value": "1982"
   },
   {
     "type": "literal",
     "value": "."
   },
   {
     "type": "month",
     "value": "01"
   },
   {
     "type": "literal",
     "value": "."
   },
   {
     "type": "day",
     "value": "02"
   },
   {
     "type": "literal",
     "value": " "
   },
   {
     "type": "era",
     "value": "AD"
   },
   {
     "type": "literal",
     "value": " at "
   },
   {
     "type": "hour",
     "value": "09"
   },
   {
     "type": "literal",
     "value": ":"
   },
   {
     "type": "minute",
     "value": "05"
   },
   {
     "type": "literal",
     "value": ":"
   },
   {
     "type": "second",
     "value": "59"
   }
 ];
	//assert.dateFormat( date1, "yyyy.MM.dd G 'at' HH:mm:ss", cldr, "1982.01.02 AD at 09:05:59" );
	assert.dateFormat( date1, "yyyy.MM.dd G 'at' HH:mm:ss", cldr, result );

	result = [
   {
     "type": "hour",
     "value": "09"
   },
   {
     "type": "literal",
     "value": " o'clock "
   },
   {
     "type": "dayperiod",
     "value": "AM"
   }
 ];
	
	//assert.dateFormat( date1, "hh 'o''clock' a", cldr, "09 o'clock AM" );
	assert.dateFormat( date1, "hh 'o''clock' a", cldr, result );
});

});




