define([
	"cldr",
	"src/date/format",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json",
	"cldr/supplemental"
], function( Cldr, format, enCaGregorian, likelySubtags, timeData, weekData ) {

var cldr,
	year0 = new Date( -62167190400000 ),
	yearBc = new Date( -62482053600000 ),
	date1 = new Date( 1982, 0, 2, 9, 5, 59 ),
	date2 = new Date( 2010, 8, 15, 17, 35, 7, 369 ),
	date3 = new Date( 1981, 11, 31, 12 ), // thu
	date4 = new Date( 1994, 11, 31, 12 ); // sat

Cldr.load( enCaGregorian );
Cldr.load( likelySubtags );
Cldr.load( timeData );
Cldr.load( weekData );

cldr = new Cldr( "en" );

QUnit.module( "Datetime Format" );

/**
 *  Era
 */

QUnit.test( "should format era (G|GG|GGG)", function( assert ) {
	assert.equal( format( date1, "G", cldr ), "AD" );
	assert.equal( format( year0, "G", cldr ), "AD" );
	assert.equal( format( yearBc, "G", cldr ), "BC" );
	assert.equal( format( date1, "GG", cldr ), "AD" );
	assert.equal( format( year0, "GG", cldr ), "AD" );
	assert.equal( format( yearBc, "GG", cldr ), "BC" );
	assert.equal( format( date1, "GGG", cldr ), "AD" );
	assert.equal( format( year0, "GGG", cldr ), "AD" );
	assert.equal( format( yearBc, "GGG", cldr ), "BC" );
});

QUnit.test( "should format era (GGGG)", function( assert ) {
	assert.equal( format( date1, "GGGG", cldr ), "Anno Domini" );
	assert.equal( format( year0, "GGGG", cldr ), "Anno Domini" );
	assert.equal( format( yearBc, "GGGG", cldr ), "Before Christ" );
});

QUnit.test( "should format era (GGGGG)", function( assert ) {
	assert.equal( format( date1, "GGGGG", cldr ), "A" );
	assert.equal( format( year0, "GGGGG", cldr ), "A" );
	assert.equal( format( yearBc, "GGGGG", cldr ), "B" );
});

/**
 *  Year
 */

QUnit.test( "should format year (y) with no padding", function( assert ) {
	assert.equal( format( date2, "y", cldr ), "2010" );
	assert.equal( format( date1, "y", cldr ), "1982" );
	assert.equal( format( year0, "y", cldr ), "0" );
});

QUnit.test( "should format year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.equal( format( date2, "yy", cldr ), "10" );
	assert.equal( format( date1, "yy", cldr ), "82" );
	assert.equal( format( year0, "yy", cldr ), "00" );
});

QUnit.test( "should format year (yyy+) with padding", function( assert ) {
	assert.equal( format( date1, "yyy", cldr ), "1982" );
	assert.equal( format( date2, "yyy", cldr ), "2010" );
	assert.equal( format( year0, "yyyy", cldr ), "0000" );
	assert.equal( format( date1, "yyyyy", cldr ), "01982" );
	assert.equal( format( date2, "yyyyy", cldr ), "02010" );
});

QUnit.test( "should format year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.equal( format( date3, "Y", cldr ), "1982" );
	assert.equal( format( date4, "Y", cldr ), "1994" );
});

QUnit.test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.equal( format( date3, "YY", cldr ), "82" );
	assert.equal( format( date4, "YY", cldr ), "94" );
});

QUnit.test( "should format year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.equal( format( date3, "YYY", cldr ), "1982" );
	assert.equal( format( date4, "YYY", cldr ), "1994" );
	assert.equal( format( date3, "YYYYY", cldr ), "01982" );
	assert.equal( format( date4, "YYYYY", cldr ), "01994" );
});

/**
 *  Quarter
 */

QUnit.test( "should format quarter (Q|q) with no padding", function( assert ) {
	assert.equal( format( date1, "Q", cldr ), "1" );
	assert.equal( format( date2, "Q", cldr ), "3" );
	assert.equal( format( date1, "q", cldr ), "1" );
	assert.equal( format( date2, "q", cldr ), "3" );
});

