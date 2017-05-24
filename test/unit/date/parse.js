define([
	"cldr",
	"src/date/parse",
	"src/date/parse-properties",
	"src/date/start-of",
	"src/date/tokenizer",
	"src/date/tokenizer-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/en-GB/ca-gregorian.json",
	"json!cldr-data/main/en-GB/numbers.json",
	"json!cldr-data/main/en-GB/timeZoneNames.json",
	"json!cldr-data/main/fr/ca-gregorian.json",
	"json!cldr-data/main/fr/numbers.json",
	"json!cldr-data/main/fr/timeZoneNames.json",
	"json!cldr-data/main/tr/ca-gregorian.json",
	"json!cldr-data/main/tr/numbers.json",
	"json!cldr-data/main/zh/ca-gregorian.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!iana-tz-data.json",
	"../../util",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, parse, parseProperties, startOf, tokenizer, dateTokenizerProperties,
	enCaGregorian, enNumbers, enTimeZoneNames, enGbCaGregorian, enGbNumbers, enGbTimeZoneNames,
	frCaGregorian, frNumbers, frTimeZoneNames, trCaGregorian, trNumbers, zhCaGregorian, zhNumbers,
	likelySubtags, timeData, weekData, ianaTimezoneData, util ) {

var cldr, date1, date2, fr, midnight, zh;

QUnit.assert.dateParse = function( stringDate, pattern, cldr, expected ) {
	this.dateParseWithTimezone( stringDate, pattern, undefined, cldr, expected );
};

QUnit.assert.dateParseWithTimezone = function( stringDate, pattern, timeZone, cldr, expected ) {
	var tokenizerProperties, tokens;

	tokenizerProperties = dateTokenizerProperties( pattern, cldr, timeZone );
	tokens = tokenizer( stringDate, simpleNumberParser, tokenizerProperties );

	this.deepEqual( parse( stringDate, tokens, parseProperties( cldr, timeZone ) ), expected );
};

QUnit.assert.timezoneParse = function( stringDate, pattern, cldr, timezoneOffset ) {
	var parsedTimezoneOffset, parsedDate, tokenizerProperties, tokens,
		testPattern = "HH:mm " + pattern,
		testStringDate = "00:00 " + stringDate;

	tokenizerProperties = dateTokenizerProperties( testPattern, cldr );
	tokens = tokenizer( testStringDate, simpleNumberParser, tokenizerProperties );
	parsedDate = parse( testStringDate, tokens, parseProperties( cldr ) );
	parsedTimezoneOffset = ( parsedDate - midnight ) / 1000 / 60 + midnight.getTimezoneOffset();

	this.equal( parsedTimezoneOffset, timezoneOffset, "stringDate `" + stringDate +
		"` pattern `" + pattern + "`" );
};

// Simple number parser for this test purposes.
function simpleNumberParser( value ) {
	return +value;
}

Cldr.load(
	enCaGregorian,
	enNumbers,
	enTimeZoneNames,
	enGbCaGregorian,
	enGbNumbers,
	enGbTimeZoneNames,
	frCaGregorian,
	frNumbers,
	frTimeZoneNames,
	trCaGregorian,
	trNumbers,
	zhCaGregorian,
	zhNumbers,
	likelySubtags,
	timeData,
	weekData
);

// Needed for globalizeDate.
Cldr.load({
	"globalize-iana": ianaTimezoneData
});

cldr = new Cldr( "en" );
fr = new Cldr( "fr" );
zh = new Cldr( "zh" );

midnight = new Date();
midnight = startOf( midnight, "day" );

QUnit.module( "Date Parse" );

/**
 *  Era
 */

QUnit.test( "should parse era (G|GG|GGG)", function( assert ) {
	date1 = new Date( 0, 0 );
	date2 = new Date( 0, 0 );
	date1.setFullYear( 4 );
	date2.setFullYear( -4 );
	assert.dateParse( "AD 4", "G y", cldr, date1 );
	assert.dateParse( "BC 5", "G y", cldr, date2 );
	assert.dateParse( "AD 4", "GG y", cldr, date1 );
	assert.dateParse( "BC 5", "GG y", cldr, date2 );
	assert.dateParse( "AD 4", "GGG y", cldr, date1 );
	assert.dateParse( "BC 5", "GGG y", cldr, date2 );
});

QUnit.test( "should parse era (GGGG)", function( assert ) {
	date1 = new Date( 0, 0 );
	date2 = new Date( 0, 0 );
	date1.setFullYear( 4 );
	date2.setFullYear( -4 );
	assert.dateParse( "Anno Domini 4", "GGGG y", cldr, date1 );
	assert.dateParse( "Before Christ 5", "GGGG y", cldr, date2 );
});

QUnit.test( "should parse era (GGGGG)", function( assert ) {
	date1 = new Date( 0, 0 );
	date2 = new Date( 0, 0 );
	date1.setFullYear( 4 );
	date2.setFullYear( -4 );
	assert.dateParse( "A 4", "GGGGG y", cldr, date1 );
	assert.dateParse( "B 5", "GGGGG y", cldr, date2 );
});

/**
 *  Year
 */

QUnit.test( "should parse year (y) with no padding", function( assert ) {
	assert.dateParse( "1982", "y", cldr, new Date( 1982, 0 ) );

	date1 = new Date(0, 0);
	date1.setFullYear(2);
	assert.dateParse( "2", "y", cldr, date1 );
	assert.dateParse( "02", "y", cldr, date1 );
});

QUnit.test( "should parse year (yy) with padding, and limit 2 digits", function( assert ) {
	// This may change in the future, eg. 82 could eventually be 2082, same for the below years.
	assert.dateParse( "82", "yy", cldr, new Date( 1982, 0 ) );
	assert.dateParse( "9", "yy", cldr, new Date( 2009, 0 ) );
	assert.dateParse( "09", "yy", cldr, new Date( 2009, 0 ) );
});

QUnit.test( "should parse year (yyy+) with padding", function( assert ) {
	assert.dateParse( "1982", "yyy", cldr, new Date( 1982, 0 ) );
	assert.dateParse( "82", "yyy", cldr, null );

	assert.dateParse( "01982", "yyyyy", cldr, new Date( 1982, 0 ) );
	assert.dateParse( "1982", "yyyyy", cldr, null );
});

/**
 *  Month
 */

QUnit.test( "should parse month (M|L) with no padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assert.dateParse( "1", "M", cldr, date1 );
	assert.dateParse( "1", "L", cldr, date1 );
});

QUnit.test( "should parse month (MM|LL) with padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assert.dateParse( "1", "MM", cldr, date1 );
	assert.dateParse( "01", "MM", cldr, date1 );
	assert.dateParse( "1", "LL", cldr, date1 );
	assert.dateParse( "01", "LL", cldr, date1 );
});

