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

function simpleFormat( pad ) {
	return function( value ) {
		return stringPad( value, pad );
	};
}

function properties( pattern, cldr ) {
	var pad,
		aux = formatProperties( pattern, cldr );

	// Create simple number formatters for this test purposes.
	for ( pad in aux.formatNumber ) {
		aux.formatNumber[ pad ] = simpleFormat( pad );
	}

	return aux;
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

QUnit.module( "Date Format" );

/**
 *  Era
 */

QUnit.test( "should format era (G|GG|GGG)", function( assert ) {
	assert.equal( format( date1, properties( "G", cldr ) ), "AD" );
	assert.equal( format( year0, properties( "G", cldr ) ), "AD" );
	assert.equal( format( yearBc, properties( "G", cldr ) ), "BC" );
	assert.equal( format( date1, properties( "GG", cldr ) ), "AD" );
	assert.equal( format( year0, properties( "GG", cldr ) ), "AD" );
	assert.equal( format( yearBc, properties( "GG", cldr ) ), "BC" );
	assert.equal( format( date1, properties( "GGG", cldr ) ), "AD" );
	assert.equal( format( year0, properties( "GGG", cldr ) ), "AD" );
	assert.equal( format( yearBc, properties( "GGG", cldr ) ), "BC" );
});

QUnit.test( "should format era (GGGG)", function( assert ) {
	assert.equal( format( date1, properties( "GGGG", cldr ) ), "Anno Domini" );
	assert.equal( format( year0, properties( "GGGG", cldr ) ), "Anno Domini" );
	assert.equal( format( yearBc, properties( "GGGG", cldr ) ), "Before Christ" );
});

QUnit.test( "should format era (GGGGG)", function( assert ) {
	assert.equal( format( date1, properties( "GGGGG", cldr ) ), "A" );
	assert.equal( format( year0, properties( "GGGGG", cldr ) ), "A" );
	assert.equal( format( yearBc, properties( "GGGGG", cldr ) ), "B" );
});

/**
 *  Year
 */

QUnit.test( "should format year (y) with no padding", function( assert ) {
	assert.equal( format( date2, properties( "y", cldr ) ), "2010" );
	assert.equal( format( date1, properties( "y", cldr ) ), "1982" );
	assert.equal( format( year0, properties( "y", cldr ) ), "0" );
});

QUnit.test( "should format year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.equal( format( date2, properties( "yy", cldr ) ), "10" );
	assert.equal( format( date1, properties( "yy", cldr ) ), "82" );
	assert.equal( format( year0, properties( "yy", cldr ) ), "00" );
});

QUnit.test( "should format year (yyy+) with padding", function( assert ) {
	assert.equal( format( date1, properties( "yyy", cldr ) ), "1982" );
	assert.equal( format( date2, properties( "yyy", cldr ) ), "2010" );
	assert.equal( format( year0, properties( "yyyy", cldr ) ), "0000" );
	assert.equal( format( date1, properties( "yyyyy", cldr ) ), "01982" );
	assert.equal( format( date2, properties( "yyyyy", cldr ) ), "02010" );
});

QUnit.test( "should format year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.equal( format( date3, properties( "Y", cldr ) ), "1982" );
	assert.equal( format( date4, properties( "Y", cldr ) ), "1994" );
});

QUnit.test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.equal( format( date3, properties( "YY", cldr ) ), "82" );
	assert.equal( format( date4, properties( "YY", cldr ) ), "94" );
});

QUnit.test( "should format year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.equal( format( date3, properties( "YYY", cldr ) ), "1982" );
	assert.equal( format( date4, properties( "YYY", cldr ) ), "1994" );
	assert.equal( format( date3, properties( "YYYYY", cldr ) ), "01982" );
	assert.equal( format( date4, properties( "YYYYY", cldr ) ), "01994" );
});

/**
 *  Quarter
 */

QUnit.test( "should format quarter (Q|q) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "Q", cldr ) ), "1" );
	assert.equal( format( date2, properties( "Q", cldr ) ), "3" );
	assert.equal( format( date1, properties( "q", cldr ) ), "1" );
	assert.equal( format( date2, properties( "q", cldr ) ), "3" );
});

