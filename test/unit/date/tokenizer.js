define([
	"cldr",
	"src/date/tokenizer",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json"
], function( Cldr, tokenizer, enCaGregorian, likelySubtags, timeData, weekData ) {

var cldr;

Cldr.load( enCaGregorian );
Cldr.load( likelySubtags );
Cldr.load( timeData );
Cldr.load( weekData );

cldr = new Cldr( "en" );

QUnit.module( "Datetime Tokenizer" );

/**
 *  Era
 */

QUnit.test( "should tokenize era (G|GG|GGG)", function( assert ) {
	assert.deepEqual( tokenizer( "AD", "G", cldr ), [{
		type: "G",
		lexeme: "AD",
		value: "1"
	}] );
	assert.deepEqual( tokenizer( "AD", "GG", cldr ), [{
		type: "GG",
		lexeme: "AD",
		value: "1"
	}] );
	assert.deepEqual( tokenizer( "AD", "GGG", cldr ), [{
		type: "GGG",
		lexeme: "AD",
		value: "1"
	}] );
});

QUnit.test( "should tokenize era (GGGG)", function( assert ) {
	assert.deepEqual( tokenizer( "Anno Domini", "GGGG", cldr ), [{
		type: "GGGG",
		lexeme: "Anno Domini",
		value: "1"
	}] );
});

QUnit.test( "should tokenize era (GGGGG)", function( assert ) {
	assert.deepEqual( tokenizer( "A", "GGGGG", cldr ), [{
		type: "GGGGG",
		lexeme: "A",
		value: "1"
	}] );
});

/**
 *  Year
 */

QUnit.test( "should tokenize year (y) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "1982", "y", cldr ), [{
		type: "y",
		lexeme: "1982"
	}] );
});

QUnit.test( "should tokenize year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.deepEqual( tokenizer( "82", "yy", cldr ), [{
		type: "yy",
		lexeme: "82"
	}] );
});

QUnit.test( "should tokenize year (yyy+) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "1982", "yyy", cldr ), [{
		type: "yyy",
		lexeme: "1982"
	}] );
	assert.deepEqual( tokenizer( "01982", "yyyyy", cldr ), [{
		type: "yyyyy",
		lexeme: "01982"
	}] );
});

QUnit.test( "should tokenize year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "1982", "Y", cldr ), [{
		type: "Y",
		lexeme: "1982"
	}] );
});

QUnit.test( "should tokenize year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.deepEqual( tokenizer( "82", "YY", cldr ), [{
		type: "YY",
		lexeme: "82"
	}] );
});

QUnit.test( "should tokenize year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "1982", "YYY", cldr ), [{
		type: "YYY",
		lexeme: "1982"
	}] );
	assert.deepEqual( tokenizer( "01982", "YYYYY", cldr ), [{
		type: "YYYYY",
		lexeme: "01982"
	}] );
});

/**
 *  Quarter
 */

QUnit.test( "should tokenize quarter (Q|q) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "1", "Q", cldr ), [{
		type: "Q",
		lexeme: "1"
	}] );
	assert.deepEqual( tokenizer( "1", "q", cldr ), [{
		type: "q",
		lexeme: "1"
	}] );
});

QUnit.test( "should tokenize quarter (QQ|qq) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "01", "QQ", cldr ), [{
		type: "QQ",
		lexeme: "01"
	}] );
	assert.deepEqual( tokenizer( "01", "qq", cldr ), [{
		type: "qq",
		lexeme: "01"
	}] );
});

QUnit.test( "should tokenize quarter (QQQ|qqq)", function( assert ) {
	assert.deepEqual( tokenizer( "Q1", "QQQ", cldr ), [{
		type: "QQQ",
		lexeme: "Q1",
		value: "1"
	}] );
	assert.deepEqual( tokenizer( "Q1", "qqq", cldr ), [{
		type: "qqq",
		lexeme: "Q1",
		value: "1"
	}] );
});

QUnit.test( "should tokenize quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "1st quarter", "QQQQ", cldr ), [{
		type: "QQQQ",
		lexeme: "1st quarter",
		value: "1"
	}] );
	assert.deepEqual( tokenizer( "1st quarter", "qqqq", cldr ), [{
		type: "qqqq",
		lexeme: "1st quarter",
		value: "1"
	}] );
});

/**
 *  Month
 */

QUnit.test( "should tokenize month (M|L) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "1", "M", cldr ), [{
		type: "M",
		lexeme: "1"
	}] );
	assert.deepEqual( tokenizer( "1", "L", cldr ), [{
		type: "L",
		lexeme: "1"
	}] );
});

QUnit.test( "should tokenize month (MM|LL) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "01", "MM", cldr ), [{
		type: "MM",
		lexeme: "01"
	}] );
	assert.deepEqual( tokenizer( "01", "LL", cldr ), [{
		type: "LL",
		lexeme: "01"
	}] );
});

