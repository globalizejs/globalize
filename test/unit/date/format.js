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

	this.equal( format( date, numberFormatters, properties ), expected );
};

QUnit.module( "Date Format" );

/**
 *  Era
 */

QUnit.test( "should format era (G|GG|GGG)", function( assert ) {
	assert.dateFormat( date1, "G", cldr, "AD" );
	assert.dateFormat( year0, "G", cldr, "AD" );
	assert.dateFormat( yearBc, "G", cldr, "BC" );
	assert.dateFormat( date1, "GG", cldr, "AD" );
	assert.dateFormat( year0, "GG", cldr, "AD" );
	assert.dateFormat( yearBc, "GG", cldr, "BC" );
	assert.dateFormat( date1, "GGG", cldr, "AD" );
	assert.dateFormat( year0, "GGG", cldr, "AD" );
	assert.dateFormat( yearBc, "GGG", cldr, "BC" );
});

QUnit.test( "should format era (GGGG)", function( assert ) {
	assert.dateFormat( date1, "GGGG", cldr, "Anno Domini" );
	assert.dateFormat( year0, "GGGG", cldr, "Anno Domini" );
	assert.dateFormat( yearBc, "GGGG", cldr, "Before Christ" );
});

QUnit.test( "should format era (GGGGG)", function( assert ) {
	assert.dateFormat( date1, "GGGGG", cldr, "A" );
	assert.dateFormat( year0, "GGGGG", cldr, "A" );
	assert.dateFormat( yearBc, "GGGGG", cldr, "B" );
});

/**
 *  Year
 */

QUnit.test( "should format year (y) with no padding", function( assert ) {
	assert.dateFormat( date2, "y", cldr, "2010" );
	assert.dateFormat( date1, "y", cldr, "1982" );
	assert.dateFormat( year0, "y", cldr, "0" );
});

QUnit.test( "should format year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date2, "yy", cldr, "10" );
	assert.dateFormat( date1, "yy", cldr, "82" );
	assert.dateFormat( year0, "yy", cldr, "00" );
});

QUnit.test( "should format year (yyy+) with padding", function( assert ) {
	assert.dateFormat( date1, "yyy", cldr, "1982" );
	assert.dateFormat( date2, "yyy", cldr, "2010" );
	assert.dateFormat( year0, "yyyy", cldr, "0000" );
	assert.dateFormat( date1, "yyyyy", cldr, "01982" );
	assert.dateFormat( date2, "yyyyy", cldr, "02010" );
});

QUnit.test( "should format year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.dateFormat( date3, "Y", cldr, "1982" );
	assert.dateFormat( date4, "Y", cldr, "1994" );
});

QUnit.test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.dateFormat( date3, "YY", cldr, "82" );
	assert.dateFormat( date4, "YY", cldr, "94" );
});

QUnit.test( "should format year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.dateFormat( date3, "YYY", cldr, "1982" );
	assert.dateFormat( date4, "YYY", cldr, "1994" );
	assert.dateFormat( date3, "YYYYY", cldr, "01982" );
	assert.dateFormat( date4, "YYYYY", cldr, "01994" );
});

/**
 *  Quarter
 */

QUnit.test( "should format quarter (Q|q) with no padding", function( assert ) {
	assert.dateFormat( date1, "Q", cldr, "1" );
	assert.dateFormat( date2, "Q", cldr, "3" );
	assert.dateFormat( date1, "q", cldr, "1" );
	assert.dateFormat( date2, "q", cldr, "3" );
});

QUnit.test( "should format quarter (QQ|qq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQ", cldr, "01" );
	assert.dateFormat( date2, "QQ", cldr, "03" );
	assert.dateFormat( date1, "qq", cldr, "01" );
	assert.dateFormat( date2, "qq", cldr, "03" );
});

QUnit.test( "should format quarter (QQQ|qqq)", function( assert ) {
	assert.dateFormat( date1, "QQQ", cldr, "Q1" );
	assert.dateFormat( date2, "QQQ", cldr, "Q3" );
	assert.dateFormat( date1, "qqq", cldr, "Q1" );
	assert.dateFormat( date2, "qqq", cldr, "Q3" );
});