QUnit.test( "should format quarter (QQ|qq) with padding", function( assert ) {
	assert.equal( format( date1, "QQ", cldr ), "01" );
	assert.equal( format( date2, "QQ", cldr ), "03" );
	assert.equal( format( date1, "qq", cldr ), "01" );
	assert.equal( format( date2, "qq", cldr ), "03" );
});

QUnit.test( "should format quarter (QQQ|qqq)", function( assert ) {
	assert.equal( format( date1, "QQQ", cldr ), "Q1" );
	assert.equal( format( date2, "QQQ", cldr ), "Q3" );
	assert.equal( format( date1, "qqq", cldr ), "Q1" );
	assert.equal( format( date2, "qqq", cldr ), "Q3" );
});

QUnit.test( "should format quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.equal( format( date1, "QQQQ", cldr ), "1st quarter" );
	assert.equal( format( date2, "QQQQ", cldr ), "3rd quarter" );
	assert.equal( format( date1, "qqqq", cldr ), "1st quarter" );
	assert.equal( format( date2, "qqqq", cldr ), "3rd quarter" );
});

/**
 *  Month
 */

QUnit.test( "should format month (M|L) with no padding", function( assert ) {
	assert.equal( format( date1, "M", cldr ), "1" );
	assert.equal( format( date2, "M", cldr ), "9" );
	assert.equal( format( date1, "L", cldr ), "1" );
	assert.equal( format( date2, "L", cldr ), "9" );
});

QUnit.test( "should format month (MM|LL) with padding", function( assert ) {
	assert.equal( format( date1, "MM", cldr ), "01" );
	assert.equal( format( date2, "MM", cldr ), "09" );
	assert.equal( format( date1, "LL", cldr ), "01" );
	assert.equal( format( date2, "LL", cldr ), "09" );
});

QUnit.test( "should format month (MMM|LLL)", function( assert ) {
	assert.equal( format( date1, "MMM", cldr ), "Jan" );
	assert.equal( format( date2, "MMM", cldr ), "Sep" );
	assert.equal( format( date1, "LLL", cldr ), "Jan" );
	assert.equal( format( date2, "LLL", cldr ), "Sep" );
});

QUnit.test( "should format month (MMMM|LLLL)", function( assert ) {
	assert.equal( format( date1, "MMMM", cldr ), "January" );
	assert.equal( format( date2, "MMMM", cldr ), "September" );
	assert.equal( format( date1, "LLLL", cldr ), "January" );
	assert.equal( format( date2, "LLLL", cldr ), "September" );
});

QUnit.test( "should format month (MMMMM|LLLLL)", function( assert ) {
	assert.equal( format( date1, "MMMMM", cldr ), "J" );
	assert.equal( format( date2, "MMMMM", cldr ), "S" );
	assert.equal( format( date1, "LLLLL", cldr ), "J" );
	assert.equal( format( date2, "LLLLL", cldr ), "S" );
});

/**
 *  Week
 */

QUnit.test( "should format week of year (w) with no padding", function( assert ) {
	assert.equal( format( date1, "w", cldr ), "1" );
	assert.equal( format( date2, "w", cldr ), "38" );
});

QUnit.test( "should format week of year (ww) with padding", function( assert ) {
	assert.equal( format( date1, "ww", cldr ), "01" );
	assert.equal( format( date2, "ww", cldr ), "38" );
});

QUnit.test( "should format week of month (W)", function( assert ) {
	assert.equal( format( date1, "W", cldr ), "1" );
	assert.equal( format( date2, "W", cldr ), "3" );
	assert.equal( format( date3, "W", cldr ), "5" );
});

/**
 *  Day
 */

QUnit.test( "should format day (d) with no padding", function( assert ) {
	assert.equal( format( date1, "d", cldr ), "2" );
	assert.equal( format( date2, "d", cldr ), "15" );
});

QUnit.test( "should format day (dd) with padding", function( assert ) {
	assert.equal( format( date1, "dd", cldr ), "02" );
	assert.equal( format( date2, "dd", cldr ), "15" );
});