QUnit.test( "should format quarter (QQ|qq) with padding", function( assert ) {
	assert.equal( format( date1, properties( "QQ", cldr ) ), "01" );
	assert.equal( format( date2, properties( "QQ", cldr ) ), "03" );
	assert.equal( format( date1, properties( "qq", cldr ) ), "01" );
	assert.equal( format( date2, properties( "qq", cldr ) ), "03" );
});

QUnit.test( "should format quarter (QQQ|qqq)", function( assert ) {
	assert.equal( format( date1, properties( "QQQ", cldr ) ), "Q1" );
	assert.equal( format( date2, properties( "QQQ", cldr ) ), "Q3" );
	assert.equal( format( date1, properties( "qqq", cldr ) ), "Q1" );
	assert.equal( format( date2, properties( "qqq", cldr ) ), "Q3" );
});

QUnit.test( "should format quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.equal( format( date1, properties( "QQQQ", cldr ) ), "1st quarter" );
	assert.equal( format( date2, properties( "QQQQ", cldr ) ), "3rd quarter" );
	assert.equal( format( date1, properties( "qqqq", cldr ) ), "1st quarter" );
	assert.equal( format( date2, properties( "qqqq", cldr ) ), "3rd quarter" );
});

/**
 *  Month
 */

QUnit.test( "should format month (M|L) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "M", cldr ) ), "1" );
	assert.equal( format( date2, properties( "M", cldr ) ), "9" );
	assert.equal( format( date1, properties( "L", cldr ) ), "1" );
	assert.equal( format( date2, properties( "L", cldr ) ), "9" );
});

QUnit.test( "should format month (MM|LL) with padding", function( assert ) {
	assert.equal( format( date1, properties( "MM", cldr ) ), "01" );
	assert.equal( format( date2, properties( "MM", cldr ) ), "09" );
	assert.equal( format( date1, properties( "LL", cldr ) ), "01" );
	assert.equal( format( date2, properties( "LL", cldr ) ), "09" );
});

QUnit.test( "should format month (MMM|LLL)", function( assert ) {
	assert.equal( format( date1, properties( "MMM", cldr ) ), "Jan" );
	assert.equal( format( date2, properties( "MMM", cldr ) ), "Sep" );
	assert.equal( format( date1, properties( "LLL", cldr ) ), "Jan" );
	assert.equal( format( date2, properties( "LLL", cldr ) ), "Sep" );
});

QUnit.test( "should format month (MMMM|LLLL)", function( assert ) {
	assert.equal( format( date1, properties( "MMMM", cldr ) ), "January" );
	assert.equal( format( date2, properties( "MMMM", cldr ) ), "September" );
	assert.equal( format( date1, properties( "LLLL", cldr ) ), "January" );
	assert.equal( format( date2, properties( "LLLL", cldr ) ), "September" );
});

QUnit.test( "should format month (MMMMM|LLLLL)", function( assert ) {
	assert.equal( format( date1, properties( "MMMMM", cldr ) ), "J" );
	assert.equal( format( date2, properties( "MMMMM", cldr ) ), "S" );
	assert.equal( format( date1, properties( "LLLLL", cldr ) ), "J" );
	assert.equal( format( date2, properties( "LLLLL", cldr ) ), "S" );
});

/**
 *  Week
 */

QUnit.test( "should format week of year (w) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "w", cldr ) ), "1" );
	assert.equal( format( date2, properties( "w", cldr ) ), "38" );
});

QUnit.test( "should format week of year (ww) with padding", function( assert ) {
	assert.equal( format( date1, properties( "ww", cldr ) ), "01" );
	assert.equal( format( date2, properties( "ww", cldr ) ), "38" );
});

QUnit.test( "should format week of month (W)", function( assert ) {
	assert.equal( format( date1, properties( "W", cldr ) ), "1" );
	assert.equal( format( date2, properties( "W", cldr ) ), "3" );
	assert.equal( format( date3, properties( "W", cldr ) ), "5" );
});

/**
 *  Day
 */

QUnit.test( "should format day (d) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "d", cldr ) ), "2" );
	assert.equal( format( date2, properties( "d", cldr ) ), "15" );
});

QUnit.test( "should format day (dd) with padding", function( assert ) {
	assert.equal( format( date1, properties( "dd", cldr ) ), "02" );
	assert.equal( format( date2, properties( "dd", cldr ) ), "15" );
});

QUnit.test( "should format day of year (D) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "D", cldr ) ), "2" );
	assert.equal( format( date2, properties( "D", cldr ) ), "258" );
});