QUnit.test( "should format quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.dateFormat( date1, "QQQQ", cldr, "1st quarter" );
	assert.dateFormat( date2, "QQQQ", cldr, "3rd quarter" );
	assert.dateFormat( date1, "qqqq", cldr, "1st quarter" );
	assert.dateFormat( date2, "qqqq", cldr, "3rd quarter" );
});

/**
 *  Month
 */

QUnit.test( "should format month (M|L) with no padding", function( assert ) {
	assert.dateFormat( date1, "M", cldr, "1" );
	assert.dateFormat( date2, "M", cldr, "9" );
	assert.dateFormat( date1, "L", cldr, "1" );
	assert.dateFormat( date2, "L", cldr, "9" );
});

QUnit.test( "should format month (MM|LL) with padding", function( assert ) {
	assert.dateFormat( date1, "MM", cldr, "01" );
	assert.dateFormat( date2, "MM", cldr, "09" );
	assert.dateFormat( date1, "LL", cldr, "01" );
	assert.dateFormat( date2, "LL", cldr, "09" );
});

QUnit.test( "should format month (MMM|LLL)", function( assert ) {
	assert.dateFormat( date1, "MMM", cldr, "Jan" );
	assert.dateFormat( date2, "MMM", cldr, "Sep" );
	assert.dateFormat( date1, "LLL", cldr, "Jan" );
	assert.dateFormat( date2, "LLL", cldr, "Sep" );
});

QUnit.test( "should format month (MMMM|LLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMM", cldr, "January" );
	assert.dateFormat( date2, "MMMM", cldr, "September" );
	assert.dateFormat( date1, "LLLL", cldr, "January" );
	assert.dateFormat( date2, "LLLL", cldr, "September" );
});

QUnit.test( "should format month (MMMMM|LLLLL)", function( assert ) {
	assert.dateFormat( date1, "MMMMM", cldr, "J" );
	assert.dateFormat( date2, "MMMMM", cldr, "S" );
	assert.dateFormat( date1, "LLLLL", cldr, "J" );
	assert.dateFormat( date2, "LLLLL", cldr, "S" );
});

/**
 *  Week
 */

QUnit.test( "should format week of year (w) with no padding", function( assert ) {
	assert.dateFormat( date1, "w", cldr, "1" );
	assert.dateFormat( date2, "w", cldr, "38" );
});

QUnit.test( "should format week of year (ww) with padding", function( assert ) {
	assert.dateFormat( date1, "ww", cldr, "01" );
	assert.dateFormat( date2, "ww", cldr, "38" );
});

QUnit.test( "should format week of month (W)", function( assert ) {
	assert.dateFormat( date1, "W", cldr, "1" );
	assert.dateFormat( date2, "W", cldr, "3" );
	assert.dateFormat( date3, "W", cldr, "5" );
});

/**
 *  Day
 */

QUnit.test( "should format day (d) with no padding", function( assert ) {
	assert.dateFormat( date1, "d", cldr, "2" );
	assert.dateFormat( date2, "d", cldr, "15" );
});

QUnit.test( "should format day (dd) with padding", function( assert ) {
	assert.dateFormat( date1, "dd", cldr, "02" );
	assert.dateFormat( date2, "dd", cldr, "15" );
});

QUnit.test( "should format day of year (D) with no padding", function( assert ) {
	assert.dateFormat( date1, "D", cldr, "2" );
	assert.dateFormat( date2, "D", cldr, "258" );
});

QUnit.test( "should format day of year (DD|DDD) with padding", function( assert ) {
	assert.dateFormat( date1, "DD", cldr, "02" );
	assert.dateFormat( date1, "DDD", cldr, "002" );
	assert.dateFormat( date2, "DD", cldr, "258" );
});

QUnit.test( "should format day of week in month (F)", function( assert ) {
	assert.dateFormat( date1, "F", cldr, "1" );
	assert.dateFormat( date2, "F", cldr, "3" );
});

/**
 *  Week day
 */

QUnit.test( "should format local day of week (e|c) with no padding", function( assert ) {
	assert.dateFormat( date1, "e", cldr, "7" );
	assert.dateFormat( date2, "e", cldr, "4" );
	assert.dateFormat( date1, "c", cldr, "7" );
	assert.dateFormat( date2, "c", cldr, "4" );
});