QUnit.test( "should format day of year (D) with no padding", function( assert ) {
	assert.equal( format( date1, "D", cldr ), "2" );
	assert.equal( format( date2, "D", cldr ), "258" );
});

QUnit.test( "should format day of year (DD|DDD) with padding", function( assert ) {
	assert.equal( format( date1, "DD", cldr ), "02" );
	assert.equal( format( date1, "DDD", cldr ), "002" );
	assert.equal( format( date2, "DD", cldr ), "258" );
});

QUnit.test( "should format day of week in month (F)", function( assert ) {
	assert.equal( format( date1, "F", cldr ), "1" );
	assert.equal( format( date2, "F", cldr ), "3" );
});

/**
 *  Week day
 */

QUnit.test( "should format local day of week (e|c) with no padding", function( assert ) {
	assert.equal( format( date1, "e", cldr ), "7" );
	assert.equal( format( date2, "e", cldr ), "4" );
	assert.equal( format( date1, "c", cldr ), "7" );
	assert.equal( format( date2, "c", cldr ), "4" );
});

QUnit.test( "should format local day of week (ee|cc) with padding", function( assert ) {
	assert.equal( format( date1, "ee", cldr ), "07" );
	assert.equal( format( date2, "ee", cldr ), "04" );
	assert.equal( format( date1, "cc", cldr ), "07" );
	assert.equal( format( date2, "cc", cldr ), "04" );
});

QUnit.test( "should format local day of week (E|EE|EEE|eee|ccc)", function( assert ) {
	assert.equal( format( date1, "E", cldr ), "Sat" );
	assert.equal( format( date2, "E", cldr ), "Wed" );
	assert.equal( format( date1, "EE", cldr ), "Sat" );
	assert.equal( format( date2, "EE", cldr ), "Wed" );
	assert.equal( format( date1, "EEE", cldr ), "Sat" );
	assert.equal( format( date2, "EEE", cldr ), "Wed" );
	assert.equal( format( date1, "eee", cldr ), "Sat" );
	assert.equal( format( date2, "eee", cldr ), "Wed" );
	assert.equal( format( date1, "ccc", cldr ), "Sat" );
	assert.equal( format( date2, "ccc", cldr ), "Wed" );
});

QUnit.test( "should format local day of week (EEEE|eeee|cccc)", function( assert ) {
	assert.equal( format( date1, "EEEE", cldr ), "Saturday" );
	assert.equal( format( date2, "EEEE", cldr ), "Wednesday" );
	assert.equal( format( date1, "eeee", cldr ), "Saturday" );
	assert.equal( format( date2, "eeee", cldr ), "Wednesday" );
	assert.equal( format( date1, "cccc", cldr ), "Saturday" );
	assert.equal( format( date2, "cccc", cldr ), "Wednesday" );
});

QUnit.test( "should format local day of week (EEEEE|eeeee|ccccc)", function( assert ) {
	assert.equal( format( date1, "EEEEE", cldr ), "S" );
	assert.equal( format( date2, "EEEEE", cldr ), "W" );
	assert.equal( format( date1, "eeeee", cldr ), "S" );
	assert.equal( format( date2, "eeeee", cldr ), "W" );
	assert.equal( format( date1, "ccccc", cldr ), "S" );
	assert.equal( format( date2, "ccccc", cldr ), "W" );
});

QUnit.test( "should format local day of week (EEEEEE|eeeeee|cccccc)", function( assert ) {
	assert.equal( format( date1, "EEEEEE", cldr ), "Sa" );
	assert.equal( format( date2, "EEEEEE", cldr ), "We" );
	assert.equal( format( date1, "eeeeee", cldr ), "Sa" );
	assert.equal( format( date2, "eeeeee", cldr ), "We" );
	assert.equal( format( date1, "cccccc", cldr ), "Sa" );
	assert.equal( format( date2, "cccccc", cldr ), "We" );
});

/**
 *  Period
 */

QUnit.test( "should format period (a)", function( assert ) {
	assert.equal( format( date1, "a", cldr ), "AM" );
	assert.equal( format( date2, "a", cldr ), "PM" );
});

/**
 *  Hour
 */