QUnit.test( "should format day of year (DD|DDD) with padding", function( assert ) {
	assert.equal( format( date1, properties( "DD", cldr ) ), "02" );
	assert.equal( format( date1, properties( "DDD", cldr ) ), "002" );
	assert.equal( format( date2, properties( "DD", cldr ) ), "258" );
});

QUnit.test( "should format day of week in month (F)", function( assert ) {
	assert.equal( format( date1, properties( "F", cldr ) ), "1" );
	assert.equal( format( date2, properties( "F", cldr ) ), "3" );
});

/**
 *  Week day
 */

QUnit.test( "should format local day of week (e|c) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "e", cldr ) ), "7" );
	assert.equal( format( date2, properties( "e", cldr ) ), "4" );
	assert.equal( format( date1, properties( "c", cldr ) ), "7" );
	assert.equal( format( date2, properties( "c", cldr ) ), "4" );
});

QUnit.test( "should format local day of week (ee|cc) with padding", function( assert ) {
	assert.equal( format( date1, properties( "ee", cldr ) ), "07" );
	assert.equal( format( date2, properties( "ee", cldr ) ), "04" );
	assert.equal( format( date1, properties( "cc", cldr ) ), "07" );
	assert.equal( format( date2, properties( "cc", cldr ) ), "04" );
});

QUnit.test( "should format local day of week (E|EE|EEE|eee|ccc)", function( assert ) {
	assert.equal( format( date1, properties( "E", cldr ) ), "Sat" );
	assert.equal( format( date2, properties( "E", cldr ) ), "Wed" );
	assert.equal( format( date1, properties( "EE", cldr ) ), "Sat" );
	assert.equal( format( date2, properties( "EE", cldr ) ), "Wed" );
	assert.equal( format( date1, properties( "EEE", cldr ) ), "Sat" );
	assert.equal( format( date2, properties( "EEE", cldr ) ), "Wed" );
	assert.equal( format( date1, properties( "eee", cldr ) ), "Sat" );
	assert.equal( format( date2, properties( "eee", cldr ) ), "Wed" );
	assert.equal( format( date1, properties( "ccc", cldr ) ), "Sat" );
	assert.equal( format( date2, properties( "ccc", cldr ) ), "Wed" );
});

QUnit.test( "should format local day of week (EEEE|eeee|cccc)", function( assert ) {
	assert.equal( format( date1, properties( "EEEE", cldr ) ), "Saturday" );
	assert.equal( format( date2, properties( "EEEE", cldr ) ), "Wednesday" );
	assert.equal( format( date1, properties( "eeee", cldr ) ), "Saturday" );
	assert.equal( format( date2, properties( "eeee", cldr ) ), "Wednesday" );
	assert.equal( format( date1, properties( "cccc", cldr ) ), "Saturday" );
	assert.equal( format( date2, properties( "cccc", cldr ) ), "Wednesday" );
});

QUnit.test( "should format local day of week (EEEEE|eeeee|ccccc)", function( assert ) {
	assert.equal( format( date1, properties( "EEEEE", cldr ) ), "S" );
	assert.equal( format( date2, properties( "EEEEE", cldr ) ), "W" );
	assert.equal( format( date1, properties( "eeeee", cldr ) ), "S" );
	assert.equal( format( date2, properties( "eeeee", cldr ) ), "W" );
	assert.equal( format( date1, properties( "ccccc", cldr ) ), "S" );
	assert.equal( format( date2, properties( "ccccc", cldr ) ), "W" );
});

QUnit.test( "should format local day of week (EEEEEE|eeeeee|cccccc)", function( assert ) {
	assert.equal( format( date1, properties( "EEEEEE", cldr ) ), "Sa" );
	assert.equal( format( date2, properties( "EEEEEE", cldr ) ), "We" );
	assert.equal( format( date1, properties( "eeeeee", cldr ) ), "Sa" );
	assert.equal( format( date2, properties( "eeeeee", cldr ) ), "We" );
	assert.equal( format( date1, properties( "cccccc", cldr ) ), "Sa" );
	assert.equal( format( date2, properties( "cccccc", cldr ) ), "We" );
});

/**
 *  Period
 */