QUnit.test( "should parse month (MMM|LLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assert.dateParse( "Jan", "MMM", cldr, date1 );
	assert.dateParse( "Jan", "LLL", cldr, date1 );
});

QUnit.test( "should parse month (MMMM|LLLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assert.dateParse( "January", "MMMM", cldr, date1 );
	assert.dateParse( "January", "LLLL", cldr, date1 );
});

QUnit.test( "should parse month (MMMMM|LLLLL)", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1 = startOf( date1, "month" );
	assert.dateParse( "J", "MMMMM", cldr, date1 );
	assert.dateParse( "J", "LLLLL", cldr, date1 );
});

QUnit.test( "should parse February correctly in leap year", function( assert ) {
	var OrigDate;

	/* globals Date:true */
	// Use a leap year and a day of month greater than 28
	OrigDate = Date;
	Date = util.FakeDate;
	util.FakeDate.today = new Date( 2016, 0, 29 );

	date1 = new Date();
	date1.setMonth( 1 );
	date1 = startOf( date1, "month" );
	date1.setYear( 2015 );
	assert.dateParse( "2/2015", "M/y", cldr, date1 );
	assert.dateParse( "2/2015", "L/y", cldr, date1 );

	Date = OrigDate;
});

/**
 *  Day
 */

QUnit.test( "should parse day (d) with no padding", function( assert ) {
	var OrigDate;

	date1 = new Date();
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assert.dateParse( "2", "d", cldr, date1 );

	/* globals Date:true */
	// Test #323 - Day parsing must use the correct day range given its corresponding month/year.
	OrigDate = Date;
	Date = util.FakeDate;

	date1 = new Date( 2014, 1, 28 );
	date1 = startOf( date1, "day" );
	util.FakeDate.today = new Date( 2014, 1 );
	assert.dateParse( "29", "d", cldr, null );
	assert.dateParse( "28", "d", cldr, date1 );

	date2 = new Date( 2016, 1, 29 );
	date2 = startOf( date2, "day" );
	util.FakeDate.today = new Date( 2016, 1 );
	assert.dateParse( "30", "d", cldr, null );
	assert.dateParse( "29", "d", cldr, date2 );
	Date = OrigDate;
});

QUnit.test( "should parse day (dd) with padding", function( assert ) {
	date1 = new Date();
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assert.dateParse( "2", "dd", cldr, date1 );
	assert.dateParse( "02", "dd", cldr, date1 );
});