QUnit.test( "should format hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assert.equal( format( date1, "h", cldr ), "9" );
	assert.equal( format( date2, "h", cldr ), "5" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "h", cldr ), "12" );
});

QUnit.test( "should format hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	assert.equal( format( date1, "hh", cldr ), "09" );
	assert.equal( format( date2, "hh", cldr ), "05" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "hh", cldr ), "12" );
});

QUnit.test( "should format hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assert.equal( format( date1, "H", cldr ), "9" );
	assert.equal( format( date2, "H", cldr ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "H", cldr ), "0" );
});

QUnit.test( "should format hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	assert.equal( format( date1, "HH", cldr ), "09" );
	assert.equal( format( date2, "HH", cldr ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "HH", cldr ), "00" );
});

QUnit.test( "should format hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assert.equal( format( date1, "K", cldr ), "9" );
	assert.equal( format( date2, "K", cldr ), "5" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "K", cldr ), "0" );
});

QUnit.test( "should format hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	assert.equal( format( date1, "KK", cldr ), "09" );
	assert.equal( format( date2, "KK", cldr ), "05" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "KK", cldr ), "00" );
});

QUnit.test( "should format hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assert.equal( format( date1, "k", cldr ), "9" );
	assert.equal( format( date2, "k", cldr ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "k", cldr ), "24" );
});

QUnit.test( "should format hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	assert.equal( format( date1, "kk", cldr ), "09" );
	assert.equal( format( date2, "kk", cldr ), "17" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "kk", cldr ), "24" );
});

QUnit.test( "should format hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	assert.equal( format( date2, "j", cldr ), "5" );
	assert.equal( format( date2, "j", new Cldr( "pt-BR" ) ), "17" );
	assert.equal( format( date2, "j", new Cldr( "de" ) ), "17" );
	assert.equal( format( date2, "j", new Cldr( "en-IN" ) ), "5" );
	assert.equal( format( date2, "j", new Cldr( "en-GB" ) ), "17" );
	assert.equal( format( date2, "j", new Cldr( "ru" ) ), "17" );
});

QUnit.test( "should format hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	assert.equal( format( date1, "jj", cldr ), "09" );
	assert.equal( format( date2, "jj", cldr ), "05" );
	assert.equal( format( new Date( 0, 0, 0, 0 ), "jj", cldr ), "12" );
});

/**
 *  Minute
 */

QUnit.test( "should format minute (m) with no padding", function( assert ) {
	assert.equal( format( date1, "m", cldr ), "5" );
	assert.equal( format( date2, "m", cldr ), "35" );
});

QUnit.test( "should format minute (mm) with padding", function( assert ) {
	assert.equal( format( date1, "mm", cldr ), "05" );
	assert.equal( format( date2, "mm", cldr ), "35" );
});

/**
 *  Second
 */

QUnit.test( "should format second (s) with no padding", function( assert ) {
	assert.equal( format( date1, "s", cldr ), "59" );
	assert.equal( format( date2, "s", cldr ), "7" );
});

QUnit.test( "should format second (ss) with padding", function( assert ) {
	assert.equal( format( date1, "ss", cldr ), "59" );
	assert.equal( format( date2, "ss", cldr ), "07" );
});

QUnit.test( "should format various milliseconds (S+)", function( assert ) {
	assert.equal( format( date2, "S", cldr ), "4" );
	assert.equal( format( date2, "SS", cldr ), "37" );
	assert.equal( format( date2, "SSS", cldr ), "369" );
	assert.equal( format( date2, "SSSS", cldr ), "3690" );
	assert.equal( format( date2, "SSSSS", cldr ), "36900" );
});

QUnit.test( "should format various milliseconds (A+)", function( assert ) {
	assert.equal( format( date2, "A", cldr ), "633074" );
	assert.equal( format( date2, "AA", cldr ), "6330737" );
	assert.equal( format( date2, "AAA", cldr ), "63307369" );
	assert.equal( format( date2, "AAAA", cldr ), "633073690" );
	assert.equal( format( date2, "AAAAA", cldr ), "6330736900" );
});

/**
 *  Zone
 */

// TODO all

});