QUnit.test( "should format period (a)", function( assert ) {
	assert.equal( format( date1, properties( "a", cldr ) ), "AM" );
	assert.equal( format( date2, properties( "a", cldr ) ), "PM" );
});

/**
 *  Hour
 */

QUnit.test( "should format hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assert.equal( format( date1, properties( "h", cldr ) ), "9" );
	assert.equal( format( date2, properties( "h", cldr ) ), "5" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "h", cldr ) ), "12" );
});

QUnit.test( "should format hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	assert.equal( format( date1, properties( "hh", cldr ) ), "09" );
	assert.equal( format( date2, properties( "hh", cldr ) ), "05" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "hh", cldr ) ), "12" );
});

QUnit.test( "should format hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assert.equal( format( date1, properties( "H", cldr ) ), "9" );
	assert.equal( format( date2, properties( "H", cldr ) ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "H", cldr ) ), "0" );
});

QUnit.test( "should format hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	assert.equal( format( date1, properties( "HH", cldr ) ), "09" );
	assert.equal( format( date2, properties( "HH", cldr ) ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "HH", cldr ) ), "00" );
});

QUnit.test( "should format hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assert.equal( format( date1, properties( "K", cldr ) ), "9" );
	assert.equal( format( date2, properties( "K", cldr ) ), "5" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "K", cldr ) ), "0" );
});

QUnit.test( "should format hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	assert.equal( format( date1, properties( "KK", cldr ) ), "09" );
	assert.equal( format( date2, properties( "KK", cldr ) ), "05" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "KK", cldr ) ), "00" );
});

QUnit.test( "should format hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assert.equal( format( date1, properties( "k", cldr ) ), "9" );
	assert.equal( format( date2, properties( "k", cldr ) ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "k", cldr ) ), "24" );
});

QUnit.test( "should format hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	assert.equal( format( date1, properties( "kk", cldr ) ), "09" );
	assert.equal( format( date2, properties( "kk", cldr ) ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "kk", cldr ) ), "24" );
});

QUnit.test( "should format hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	assert.equal( format( date2, properties( "j", cldr ) ), "5" );
	assert.equal( format( date2, properties( "j", new Cldr( "pt-BR" ) ) ), "17" );
	assert.equal( format( date2, properties( "j", new Cldr( "de" ) ) ), "17" );
	assert.equal( format( date2, properties( "j", new Cldr( "en-IN" ) ) ), "5" );
	assert.equal( format( date2, properties( "j", new Cldr( "en-GB" ) ) ), "17" );
	assert.equal( format( date2, properties( "j", new Cldr( "ru" ) ) ), "17" );
});

QUnit.test( "should format hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	assert.equal( format( date1, properties( "jj", cldr ) ), "09" );
	assert.equal( format( date2, properties( "jj", cldr ) ), "05" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), properties( "jj", cldr ) ), "12" );
});

/**
 *  Minute
 */

QUnit.test( "should format minute (m) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "m", cldr ) ), "5" );
	assert.equal( format( date2, properties( "m", cldr ) ), "35" );
});

QUnit.test( "should format minute (mm) with padding", function( assert ) {
	assert.equal( format( date1, properties( "mm", cldr ) ), "05" );
	assert.equal( format( date2, properties( "mm", cldr ) ), "35" );
});

/**
 *  Second
 */

QUnit.test( "should format second (s) with no padding", function( assert ) {
	assert.equal( format( date1, properties( "s", cldr ) ), "59" );
	assert.equal( format( date2, properties( "s", cldr ) ), "7" );
});

QUnit.test( "should format second (ss) with padding", function( assert ) {
	assert.equal( format( date1, properties( "ss", cldr ) ), "59" );
	assert.equal( format( date2, properties( "ss", cldr ) ), "07" );
});

QUnit.test( "should format various milliseconds (S+)", function( assert ) {
	assert.equal( format( date2, properties( "S", cldr ) ), "4" );
	assert.equal( format( date2, properties( "SS", cldr ) ), "37" );
	assert.equal( format( date2, properties( "SSS", cldr ) ), "369" );
	assert.equal( format( date2, properties( "SSSS", cldr ) ), "3690" );
	assert.equal( format( date2, properties( "SSSSS", cldr ) ), "36900" );
});