QUnit.test( "should parse day of year (D) with no padding", function( assert ) {
	var OrigDate;

	date1 = new Date();
	date1.setMonth( 0 );
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assert.dateParse( "2", "D", cldr, date1 );

	/* globals Date:true */
	// Test #323 - Day of year parsing must use the correct day range given leap year into account.
	OrigDate = Date;
	Date = util.FakeDate;

	util.FakeDate.today = new Date( 2014, 1 );
	assert.dateParse( "366", "D", cldr, null );

	// date1 = last day of 2016
	date1 = new Date( 2017, 0, 0 );
	util.FakeDate.today = new Date( 2016, 1 );
	assert.dateParse( "366", "D", cldr, date1 );

	Date = OrigDate;
});

QUnit.test( "should parse day of year (DD|DDD) with padding", function( assert ) {
	date1 = new Date();
	date1.setMonth( 0 );
	date1.setDate( 2 );
	date1 = startOf( date1, "day" );
	assert.dateParse( "02", "DD", cldr, date1 );
	assert.dateParse( "002", "DDD", cldr, date1 );
});

/**
 *  Week day
 */

QUnit.test( "should format local day of week (e|c) with no padding", function( assert ) {
	date1 = new Date( 1982, 0, 2 );
	date2 = new Date( 2010, 8, 15 );
	assert.dateParse( "1/2/82 7" , "M/d/yy e", cldr, date1 );
	assert.dateParse( "9/15/10 4" , "M/d/yy e", cldr, date2 );
	assert.dateParse( "1/2/82 7" , "M/d/yy c", cldr, date1 );
	assert.dateParse( "9/15/10 4" , "M/d/yy c", cldr, date2 );
});

QUnit.test( "should format local day of week (ee|cc) with padding", function( assert ) {
	date1 = new Date( 1982, 0, 2 );
	date2 = new Date( 2010, 8, 15 );
	assert.dateParse( "1/2/82 07" , "M/d/yy ee", cldr, date1 );
	assert.dateParse( "9/15/10 04" , "M/d/yy ee", cldr, date2 );
	assert.dateParse( "1/2/82 07" , "M/d/yy cc", cldr, date1 );
	assert.dateParse( "9/15/10 04" , "M/d/yy cc", cldr, date2 );
});

QUnit.test( "should format local day of week (E|EE|EEE|eee|ccc)", function( assert ) {
	date1 = new Date( 1982, 0, 2 );
	date2 = new Date( 2010, 8, 15 );
	assert.dateParse( "1/2/82 Sat" , "M/d/yy E", cldr, date1 );
	assert.dateParse( "9/15/10 Wed" , "M/d/yy E", cldr, date2 );
	assert.dateParse( "1/2/82 Sat" , "M/d/yy EE", cldr, date1 );
	assert.dateParse( "9/15/10 Wed" , "M/d/yy EE", cldr, date2 );
	assert.dateParse( "1/2/82 Sat" , "M/d/yy EEE", cldr, date1 );
	assert.dateParse( "9/15/10 Wed" , "M/d/yy EEE", cldr, date2 );
	assert.dateParse( "1/2/82 Sat" , "M/d/yy eee", cldr, date1 );
	assert.dateParse( "9/15/10 Wed" , "M/d/yy eee", cldr, date2 );
	assert.dateParse( "1/2/82 Sat" , "M/d/yy ccc", cldr, date1 );
	assert.dateParse( "9/15/10 Wed" , "M/d/yy ccc", cldr, date2 );
});

QUnit.test( "should format local day of week (EEEE|eeee|cccc)", function( assert ) {
	var tr;
	date1 = new Date( 1982, 0, 2 );
	date2 = new Date( 2010, 8, 15 );
	assert.dateParse( "1/2/82 Saturday" , "M/d/yy EEEE", cldr, date1 );
	assert.dateParse( "9/15/10 Wednesday" , "M/d/yy EEEE", cldr, date2 );
	assert.dateParse( "1/2/82 Saturday" , "M/d/yy eeee", cldr, date1 );
	assert.dateParse( "9/15/10 Wednesday" , "M/d/yy eeee", cldr, date2 );
	assert.dateParse( "1/2/82 Saturday" , "M/d/yy cccc", cldr, date1 );
	assert.dateParse( "9/15/10 Wednesday" , "M/d/yy cccc", cldr, date2 );

	// Special test for #690 parseDate fails on Turkish full datetime with Monday or Saturday.
	tr = new Cldr( "tr" );
	assert.dateParse( "1/2/82 Cumartesi" , "M/d/yy EEEE", tr, date1 );
});