QUnit.test( "should format local day of week (ee|cc) with padding", function( assert ) {
	assert.dateFormat( date1, "ee", cldr, "07" );
	assert.dateFormat( date2, "ee", cldr, "04" );
	assert.dateFormat( date1, "cc", cldr, "07" );
	assert.dateFormat( date2, "cc", cldr, "04" );
});

QUnit.test( "should format local day of week (E|EE|EEE|eee|ccc)", function( assert ) {
	assert.dateFormat( date1, "E", cldr, "Sat" );
	assert.dateFormat( date2, "E", cldr, "Wed" );
	assert.dateFormat( date1, "EE", cldr, "Sat" );
	assert.dateFormat( date2, "EE", cldr, "Wed" );
	assert.dateFormat( date1, "EEE", cldr, "Sat" );
	assert.dateFormat( date2, "EEE", cldr, "Wed" );
	assert.dateFormat( date1, "eee", cldr, "Sat" );
	assert.dateFormat( date2, "eee", cldr, "Wed" );
	assert.dateFormat( date1, "ccc", cldr, "Sat" );
	assert.dateFormat( date2, "ccc", cldr, "Wed" );
});

QUnit.test( "should format local day of week (EEEE|eeee|cccc)", function( assert ) {
	assert.dateFormat( date1, "EEEE", cldr, "Saturday" );
	assert.dateFormat( date2, "EEEE", cldr, "Wednesday" );
	assert.dateFormat( date1, "eeee", cldr, "Saturday" );
	assert.dateFormat( date2, "eeee", cldr, "Wednesday" );
	assert.dateFormat( date1, "cccc", cldr, "Saturday" );
	assert.dateFormat( date2, "cccc", cldr, "Wednesday" );
});

QUnit.test( "should format local day of week (EEEEE|eeeee|ccccc)", function( assert ) {
	assert.dateFormat( date1, "EEEEE", cldr, "S" );
	assert.dateFormat( date2, "EEEEE", cldr, "W" );
	assert.dateFormat( date1, "eeeee", cldr, "S" );
	assert.dateFormat( date2, "eeeee", cldr, "W" );
	assert.dateFormat( date1, "ccccc", cldr, "S" );
	assert.dateFormat( date2, "ccccc", cldr, "W" );
});

QUnit.test( "should format local day of week (EEEEEE|eeeeee|cccccc)", function( assert ) {
	assert.dateFormat( date1, "EEEEEE", cldr, "Sa" );
	assert.dateFormat( date2, "EEEEEE", cldr, "We" );
	assert.dateFormat( date1, "eeeeee", cldr, "Sa" );
	assert.dateFormat( date2, "eeeeee", cldr, "We" );
	assert.dateFormat( date1, "cccccc", cldr, "Sa" );
	assert.dateFormat( date2, "cccccc", cldr, "We" );
});

/**
 *  Period
 */

QUnit.test( "should format period (a)", function( assert ) {
	assert.dateFormat( date1, "a", cldr, "AM" );
	assert.dateFormat( date2, "a", cldr, "PM" );
});

/**
 *  Hour
 */

QUnit.test( "should format hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assert.dateFormat( date1, "h", cldr, "9" );
	assert.dateFormat( date2, "h", cldr, "5" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "h", cldr, "12" );
});

QUnit.test( "should format hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	assert.dateFormat( date1, "hh", cldr, "09" );
	assert.dateFormat( date2, "hh", cldr, "05" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "hh", cldr, "12" );
});

QUnit.test( "should format hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assert.dateFormat( date1, "H", cldr, "9" );
	assert.dateFormat( date2, "H", cldr, "17" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "H", cldr, "0" );
});

QUnit.test( "should format hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	assert.dateFormat( date1, "HH", cldr, "09" );
	assert.dateFormat( date2, "HH", cldr, "17" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "HH", cldr, "00" );
});

QUnit.test( "should format hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assert.dateFormat( date1, "K", cldr, "9" );
	assert.dateFormat( date2, "K", cldr, "5" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "K", cldr, "0" );
});

QUnit.test( "should format hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	assert.dateFormat( date1, "KK", cldr, "09" );
	assert.dateFormat( date2, "KK", cldr, "05" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "KK", cldr, "00" );
});