QUnit.test( "should tokenize month (MMM|LLL)", function( assert ) {
	assert.deepEqual( tokenizer( "Jan", "MMM", cldr ), [{
		type: "MMM",
		lexeme: "Jan",
		value: "1"
	}] );
	assert.deepEqual( tokenizer( "Jan", "LLL", cldr ), [{
		type: "LLL",
		lexeme: "Jan",
		value: "1"
	}] );
});

QUnit.test( "should tokenize month (MMMM|LLLL)", function( assert ) {
	assert.deepEqual( tokenizer( "January", "MMMM", cldr ), [{
		type: "MMMM",
		lexeme: "January",
		value: "1"
	}] );
	assert.deepEqual( tokenizer( "January", "LLLL", cldr ), [{
		type: "LLLL",
		lexeme: "January",
		value: "1"
	}] );
});

QUnit.test( "should tokenize month (MMMMM|LLLLL)", function( assert ) {
	assert.deepEqual( tokenizer( "J", "MMMMM", cldr ), [{
		type: "MMMMM",
		lexeme: "J",
		value: "1"
	}] );
	assert.deepEqual( tokenizer( "J", "LLLLL", cldr ), [{
		type: "LLLLL",
		lexeme: "J",
		value: "1"
	}] );
});

/**
 *  Week
 */

QUnit.test( "should tokenize week of year (w) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "1", "w", cldr ), [{
		type: "w",
		lexeme: "1"
	}] );
});

QUnit.test( "should tokenize week of year (ww) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "01", "ww", cldr ), [{
		type: "ww",
		lexeme: "01"
	}] );
});

QUnit.test( "should tokenize week of month (W)", function( assert ) {
	assert.deepEqual( tokenizer( "1", "W", cldr ), [{
		type: "W",
		lexeme: "1"
	}] );
});

/**
 *  Day
 */

QUnit.test( "should tokenize day (d) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "2", "d", cldr ), [{
		type: "d",
		lexeme: "2"
	}] );
});

QUnit.test( "should tokenize day (dd) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "02", "dd", cldr ), [{
		type: "dd",
		lexeme: "02"
	}] );
});

QUnit.test( "should tokenize day of year (D) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "2", "D", cldr ), [{
		type: "D",
		lexeme: "2"
	}] );
});

QUnit.test( "should tokenize day of year (DD|DDD) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "02", "DD", cldr ), [{
		type: "DD",
		lexeme: "02"
	}] );
	assert.deepEqual( tokenizer( "002", "DDD", cldr ), [{
		type: "DDD",
		lexeme: "002"
	}] );
});

QUnit.test( "should tokenize day of week in month (F)", function( assert ) {
	assert.deepEqual( tokenizer( "1", "F", cldr ), [{
		type: "F",
		lexeme: "1"
	}] );
});

/**
 *  Week day
 */

QUnit.test( "should tokenize local day of week (e|c) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "7", "e", cldr ), [{
		type: "e",
		lexeme: "7"
	}] );
	assert.deepEqual( tokenizer( "7", "c", cldr ), [{
		type: "c",
		lexeme: "7"
	}] );
});

QUnit.test( "should tokenize local day of week (ee|cc) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "07", "ee", cldr ), [{
		type: "ee",
		lexeme: "07"
	}] );
	assert.deepEqual( tokenizer( "07", "cc", cldr ), [{
		type: "cc",
		lexeme: "07"
	}] );
});

QUnit.test( "should tokenize local day of week (E|EE|EEE|eee|ccc)", function( assert ) {
	assert.deepEqual( tokenizer( "Sat", "E", cldr ), [{
		type: "E",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Sat", "EE", cldr ), [{
		type: "EE",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Sat", "EEE", cldr ), [{
		type: "EEE",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Sat", "eee", cldr ), [{
		type: "eee",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Sat", "ccc", cldr ), [{
		type: "ccc",
		lexeme: "Sat",
		value: "sat"
	}] );
});

QUnit.test( "should tokenize local day of week (EEEE|eeee|cccc)", function( assert ) {
	assert.deepEqual( tokenizer( "Saturday", "EEEE", cldr ), [{
		type: "EEEE",
		lexeme: "Saturday",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Saturday", "eeee", cldr ), [{
		type: "eeee",
		lexeme: "Saturday",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Saturday", "cccc", cldr ), [{
		type: "cccc",
		lexeme: "Saturday",
		value: "sat"
	}] );
});

QUnit.test( "should tokenize local day of week (EEEEE|eeeee|ccccc)", function( assert ) {
	// OBS: note the abbreviated S would matche sun or sat. But, only the first is returned.
	assert.deepEqual( tokenizer( "S", "EEEEE", cldr ), [{
		type: "EEEEE",
		lexeme: "S",
		value: "sun"
	}] );
	assert.deepEqual( tokenizer( "S", "eeeee", cldr ), [{
		type: "eeeee",
		lexeme: "S",
		value: "sun"
	}] );
	assert.deepEqual( tokenizer( "S", "ccccc", cldr ), [{
		type: "ccccc",
		lexeme: "S",
		value: "sun"
	}] );
});