QUnit.test( "should format local day of week (EEEEE|eeeee|ccccc)", function( assert ) {
	date1 = new Date( 1982, 0, 2 );
	date2 = new Date( 2010, 8, 15 );
	assert.dateParse( "1/2/82 S" , "M/d/yy EEEEE", cldr, date1 );
	assert.dateParse( "9/15/10 W" , "M/d/yy EEEEE", cldr, date2 );
	assert.dateParse( "1/2/82 S" , "M/d/yy eeeee", cldr, date1 );
	assert.dateParse( "9/15/10 W" , "M/d/yy eeeee", cldr, date2 );
	assert.dateParse( "1/2/82 S" , "M/d/yy ccccc", cldr, date1 );
	assert.dateParse( "9/15/10 W" , "M/d/yy ccccc", cldr, date2 );
});

QUnit.test( "should format local day of week (EEEEEE|eeeeee|cccccc)", function( assert ) {
	date1 = new Date( 1982, 0, 2 );
	date2 = new Date( 2010, 8, 15 );
	assert.dateParse( "1/2/82 Sa" , "M/d/yy EEEEEE", cldr, date1 );
	assert.dateParse( "9/15/10 We" , "M/d/yy EEEEEE", cldr, date2 );
	assert.dateParse( "1/2/82 Sa" , "M/d/yy eeeeee", cldr, date1 );
	assert.dateParse( "9/15/10 We" , "M/d/yy eeeeee", cldr, date2 );
	assert.dateParse( "1/2/82 Sa" , "M/d/yy cccccc", cldr, date1 );
	assert.dateParse( "9/15/10 We" , "M/d/yy cccccc", cldr, date2 );
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
	assert.dateParse( "5 AM", "h a", cldr, date1 );
	assert.dateParse( "5 PM", "h a", cldr, date2 );
	assert.dateParse( "上午5", "ah", zh, date1 );
	assert.dateParse( "下午5", "ah", zh, date2 );
});

/**
 * Date composite
 */

QUnit.test( "should parse composite of date fields", function( assert ) {
	var OrigDate;

	// Test #612 - Incorrect parsing when days in today's month is bigger than
	// the parsing month.
	OrigDate = Date;
	Date = util.FakeDate;
	util.FakeDate.today = new Date( 2016, 11, 31 );
	assert.dateParse( "2/2/2015", "M/d/y", cldr, new Date( 2015, 1, 2 ) );
	Date = OrigDate;

	// Loose matching: ignore control characters.
	date1 = new Date( 2010, 8, 15 );
	assert.dateParse( "15/9/2010", "d\u200f/M\u200f/y", cldr, date1 );

	// Test #696 - Mix of numbering systems.
	assert.dateParse( "15/٧/2010", "d/M/y", cldr, null );
});

/**
 *  Hour
 */

QUnit.test( "should parse hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assert.dateParse( "1", "h", cldr, null, "12-hour time without period should return null" );
	assert.dateParse( "0 AM", "h a", cldr, null, "Out of range should return null" );
	assert.dateParse( "13 AM", "h a", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "9 AM", "h a", cldr, date1 );

	date1.setHours( 0 );
	assert.dateParse( "12 AM", "h a", cldr, date1 );

	date1.setHours( 1 );
	assert.dateParse( "1 AM", "h a", cldr, date1 );

	date1.setHours( 12 );
	assert.dateParse( "12 PM", "h a", cldr, date1 );

	date1.setHours( 13 );
	assert.dateParse( "1 PM", "h a", cldr, date1 );
});

QUnit.test( "should parse hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "9 AM", "hh a", cldr, date1 );
	assert.dateParse( "09 AM", "hh a", cldr, date1 );
});

QUnit.test( "should parse hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assert.dateParse( "24", "H", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 0 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "0", "H", cldr, date1 );

	date1.setHours( 1 );
	assert.dateParse( "1", "H", cldr, date1 );

	date1.setHours( 12 );
	assert.dateParse( "12", "H", cldr, date1 );

	date1.setHours( 16 );
	assert.dateParse( "16", "H", cldr, date1 );
});

QUnit.test( "should parse hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "9", "HH", cldr, date1 );
	assert.dateParse( "09", "HH", cldr, date1 );

	date1.setHours( 16 );
	assert.dateParse( "16", "HH", cldr, date1 );
});

QUnit.test( "should parse hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assert.dateParse( "1", "K", cldr, null, "12-hour time without period should return null" );
	assert.dateParse( "12 AM", "K a", cldr, null, "Out of range should return null" );
	assert.dateParse( "13 AM", "K a", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 0 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "0 AM", "K a", cldr, date1 );

	date1.setHours( 8 );
	assert.dateParse( "8 AM", "K a", cldr, date1 );

	date1.setHours( 12 );
	assert.dateParse( "0 PM", "K a", cldr, date1 );

	date1.setHours( 20 );
	assert.dateParse( "8 PM", "K a", cldr, date1 );
});