QUnit.test( "should format hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assert.dateFormat( date1, "k", cldr, "9" );
	assert.dateFormat( date2, "k", cldr, "17" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "k", cldr, "24" );
});

QUnit.test( "should format hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	assert.dateFormat( date1, "kk", cldr, "09" );
	assert.dateFormat( date2, "kk", cldr, "17" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "kk", cldr, "24" );
});

QUnit.test( "should format hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	assert.dateFormat( date2, "j", cldr, "5" );
	assert.dateFormat( date2, "j", new Cldr( "pt-BR" ), "17" );
	assert.dateFormat( date2, "j", new Cldr( "de" ), "17" );
	assert.dateFormat( date2, "j", new Cldr( "en-IN" ), "5" );
	assert.dateFormat( date2, "j", new Cldr( "en-GB" ), "17" );
	assert.dateFormat( date2, "j", new Cldr( "ru" ), "17" );
});

QUnit.test( "should format hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	assert.dateFormat( date1, "jj", cldr, "09" );
	assert.dateFormat( date2, "jj", cldr, "05" );
	assert.dateFormat( new Date( 0, 0, 0, 0 ), "jj", cldr, "12" );
});

/**
 *  Minute
 */

QUnit.test( "should format minute (m) with no padding", function( assert ) {
	assert.dateFormat( date1, "m", cldr, "5" );
	assert.dateFormat( date2, "m", cldr, "35" );
});

QUnit.test( "should format minute (mm) with padding", function( assert ) {
	assert.dateFormat( date1, "mm", cldr, "05" );
	assert.dateFormat( date2, "mm", cldr, "35" );
});

/**
 *  Second
 */

QUnit.test( "should format second (s) with no padding", function( assert ) {
	assert.dateFormat( date1, "s", cldr, "59" );
	assert.dateFormat( date2, "s", cldr, "7" );
});

QUnit.test( "should format second (ss) with padding", function( assert ) {
	assert.dateFormat( date1, "ss", cldr, "59" );
	assert.dateFormat( date2, "ss", cldr, "07" );
});

QUnit.test( "should format various milliseconds (S+)", function( assert ) {
	assert.dateFormat( date2, "S", cldr, "4" );
	assert.dateFormat( date2, "SS", cldr, "37" );
	assert.dateFormat( date2, "SSS", cldr, "369" );
	assert.dateFormat( date2, "SSSS", cldr, "3690" );
	assert.dateFormat( date2, "SSSSS", cldr, "36900" );
});

QUnit.test( "should format various milliseconds (A+)", function( assert ) {
	assert.dateFormat( date2, "A", cldr, "633074" );
	assert.dateFormat( date2, "AA", cldr, "6330737" );
	assert.dateFormat( date2, "AAA", cldr, "63307369" );
	assert.dateFormat( date2, "AAAA", cldr, "633073690" );
	assert.dateFormat( date2, "AAAAA", cldr, "6330736900" );
});

/**
 *  Zone
 */

QUnit.test( "should format timezone (z)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "z", cldr, "GMT" );
	assert.dateFormat( date, "zz", cldr, "GMT" );
	assert.dateFormat( date, "zzz", cldr, "GMT" );
	assert.dateFormat( date, "zzzz", cldr, "GMT" );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "z", cldr, "GMT-3" );
	assert.dateFormat( date, "zz", cldr, "GMT-3" );
	assert.dateFormat( date, "zzz", cldr, "GMT-3" );
	assert.dateFormat( date, "zzzz", cldr, "GMT-03:00" );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "z", cldr, "GMT+11" );
	assert.dateFormat( date, "zz", cldr, "GMT+11" );
	assert.dateFormat( date, "zzz", cldr, "GMT+11" );
	assert.dateFormat( date, "zzzz", cldr, "GMT+11:00" );
});