QUnit.test( "should tokenize local day of week (EEEEEE|eeeeee|cccccc)", function( assert ) {
	assert.deepEqual( tokenizer( "Sa", "EEEEEE", cldr ), [{
		type: "EEEEEE",
		lexeme: "Sa",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Sa", "eeeeee", cldr ), [{
		type: "eeeeee",
		lexeme: "Sa",
		value: "sat"
	}] );
	assert.deepEqual( tokenizer( "Sa", "cccccc", cldr ), [{
		type: "cccccc",
		lexeme: "Sa",
		value: "sat"
	}] );
});

/**
 *  Period
 */

QUnit.test( "should tokenize period (a)", function( assert ) {
	assert.deepEqual( tokenizer( "AM", "a", cldr ), [{
		type: "a",
		lexeme: "AM",
		value: "am"
	}] );
});

/**
 *  Hour
 */

QUnit.test( "should tokenize hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "9", "h", cldr ), [{
		type: "h",
		lexeme: "9"
	}] );
});

QUnit.test( "should tokenize hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	assert.deepEqual( tokenizer( "09", "hh", cldr ), [{
		type: "hh",
		lexeme: "09"
	}] );
});

QUnit.test( "should tokenize hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "9", "H", cldr ), [{
		type: "H",
		lexeme: "9"
	}] );
});

QUnit.test( "should tokenize hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	assert.deepEqual( tokenizer( "09", "HH", cldr ), [{
		type: "HH",
		lexeme: "09"
	}] );
});

QUnit.test( "should tokenize hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "9", "K", cldr ), [{
		type: "K",
		lexeme: "9"
	}] );
});

QUnit.test( "should tokenize hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	assert.deepEqual( tokenizer( "09", "KK", cldr ), [{
		type: "KK",
		lexeme: "09"
	}] );
});

QUnit.test( "should tokenize hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "9", "k", cldr ), [{
		type: "k",
		lexeme: "9"
	}] );
});

QUnit.test( "should tokenize hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	assert.deepEqual( tokenizer( "09", "kk", cldr ), [{
		type: "kk",
		lexeme: "09"
	}] );
});

QUnit.test( "should tokenize hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "9", "j", cldr ), [{
		type: "j",
		lexeme: "9"
	}] );
});

QUnit.test( "should tokenize hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "09", "jj", cldr ), [{
		type: "jj",
		lexeme: "09"
	}] );
});

/**
 *  Minute
 */

QUnit.test( "should tokenize minute (m) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "5", "m", cldr ), [{
		type: "m",
		lexeme: "5"
	}] );
});

QUnit.test( "should tokenize minute (mm) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "05", "mm", cldr ), [{
		type: "mm",
		lexeme: "05"
	}] );
});

/**
 *  Second
 */

QUnit.test( "should tokenize second (s) with no padding", function( assert ) {
	assert.deepEqual( tokenizer( "59", "s", cldr ), [{
		type: "s",
		lexeme: "59"
	}] );
});

QUnit.test( "should tokenize second (ss) with padding", function( assert ) {
	assert.deepEqual( tokenizer( "59", "ss", cldr ), [{
		type: "ss",
		lexeme: "59"
	}] );
});

QUnit.test( "should tokenize milliseconds (S+)", function( assert ) {
	assert.deepEqual( tokenizer( "4", "S", cldr ), [{
		type: "S",
		lexeme: "4"
	}] );
	assert.deepEqual( tokenizer( "37", "SS", cldr ), [{
		type: "SS",
		lexeme: "37"
	}] );
	assert.deepEqual( tokenizer( "369", "SSS", cldr ), [{
		type: "SSS",
		lexeme: "369"
	}] );
	assert.deepEqual( tokenizer( "3690", "SSSS", cldr ), [{
		type: "SSSS",
		lexeme: "3690"
	}] );
	assert.deepEqual( tokenizer( "36900", "SSSSS", cldr ), [{
		type: "SSSSS",
		lexeme: "36900"
	}] );
});

QUnit.test( "should tokenize milliseconds in a day (A+)", function( assert ) {
	assert.deepEqual( tokenizer( "633074", "A", cldr ), [{
		type: "A",
		lexeme: "633074"
	}] );
	assert.deepEqual( tokenizer( "6330737", "AA", cldr ), [{
		type: "AA",
		lexeme: "6330737"
	}] );
	assert.deepEqual( tokenizer( "63307369", "AAA", cldr ), [{
		type: "AAA",
		lexeme: "63307369"
	}] );
	assert.deepEqual( tokenizer( "633073690", "AAAA", cldr ), [{
		type: "AAAA",
		lexeme: "633073690"
	}] );
	assert.deepEqual( tokenizer( "6330736900", "AAAAA", cldr ), [{
		type: "AAAAA",
		lexeme: "6330736900"
	}] );
});

/**
 *  Zone
 */

// TODO all

});