QUnit.test( "should parse hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 8 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "8 AM", "KK a", cldr, date1 );
	assert.dateParse( "08 AM", "KK a", cldr, date1 );
});

QUnit.test( "should parse hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assert.dateParse( "0", "k", cldr, null, "Out of range should return null" );

	date1 = new Date();
	date1.setHours( 0 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "24", "k", cldr, date1 );

	date1.setHours( 8 );
	assert.dateParse( "8", "k", cldr, date1 );

	date1.setHours( 12 );
	assert.dateParse( "12", "k", cldr, date1 );

	date1.setHours( 20 );
	assert.dateParse( "20", "k", cldr, date1 );
});

QUnit.test( "should parse hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 5 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "5", "kk", cldr, date1 );
	assert.dateParse( "05", "kk", cldr, date1 );

	date1.setHours( 17 );
	assert.dateParse( "17", "kk", cldr, date1 );
});

QUnit.test( "should parse hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "9 AM", "j a", cldr, date1 );
});

QUnit.test( "should parse hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	date1 = new Date();
	date1.setHours( 9 );
	date1 = startOf( date1, "hour" );
	assert.dateParse( "9 AM", "jj a", cldr, date1 );
	assert.dateParse( "09 AM", "jj a", cldr, date1 );
});

/**
 *  Minute
 */

QUnit.test( "should parse minute (m) with no padding", function( assert ) {
	date1 = new Date();
	date1.setMinutes( 5 );
	date1 = startOf( date1, "minute" );
	assert.dateParse( "5", "m", cldr, date1 );
});

QUnit.test( "should parse minute (mm) with padding", function( assert ) {
	date1 = new Date();
	date1.setMinutes( 5 );
	date1 = startOf( date1, "minute" );
	assert.dateParse( "5", "mm", cldr, date1 );
	assert.dateParse( "05", "mm", cldr, date1 );
});

/**
 *  Second
 */

QUnit.test( "should parse second (s) with no padding", function( assert ) {
	date1 = new Date();
	date1.setSeconds( 59 );
	date1 = startOf( date1, "second" );
	assert.dateParse( "59", "s", cldr, date1 );
});

QUnit.test( "should parse second (ss) with padding", function( assert ) {
	date1 = new Date();
	date1.setSeconds( 59 );
	date1 = startOf( date1, "second" );
	assert.dateParse( "59", "ss", cldr, date1 );

	date1.setSeconds( 9 );
	assert.dateParse( "9", "ss", cldr, date1 );
	assert.dateParse( "09", "ss", cldr, date1 );
});

QUnit.test( "should parse milliseconds (S+)", function( assert ) {
	date1 = new Date();
	date1.setSeconds( 0 );
	date1.setMilliseconds( 400 );
	assert.dateParse( "0 4", "s S", cldr, date1 );
	date1.setMilliseconds( 370 );
	assert.dateParse( "0 37", "s SS", cldr, date1 );
	date1.setMilliseconds( 369 );
	assert.dateParse( "0 369", "s SSS", cldr, date1 );
	assert.dateParse( "0 3690", "s SSSS", cldr, date1 );
	assert.dateParse( "0 36900", "s SSSSS", cldr, date1 );
});

QUnit.test( "should parse milliseconds in a day (A+)", function( assert ) {
	date1 = new Date();
	date1 = startOf( date1, "day" );
	date1.setMilliseconds( 63307400 );
	assert.dateParse( "633074", "A", cldr, date1 );
	date1 = startOf( date1, "day" );
	date1.setMilliseconds( 63307370 );
	assert.dateParse( "6330737", "AA", cldr, date1 );
	date1 = startOf( date1, "day" );
	date1.setMilliseconds( 63307369 );
	assert.dateParse( "63307369", "AAA", cldr, date1 );
	assert.dateParse( "633073690", "AAAA", cldr, date1 );
	assert.dateParse( "6330736900", "AAAAA", cldr, date1 );
});

/**
 *  Zone
 */