QUnit.test( "should format timezone (Z)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "Z", cldr, "+0000" );
	assert.dateFormat( date, "ZZ", cldr, "+0000" );
	assert.dateFormat( date, "ZZZ", cldr, "+0000" );
	assert.dateFormat( date, "ZZZZ", cldr, "GMT" );
	assert.dateFormat( date, "ZZZZZ", cldr, "Z" );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "Z", cldr, "-0300" );
	assert.dateFormat( date, "ZZ", cldr, "-0300" );
	assert.dateFormat( date, "ZZZ", cldr, "-0300" );
	assert.dateFormat( date, "ZZZZ", cldr, "GMT-03:00" );
	assert.dateFormat( date, "ZZZZZ", cldr, "-03:00" );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "Z", cldr, "+1100" );
	assert.dateFormat( date, "ZZ", cldr, "+1100" );
	assert.dateFormat( date, "ZZZ", cldr, "+1100" );
	assert.dateFormat( date, "ZZZZ", cldr, "GMT+11:00" );
	assert.dateFormat( date, "ZZZZZ", cldr, "+11:00" );
});

QUnit.test( "should format timezone (O)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "O", cldr, "GMT" );
	assert.dateFormat( date, "OOOO", cldr, "GMT" );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "O", cldr, "GMT-3" );
	assert.dateFormat( date, "OOOO", cldr, "GMT-03:00" );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "O", cldr, "GMT+11" );
	assert.dateFormat( date, "OOOO", cldr, "GMT+11:00" );
});

QUnit.test( "should format timezone (X)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "X", cldr, "Z" );
	assert.dateFormat( date, "XX", cldr, "Z" );
	assert.dateFormat( date, "XXX", cldr, "Z" );
	assert.dateFormat( date, "XXXX", cldr, "Z" );
	assert.dateFormat( date, "XXXXX", cldr, "Z" );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "X", cldr, "-03" );
	assert.dateFormat( date, "XX", cldr, "-0300" );
	assert.dateFormat( date, "XXX", cldr, "-03:00" );
	assert.dateFormat( date, "XXXX", cldr, "-0300" );
	assert.dateFormat( date, "XXXXX", cldr, "-03:00" );

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
	assert.dateFormat( date, "XX", cldr, "+0530" );
	assert.dateFormat( date, "XXX", cldr, "+05:30" );
	assert.dateFormat( date, "XXXX", cldr, "+0530" );
	assert.dateFormat( date, "XXXXX", cldr, "+05:30" );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "X", cldr, "+11" );
	assert.dateFormat( date, "XX", cldr, "+1100" );
	assert.dateFormat( date, "XXX", cldr, "+11:00" );
	assert.dateFormat( date, "XXXX", cldr, "+1100" );
	assert.dateFormat( date, "XXXXX", cldr, "+11:00" );
});

QUnit.test( "should format timezone (x)", function( assert ) {
	var date = new FakeDate( 0 );
	assert.dateFormat( date, "x", cldr, "+00" );
	assert.dateFormat( date, "xx", cldr, "+0000" );
	assert.dateFormat( date, "xxx", cldr, "+00:00" );
	assert.dateFormat( date, "xxxx", cldr, "+0000" );
	assert.dateFormat( date, "xxxxx", cldr, "+00:00" );

	date = new FakeDate( -3 );
	assert.dateFormat( date, "x", cldr, "-03" );
	assert.dateFormat( date, "xx", cldr, "-0300" );
	assert.dateFormat( date, "xxx", cldr, "-03:00" );
	assert.dateFormat( date, "xxxx", cldr, "-0300" );
	assert.dateFormat( date, "xxxxx", cldr, "-03:00" );

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
	assert.dateFormat( date, "xx", cldr, "+0530" );
	assert.dateFormat( date, "xxx", cldr, "+05:30" );
	assert.dateFormat( date, "xxxx", cldr, "+0530" );
	assert.dateFormat( date, "xxxxx", cldr, "+05:30" );

	date = new FakeDate( 11 );
	assert.dateFormat( date, "x", cldr, "+11" );
	assert.dateFormat( date, "xx", cldr, "+1100" );
	assert.dateFormat( date, "xxx", cldr, "+11:00" );
	assert.dateFormat( date, "xxxx", cldr, "+1100" );
	assert.dateFormat( date, "xxxxx", cldr, "+11:00" );
});

/**
 *  Literal
 */

QUnit.test( "should format literal (')", function( assert ) {
	assert.dateFormat( date1, "yyyy.MM.dd G 'at' HH:mm:ss", cldr, "1982.01.02 AD at 09:05:59" );
	assert.dateFormat( date1, "hh 'o''clock' a", cldr, "09 o'clock AM" );
});

});