QUnit.test( "should format various milliseconds (A+)", function( assert ) {
	assert.equal( format( date2, properties( "A", cldr ) ), "633074" );
	assert.equal( format( date2, properties( "AA", cldr ) ), "6330737" );
	assert.equal( format( date2, properties( "AAA", cldr ) ), "63307369" );
	assert.equal( format( date2, properties( "AAAA", cldr ) ), "633073690" );
	assert.equal( format( date2, properties( "AAAAA", cldr ) ), "6330736900" );
});

/**
 *  Zone
 */

QUnit.test( "should format timezone (z)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.equal( format( date, properties( "z", cldr ) ), "GMT" );
	assert.equal( format( date, properties( "zz", cldr ) ), "GMT" );
	assert.equal( format( date, properties( "zzz", cldr ) ), "GMT" );
	assert.equal( format( date, properties( "zzzz", cldr ) ), "GMT" );

	date = new FakeDate( -3 );
	assert.equal( format( date, properties( "z", cldr ) ), "GMT-3" );
	assert.equal( format( date, properties( "zz", cldr ) ), "GMT-3" );
	assert.equal( format( date, properties( "zzz", cldr ) ), "GMT-3" );
	assert.equal( format( date, properties( "zzzz", cldr ) ), "GMT-03:00" );

	date = new FakeDate( 11 );
	assert.equal( format( date, properties( "z", cldr ) ), "GMT+11" );
	assert.equal( format( date, properties( "zz", cldr ) ), "GMT+11" );
	assert.equal( format( date, properties( "zzz", cldr ) ), "GMT+11" );
	assert.equal( format( date, properties( "zzzz", cldr ) ), "GMT+11:00" );
});

QUnit.test( "should format timezone (Z)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.equal( format( date, properties( "Z", cldr ) ), "+0000" );
	assert.equal( format( date, properties( "ZZ", cldr ) ), "+0000" );
	assert.equal( format( date, properties( "ZZZ", cldr ) ), "+0000" );
	assert.equal( format( date, properties( "ZZZZ", cldr ) ), "GMT" );
	assert.equal( format( date, properties( "ZZZZZ", cldr ) ), "Z" );

	date = new FakeDate( -3 );
	assert.equal( format( date, properties( "Z", cldr ) ), "-0300" );
	assert.equal( format( date, properties( "ZZ", cldr ) ), "-0300" );
	assert.equal( format( date, properties( "ZZZ", cldr ) ), "-0300" );
	assert.equal( format( date, properties( "ZZZZ", cldr ) ), "GMT-03:00" );
	assert.equal( format( date, properties( "ZZZZZ", cldr ) ), "-03:00" );

	date = new FakeDate( 11 );
	assert.equal( format( date, properties( "Z", cldr ) ), "+1100" );
	assert.equal( format( date, properties( "ZZ", cldr ) ), "+1100" );
	assert.equal( format( date, properties( "ZZZ", cldr ) ), "+1100" );
	assert.equal( format( date, properties( "ZZZZ", cldr ) ), "GMT+11:00" );
	assert.equal( format( date, properties( "ZZZZZ", cldr ) ), "+11:00" );
});

QUnit.test( "should format timezone (O)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.equal( format( date, properties( "O", cldr ) ), "GMT" );
	assert.equal( format( date, properties( "OOOO", cldr ) ), "GMT" );

	date = new FakeDate( -3 );
	assert.equal( format( date, properties( "O", cldr ) ), "GMT-3" );
	assert.equal( format( date, properties( "OOOO", cldr ) ), "GMT-03:00" );

	date = new FakeDate( 11 );
	assert.equal( format( date, properties( "O", cldr ) ), "GMT+11" );
	assert.equal( format( date, properties( "OOOO", cldr ) ), "GMT+11:00" );
});