QUnit.test( "should parse timezone (z)", function( assert ) {
	var enGb = new Cldr( "en-GB" );

	[ "z", "zz", "zzz" ].forEach(function( z ) {
		assert.dateParseWithTimezone(
			"1/1/2017 12:00 AM PST",
			"M/d/y h:mm a " + z,
			"America/Los_Angeles",
			cldr,
			new Date( "2017-01-01T08:00:00.000Z" )
		);
		assert.dateParseWithTimezone(
			"1/1/2017 12:00 AM Foo Bar",
			"M/d/y h:mm a " + z,
			"America/Los_Angeles",
			cldr,
			null
		);
		assert.dateParseWithTimezone(
			"01/07/2017 00:00 BST",
			"dd/MM/y H:mm " + z,
			"Europe/London",
			enGb,
			new Date( "2017-06-30T23:00:00.000Z" )
		);
	});

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Pacific Standard Time",
		"M/d/y h:mm a zzzz",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Gulf Standard Time",
		"M/d/y h:mm a zzzz",
		"Asia/Dubai",
		cldr,
		new Date( "2016-12-31T20:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"01/07/2017 00:00 British Summer Time",
		"dd/MM/y H:mm zzzz",
		"Europe/London",
		enGb,
		new Date( "2017-06-30T23:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM India Standard Time",
		"M/d/y h:mm a zzzz",
		"Asia/Calcutta",
		cldr,
		new Date( "2016-12-31T18:30:00.000Z" )
	);

	// Fall through 'O' format.
	[ "z", "zz", "zzz", "zzzz" ].forEach(function( z ) {
		assert.timezoneParse( "GMT", z, cldr, 0 );
	});

	assert.timezoneParse( "GMT-3", "z", cldr, 180 );
	assert.timezoneParse( "GMT-3", "zz", cldr, 180 );
	assert.timezoneParse( "GMT-3", "zzz", cldr, 180 );
	assert.timezoneParse( "GMT-03:00", "zzzz", cldr, 180 );

	assert.timezoneParse( "GMT+11", "z", cldr, -660 );
	assert.timezoneParse( "GMT+11", "zz", cldr, -660 );
	assert.timezoneParse( "GMT+11", "zzz", cldr, -660 );
	assert.timezoneParse( "GMT+11:00", "zzzz", cldr, -660 );

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-8",
		"M/d/y h:mm a z",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-2",
		"M/d/y h:mm a z",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-8",
		"M/d/y h:mm a z",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-2",
		"M/d/y h:mm a z",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-8",
		"M/d/y h:mm a z",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-2",
		"M/d/y h:mm a z",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a zzzz",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a zzzz",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a zzzz",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a zzzz",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a zzzz",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a zzzz",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
});

QUnit.test( "should parse timezone (Z)", function( assert ) {
	assert.timezoneParse( "+0000", "Z", cldr, 0 );
	assert.timezoneParse( "+0000", "ZZ", cldr, 0 );
	assert.timezoneParse( "+0000", "ZZZ", cldr, 0 );
	assert.timezoneParse( "GMT", "ZZZZ", cldr, 0 );
	assert.timezoneParse( "Z", "ZZZZZ", cldr, 0 );

	assert.timezoneParse( "-0300", "Z", cldr, 180 );
	assert.timezoneParse( "-0300", "ZZ", cldr, 180 );
	assert.timezoneParse( "-0300", "ZZZ", cldr, 180 );
	assert.timezoneParse( "GMT-03:00", "ZZZZ" , cldr, 180 );
	assert.timezoneParse( "-03:00", "ZZZZZ", cldr, 180 );

	assert.timezoneParse( "+1100", "Z", cldr, -660 );
	assert.timezoneParse( "+1100", "ZZ", cldr, -660 );
	assert.timezoneParse( "+1100", "ZZZ", cldr, -660 );
	assert.timezoneParse( "GMT+11:00", "ZZZZ" , cldr, -660 );
	assert.timezoneParse( "+11:00", "ZZZZZ", cldr, -660 );
});

QUnit.test( "should parse timezone (O)", function( assert ) {
	assert.timezoneParse( "GMT", "O", cldr, 0 );
	assert.timezoneParse( "GMT", "OOOO", cldr, 0 );

	assert.timezoneParse( "GMT-3", "O", cldr, 180 );
	assert.timezoneParse( "GMT-03:00", "OOOO" , cldr, 180 );

	assert.timezoneParse( "GMT+11", "O", cldr, -660 );
	assert.timezoneParse( "GMT+11:00", "OOOO" , cldr, -660 );

	// Loose matching: normalize [:Dash:] category.
	assert.timezoneParse( "UTC-7", "O", fr, 420 );
	assert.timezoneParse( "UTC\u22127", "O", fr, 420 );
});

QUnit.test( "should parse timezone (v)", function( assert ) {
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM PT",
		"M/d/y h:mm a v",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM XX",
		"M/d/y h:mm a v",
		"America/Los_Angeles",
		cldr,
		null
	);
	assert.dateParse(
		"1/1/2017 12:00 AM XX",
		"M/d/y h:mm a v",
		cldr,
		null
	);

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Pacific Time",
		"M/d/y h:mm a vvvv",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Foo Bar",
		"M/d/y h:mm a v",
		"America/Los_Angeles",
		cldr,
		null
	);
	assert.dateParse(
		"1/1/2017 12:00 AM Foo Bar",
		"M/d/y h:mm a vvvv",
		cldr,
		null
	);

	// Use metazone.
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Brasilia Time",
		"M/d/y h:mm a vvvv",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);

	// Fall through 'VVVV' format.
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Sao Paulo Time",
		"M/d/y h:mm a v",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Foo City Time",
		"M/d/y h:mm a v",
		"Foo/Baz",
		cldr,
		new Date( "2017-01-01T00:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Foo City Time",
		"M/d/y h:mm a vvvv",
		"Foo/Baz",
		cldr,
		new Date( "2017-01-01T00:00:00.000Z" )
	);

	// Fall through 'O' and 'OOOO' formats.
	assert.dateParse(
		"1/1/2017 12:00 AM GMT-8",
		"M/d/y h:mm a v",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParse(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a vvvv",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-8",
		"M/d/y h:mm a v",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-2",
		"M/d/y h:mm a v",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-8",
		"M/d/y h:mm a v",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-2",
		"M/d/y h:mm a v",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-8",
		"M/d/y h:mm a v",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-2",
		"M/d/y h:mm a v",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a vvvv",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a vvvv",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a vvvv",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a vvvv",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a vvvv",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a vvvv",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
});

QUnit.test( "should parse timezone (V)", function( assert ) {
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM America/Los_Angeles",
		"M/d/y h:mm a VV",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Foo/Bar",
		"M/d/y h:mm a VV",
		"America/Los_Angeles",
		cldr,
		null
	);

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Los Angeles",
		"M/d/y h:mm a VVV",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Foo Bar",
		"M/d/y h:mm a VVV",
		"America/Los_Angeles",
		cldr,
		null
	);

	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Los Angeles Time",
		"M/d/y h:mm a VVVV",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Foo Bar",
		"M/d/y h:mm a VVVV",
		"America/Los_Angeles",
		cldr,
		null
	);

	// Fall through to 'VVV' format with "Unknown" exemplarCity.
	// "VVV" / "Foo/Bar" / "Unknown City"
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM Unknown City",
		"M/d/y h:mm a VVV",
		"Foo/Bar",
		cldr,
		new Date( "2017-01-01T00:00:00.000Z" )
	);

	// Fall through 'OOOO' format.
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a VVVV",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a VVVV",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a VVVV",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a VVVV",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-08:00",
		"M/d/y h:mm a VVVV",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM GMT-02:00",
		"M/d/y h:mm a VVVV",
		"Etc/GMT+8",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
});

QUnit.test( "should parse timezone (X)", function( assert ) {
	assert.timezoneParse( "Z", "X", cldr, 0 );
	assert.timezoneParse( "Z", "XX", cldr, 0 );
	assert.timezoneParse( "Z", "XXX", cldr, 0 );
	assert.timezoneParse( "Z", "XXXX", cldr, 0 );
	assert.timezoneParse( "Z", "XXXXX", cldr, 0 );

	assert.timezoneParse( "-03", "X", cldr, 180 );
	assert.timezoneParse( "-0300", "XX", cldr, 180 );
	assert.timezoneParse( "-03:00", "XXX", cldr, 180 );
	assert.timezoneParse( "-0300", "XXXX", cldr, 180 );
	assert.timezoneParse( "-03:00", "XXXXX", cldr, 180 );

	assert.timezoneParse( "+0530", "XX", cldr, -330 );
	assert.timezoneParse( "+05:30", "XXX", cldr, -330 );
	assert.timezoneParse( "+0530", "XXXX", cldr, -330 );
	assert.timezoneParse( "+05:30", "XXXXX", cldr, -330 );

	assert.timezoneParse( "+11", "X", cldr, -660 );
	assert.timezoneParse( "+1100", "XX", cldr, -660 );
	assert.timezoneParse( "+11:00", "XXX", cldr, -660 );
	assert.timezoneParse( "+1100", "XXXX", cldr, -660 );
	assert.timezoneParse( "+11:00", "XXXXX", cldr, -660 );
});