QUnit.test( "should format timezone (X)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.equal( format( date, properties( "X", cldr ) ), "Z" );
	assert.equal( format( date, properties( "XX", cldr ) ), "Z" );
	assert.equal( format( date, properties( "XXX", cldr ) ), "Z" );
	assert.equal( format( date, properties( "XXXX", cldr ) ), "Z" );
	assert.equal( format( date, properties( "XXXXX", cldr ) ), "Z" );

	date = new FakeDate( -3 );
	assert.equal( format( date, properties( "X", cldr ) ), "-03" );
	assert.equal( format( date, properties( "XX", cldr ) ), "-0300" );
	assert.equal( format( date, properties( "XXX", cldr ) ), "-03:00" );
	assert.equal( format( date, properties( "XXXX", cldr ) ), "-0300" );
	assert.equal( format( date, properties( "XXXXX", cldr ) ), "-03:00" );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// date = new FakeDate( -7.883 );
	// assert.equal( format( date, properties( "X", cldr ) ), "-0752" );
	// assert.equal( format( date, properties( "XX", cldr ) ), "-0752" );
	// assert.equal( format( date, properties( "XXX", cldr ) ), "-07:52" );
	// assert.equal( format( date, properties( "XXXX", cldr ) ), "-075258" );
	// assert.equal( format( date, properties( "XXXXX", cldr ) ), "-07:52:58" );

	date = new FakeDate( 5.5 );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// assert.equal( format( date, properties( "X", cldr ) ), "+0530" );
	assert.equal( format( date, properties( "XX", cldr ) ), "+0530" );
	assert.equal( format( date, properties( "XXX", cldr ) ), "+05:30" );
	assert.equal( format( date, properties( "XXXX", cldr ) ), "+0530" );
	assert.equal( format( date, properties( "XXXXX", cldr ) ), "+05:30" );

	date = new FakeDate( 11 );
	assert.equal( format( date, properties( "X", cldr ) ), "+11" );
	assert.equal( format( date, properties( "XX", cldr ) ), "+1100" );
	assert.equal( format( date, properties( "XXX", cldr ) ), "+11:00" );
	assert.equal( format( date, properties( "XXXX", cldr ) ), "+1100" );
	assert.equal( format( date, properties( "XXXXX", cldr ) ), "+11:00" );
});

QUnit.test( "should format timezone (x)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.equal( format( date, properties( "x", cldr ) ), "+00" );
	assert.equal( format( date, properties( "xx", cldr ) ), "+0000" );
	assert.equal( format( date, properties( "xxx", cldr ) ), "+00:00" );
	assert.equal( format( date, properties( "xxxx", cldr ) ), "+0000" );
	assert.equal( format( date, properties( "xxxxx", cldr ) ), "+00:00" );

	date = new FakeDate( -3 );
	assert.equal( format( date, properties( "x", cldr ) ), "-03" );
	assert.equal( format( date, properties( "xx", cldr ) ), "-0300" );
	assert.equal( format( date, properties( "xxx", cldr ) ), "-03:00" );
	assert.equal( format( date, properties( "xxxx", cldr ) ), "-0300" );
	assert.equal( format( date, properties( "xxxxx", cldr ) ), "-03:00" );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// date = new FakeDate( -7.883 );
	// assert.equal( format( date, properties( "x", cldr ) ), "-0752" );
	// assert.equal( format( date, properties( "xx", cldr ) ), "-0752" );
	// assert.equal( format( date, properties( "xxx", cldr ) ), "-07:52" );
	// assert.equal( format( date, properties( "xxxx", cldr ) ), "-075258" );
	// assert.equal( format( date, properties( "xxxxx", cldr ) ), "-07:52:58" );

	date = new FakeDate( 5.5 );

	// TODO (see https://github.com/jquery/globalize/issues/339)
	// assert.equal( format( date, properties( "x", cldr ) ), "+0530" );
	assert.equal( format( date, properties( "xx", cldr ) ), "+0530" );
	assert.equal( format( date, properties( "xxx", cldr ) ), "+05:30" );
	assert.equal( format( date, properties( "xxxx", cldr ) ), "+0530" );
	assert.equal( format( date, properties( "xxxxx", cldr ) ), "+05:30" );

	date = new FakeDate( 11 );
	assert.equal( format( date, properties( "x", cldr ) ), "+11" );
	assert.equal( format( date, properties( "xx", cldr ) ), "+1100" );
	assert.equal( format( date, properties( "xxx", cldr ) ), "+11:00" );
	assert.equal( format( date, properties( "xxxx", cldr ) ), "+1100" );
	assert.equal( format( date, properties( "xxxxx", cldr ) ), "+11:00" );
});

/**
 *  Literal
 */

QUnit.test( "should format literal (')", function( assert ) {
	assert.equal( format( date1, properties( "yyyy.MM.dd G 'at' HH:mm:ss", cldr ) ),
		"1982.01.02 AD at 09:05:59" );
	assert.equal( format( date1, properties( "hh 'o''clock' a", cldr ) ), "09 o'clock AM" );
});

});