QUnit.test( "should parse timezone (x)", function( assert ) {
	assert.timezoneParse( "+00", "x", cldr, 0 );
	assert.timezoneParse( "+0000", "xx", cldr, 0 );
	assert.timezoneParse( "+00:00", "xxx", cldr, 0 );
	assert.timezoneParse( "+0000", "xxxx", cldr, 0 );
	assert.timezoneParse( "+00:00", "xxxxx", cldr, 0 );

	assert.timezoneParse( "-03", "x", cldr, 180 );
	assert.timezoneParse( "-0300", "xx", cldr, 180 );
	assert.timezoneParse( "-03:00", "xxx", cldr, 180 );
	assert.timezoneParse( "-0300", "xxxx", cldr, 180 );
	assert.timezoneParse( "-03:00", "xxxxx", cldr, 180 );

	assert.timezoneParse( "+0530", "x", cldr, -330 );
	assert.timezoneParse( "+0530", "xx", cldr, -330 );
	assert.timezoneParse( "+05:30", "xxx", cldr, -330 );
	assert.timezoneParse( "+0530", "xxxx", cldr, -330 );
	assert.timezoneParse( "+05:30", "xxxxx", cldr, -330 );

	assert.timezoneParse( "+11", "x", cldr, -660 );
	assert.timezoneParse( "+1100", "xx", cldr, -660 );
	assert.timezoneParse( "+11:00", "xxx", cldr, -660 );
	assert.timezoneParse( "+1100", "xxxx", cldr, -660 );
	assert.timezoneParse( "+11:00", "xxxxx", cldr, -660 );

	assert.timezoneParse( "-0752", "x", cldr, 472 );
	assert.timezoneParse( "-0752", "xx", cldr, 472 );
	assert.timezoneParse( "-07:52", "xxx", cldr, 472 );
	assert.timezoneParse( "-075258", "xxxx", cldr, 472 );
	assert.timezoneParse( "-07:52:58", "xxxxx", cldr, 472 );

	assert.timezoneParse( "+0752", "x", cldr, -472 );
	assert.timezoneParse( "+0752", "xx", cldr, -472 );
	assert.timezoneParse( "+07:52", "xxx", cldr, -472 );
	assert.timezoneParse( "+075258", "xxxx", cldr, -472 );
	assert.timezoneParse( "+07:52:58", "xxxxx", cldr, -472 );


});

QUnit.test( "should parse date according to passed timeZone in various datetime patterns",
			function( assert ) {

	// "M/d/y h:mm a"
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM",
		"M/d/y h:mm a",
		"Etc/UTC",
		cldr,
		new Date( "2017-01-01T00:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM",
		"M/d/y h:mm a",
		"Europe/Berlin",
		cldr,
		new Date( "2016-12-31T23:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM",
		"M/d/y h:mm a",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM",
		"M/d/y h:mm a",
		"America/New_York",
		cldr,
		new Date( "2017-01-01T05:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017 12:00 AM",
		"M/d/y h:mm a",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);

	// Testing DST edge cases...

	// Note we can't reliably parse overlapping times (daylight to standard cases). For example, we
	// can't reliably parse "2/18/2017 11:00 PM" for America/Sao_Paulo into
	// "2017-02-19T01:00:00.000Z" or "2017-02-19T02:00:00.000Z" without providing the zone string,
	// e.g., 11:00 PM BRT or 11:00 PM BRST (both times are valid). Therefore, formatting either one
	// should return back the parsed string. This is tested on functional tests.

	// PST
	assert.dateParseWithTimezone(
		"3/12/2017 1:00 AM",
		"M/d/y h:mm a",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-03-12T09:00:00.000Z" )
	);

	// PDT
	assert.dateParseWithTimezone(
		"3/12/2017 3:00 AM",
		"M/d/y h:mm a",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-03-12T10:00:00.000Z" )
	);

	// "M/d/y"
	assert.dateParseWithTimezone(
		"1/1/2017",
		"M/d/y",
		"Etc/UTC",
		cldr,
		new Date( "2017-01-01T00:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017",
		"M/d/y",
		"Europe/Berlin",
		cldr,
		new Date( "2016-12-31T23:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017",
		"M/d/y",
		"America/Sao_Paulo",
		cldr,
		new Date( "2017-01-01T02:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017",
		"M/d/y",
		"America/New_York",
		cldr,
		new Date( "2017-01-01T05:00:00.000Z" )
	);
	assert.dateParseWithTimezone(
		"1/1/2017",
		"M/d/y",
		"America/Los_Angeles",
		cldr,
		new Date( "2017-01-01T08:00:00.000Z" )
	);
});

/**
 * Literal
 */

QUnit.test( "should parse literal (')", function( assert ) {
	var date = new Date();
	date.setHours( 9 );
	date = startOf( date, "hour" );
	assert.dateParse( "09 o'clock AM", "hh 'o''clock' a", cldr, date );
});

QUnit.test( "should parse invalid literal as null", function( assert ) {
	assert.dateParse( "2-20-2017", "M/d/y", cldr, null );
	assert.dateParse( "2a20a2017", "M/d/y", cldr, null );
	assert.dateParse( "2/20/2017", "M-d-y", cldr, null );
	assert.dateParse( "2/20/2017x5xAM", "M/d/y h a", cldr, null );
});

});
