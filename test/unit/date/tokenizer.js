define([
	"cldr",
	"src/date/tokenizer",
	"src/date/tokenizer-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, tokenizer, tokenizerProperties, enCaGregorian, enNumbers, likelySubtags,
	timeData, weekData ) {

var cldr;

// Simple number parser for this test purposes.
function simpleNumberParser( value ) {
	return +value;
}

Cldr.load(
	enCaGregorian,
	enNumbers,
	likelySubtags,
	timeData,
	weekData
);

cldr = new Cldr( "en" );

QUnit.assert.dateTokenizer = function( value, pattern, cldr, expected ) {
	this.deepEqual(
		tokenizer( value, simpleNumberParser, tokenizerProperties( pattern, cldr ) ),
		expected
	);
};

QUnit.module( "Date Tokenizer" );

/**
 *  Correctness
 */

QUnit.test( "should not tokenize when extra characters present at the end", function( assert ) {
	assert.dateTokenizer( "2016", "yy", cldr, [] );
});

/**
 *  Era
 */

QUnit.test( "should tokenize era (G|GG|GGG)", function( assert ) {
	assert.dateTokenizer( "AD", "G", cldr, [{
		type: "G",
		lexeme: "AD",
		value: "1"
	}] );
	assert.dateTokenizer( "AD", "GG", cldr, [{
		type: "GG",
		lexeme: "AD",
		value: "1"
	}] );
	assert.dateTokenizer( "AD", "GGG", cldr, [{
		type: "GGG",
		lexeme: "AD",
		value: "1"
	}] );
});

QUnit.test( "should tokenize era (GGGG)", function( assert ) {
	assert.dateTokenizer( "Anno Domini", "GGGG", cldr, [{
		type: "GGGG",
		lexeme: "Anno Domini",
		value: "1"
	}] );
});

QUnit.test( "should tokenize era (GGGGG)", function( assert ) {
	assert.dateTokenizer( "A", "GGGGG", cldr, [{
		type: "GGGGG",
		lexeme: "A",
		value: "1"
	}] );
});

/**
 *  Year
 */

QUnit.test( "should tokenize year (y) with no padding", function( assert ) {
	assert.dateTokenizer( "1982", "y", cldr, [{
		type: "y",
		lexeme: "1982",
		value: 1982
	}] );
});

QUnit.test( "should tokenize year (yy) with padding, and limit 2 digits", function( assert ) {
	assert.dateTokenizer( "82", "yy", cldr, [{
		type: "yy",
		lexeme: "82",
		value: 82
	}] );
});

QUnit.test( "should tokenize year (yyy+) with padding", function( assert ) {
	assert.dateTokenizer( "1982", "yyy", cldr, [{
		type: "yyy",
		lexeme: "1982",
		value: 1982
	}] );
	assert.dateTokenizer( "01982", "yyyyy", cldr, [{
		type: "yyyyy",
		lexeme: "01982",
		value: 1982
	}] );
});

QUnit.test( "should tokenize year in \"week of year\" (Y) with no padding", function( assert ) {
	assert.dateTokenizer( "1982", "Y", cldr, [{
		type: "Y",
		lexeme: "1982",
		value: 1982
	}] );
});

QUnit.test( "should tokenize year in \"week of year\" (YY) with padding, and limit 2 digits", function( assert ) {
	assert.dateTokenizer( "82", "YY", cldr, [{
		type: "YY",
		lexeme: "82",
		value: 82
	}] );
});

QUnit.test( "should tokenize year in \"week of year\" (YYY+) with padding", function( assert ) {
	assert.dateTokenizer( "1982", "YYY", cldr, [{
		type: "YYY",
		lexeme: "1982",
		value: 1982
	}] );
	assert.dateTokenizer( "01982", "YYYYY", cldr, [{
		type: "YYYYY",
		lexeme: "01982",
		value: 1982
	}] );
});

/**
 *  Quarter
 */

QUnit.test( "should tokenize quarter (Q|q) with no padding", function( assert ) {
	assert.dateTokenizer( "1", "Q", cldr, [{
		type: "Q",
		lexeme: "1",
		value: 1
	}] );
	assert.dateTokenizer( "1", "q", cldr, [{
		type: "q",
		lexeme: "1",
		value: 1
	}] );
});

QUnit.test( "should tokenize quarter (QQ|qq) with padding", function( assert ) {
	assert.dateTokenizer( "01", "QQ", cldr, [{
		type: "QQ",
		lexeme: "01",
		value: 1
	}] );
	assert.dateTokenizer( "01", "qq", cldr, [{
		type: "qq",
		lexeme: "01",
		value: 1
	}] );
});

QUnit.test( "should tokenize quarter (QQQ|qqq)", function( assert ) {
	assert.dateTokenizer( "Q1", "QQQ", cldr, [{
		type: "QQQ",
		lexeme: "Q1",
		value: "1"
	}] );
	assert.dateTokenizer( "Q1", "qqq", cldr, [{
		type: "qqq",
		lexeme: "Q1",
		value: "1"
	}] );
});

QUnit.test( "should tokenize quarter (QQQQ|qqqq) with padding", function( assert ) {
	assert.dateTokenizer( "1st quarter", "QQQQ", cldr, [{
		type: "QQQQ",
		lexeme: "1st quarter",
		value: "1"
	}] );
	assert.dateTokenizer( "1st quarter", "qqqq", cldr, [{
		type: "qqqq",
		lexeme: "1st quarter",
		value: "1"
	}] );
});

/**
 *  Month
 */

QUnit.test( "should tokenize month (M|L) with no padding", function( assert ) {
	assert.dateTokenizer( "1", "M", cldr, [{
		type: "M",
		lexeme: "1",
		value: 1
	}] );
	assert.dateTokenizer( "1", "L", cldr, [{
		type: "L",
		lexeme: "1",
		value: 1
	}] );
});

QUnit.test( "should tokenize month (MM|LL) with padding", function( assert ) {
	assert.dateTokenizer( "01", "MM", cldr, [{
		type: "MM",
		lexeme: "01",
		value: 1
	}] );
	assert.dateTokenizer( "01", "LL", cldr, [{
		type: "LL",
		lexeme: "01",
		value: 1
	}] );
});

QUnit.test( "should tokenize month (MMM|LLL)", function( assert ) {
	assert.dateTokenizer( "Jan", "MMM", cldr, [{
		type: "MMM",
		lexeme: "Jan",
		value: "1"
	}] );
	assert.dateTokenizer( "Jan", "LLL", cldr, [{
		type: "LLL",
		lexeme: "Jan",
		value: "1"
	}] );
});

QUnit.test( "should tokenize month (MMMM|LLLL)", function( assert ) {
	assert.dateTokenizer( "January", "MMMM", cldr, [{
		type: "MMMM",
		lexeme: "January",
		value: "1"
	}] );
	assert.dateTokenizer( "January", "LLLL", cldr, [{
		type: "LLLL",
		lexeme: "January",
		value: "1"
	}] );
});

QUnit.test( "should tokenize month (MMMMM|LLLLL)", function( assert ) {
	assert.dateTokenizer( "J", "MMMMM", cldr, [{
		type: "MMMMM",
		lexeme: "J",
		value: "1"
	}] );
	assert.dateTokenizer( "J", "LLLLL", cldr, [{
		type: "LLLLL",
		lexeme: "J",
		value: "1"
	}] );
});

/**
 *  Week
 */

QUnit.test( "should tokenize week of year (w) with no padding", function( assert ) {
	assert.dateTokenizer( "1", "w", cldr, [{
		type: "w",
		lexeme: "1",
		value: 1
	}] );
});

QUnit.test( "should tokenize week of year (ww) with padding", function( assert ) {
	assert.dateTokenizer( "01", "ww", cldr, [{
		type: "ww",
		lexeme: "01",
		value: 1
	}] );
});

QUnit.test( "should tokenize week of month (W)", function( assert ) {
	assert.dateTokenizer( "1", "W", cldr, [{
		type: "W",
		lexeme: "1",
		value: 1
	}] );
});

/**
 *  Day
 */

QUnit.test( "should tokenize day (d) with no padding", function( assert ) {
	assert.dateTokenizer( "2", "d", cldr, [{
		type: "d",
		lexeme: "2",
		value: 2
	}] );
});

QUnit.test( "should tokenize day (dd) with padding", function( assert ) {
	assert.dateTokenizer( "02", "dd", cldr, [{
		type: "dd",
		lexeme: "02",
		value: 2
	}] );
});

QUnit.test( "should tokenize day of year (D) with no padding", function( assert ) {
	assert.dateTokenizer( "2", "D", cldr, [{
		type: "D",
		lexeme: "2",
		value: 2
	}] );
});

QUnit.test( "should tokenize day of year (DD|DDD) with padding", function( assert ) {
	assert.dateTokenizer( "02", "DD", cldr, [{
		type: "DD",
		lexeme: "02",
		value: 2
	}] );
	assert.dateTokenizer( "002", "DDD", cldr, [{
		type: "DDD",
		lexeme: "002",
		value: 2
	}] );
});

QUnit.test( "should tokenize day of week in month (F)", function( assert ) {
	assert.dateTokenizer( "1", "F", cldr, [{
		type: "F",
		lexeme: "1",
		value: 1
	}] );
});

/**
 *  Week day
 */

QUnit.test( "should tokenize local day of week (e|c) with no padding", function( assert ) {
	assert.dateTokenizer( "7", "e", cldr, [{
		type: "e",
		lexeme: "7",
		value: 7
	}] );
	assert.dateTokenizer( "7", "c", cldr, [{
		type: "c",
		lexeme: "7",
		value: 7
	}] );
});

QUnit.test( "should tokenize local day of week (ee|cc) with padding", function( assert ) {
	assert.dateTokenizer( "07", "ee", cldr, [{
		type: "ee",
		lexeme: "07",
		value: 7
	}] );
	assert.dateTokenizer( "07", "cc", cldr, [{
		type: "cc",
		lexeme: "07",
		value: 7
	}] );
});

QUnit.test( "should tokenize local day of week (E|EE|EEE|eee|ccc)", function( assert ) {
	assert.dateTokenizer( "Sat", "E", cldr, [{
		type: "E",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.dateTokenizer( "Sat", "EE", cldr, [{
		type: "EE",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.dateTokenizer( "Sat", "EEE", cldr, [{
		type: "EEE",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.dateTokenizer( "Sat", "eee", cldr, [{
		type: "eee",
		lexeme: "Sat",
		value: "sat"
	}] );
	assert.dateTokenizer( "Sat", "ccc", cldr, [{
		type: "ccc",
		lexeme: "Sat",
		value: "sat"
	}] );
});

QUnit.test( "should tokenize local day of week (EEEE|eeee|cccc)", function( assert ) {
	assert.dateTokenizer( "Saturday", "EEEE", cldr, [{
		type: "EEEE",
		lexeme: "Saturday",
		value: "sat"
	}] );
	assert.dateTokenizer( "Saturday", "eeee", cldr, [{
		type: "eeee",
		lexeme: "Saturday",
		value: "sat"
	}] );
	assert.dateTokenizer( "Saturday", "cccc", cldr, [{
		type: "cccc",
		lexeme: "Saturday",
		value: "sat"
	}] );
});

QUnit.test( "should tokenize local day of week (EEEEE|eeeee|ccccc)", function( assert ) {
	// OBS: note the abbreviated S would matche sun or sat. But, only the first is returned.
	assert.dateTokenizer( "S", "EEEEE", cldr, [{
		type: "EEEEE",
		lexeme: "S",
		value: "sun"
	}] );
	assert.dateTokenizer( "S", "eeeee", cldr, [{
		type: "eeeee",
		lexeme: "S",
		value: "sun"
	}] );
	assert.dateTokenizer( "S", "ccccc", cldr, [{
		type: "ccccc",
		lexeme: "S",
		value: "sun"
	}] );
});

QUnit.test( "should tokenize local day of week (EEEEEE|eeeeee|cccccc)", function( assert ) {
	assert.dateTokenizer( "Sa", "EEEEEE", cldr, [{
		type: "EEEEEE",
		lexeme: "Sa",
		value: "sat"
	}] );
	assert.dateTokenizer( "Sa", "eeeeee", cldr, [{
		type: "eeeeee",
		lexeme: "Sa",
		value: "sat"
	}] );
	assert.dateTokenizer( "Sa", "cccccc", cldr, [{
		type: "cccccc",
		lexeme: "Sa",
		value: "sat"
	}] );
});

/**
 *  Period
 */

QUnit.test( "should tokenize period (a)", function( assert ) {
	assert.dateTokenizer( "AM", "a", cldr, [{
		type: "a",
		lexeme: "AM",
		value: "am"
	}] );
});

/**
 *  Hour
 */

QUnit.test( "should tokenize hour (h) using 12-hour-cycle [1-12] with no padding", function( assert ) {
	assert.dateTokenizer( "9", "h", cldr, [{
		type: "h",
		lexeme: "9",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (hh) using 12-hour-cycle [1-12] with padding", function( assert ) {
	assert.dateTokenizer( "09", "hh", cldr, [{
		type: "hh",
		lexeme: "09",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (H) using 24-hour-cycle [0-23] with no padding", function( assert ) {
	assert.dateTokenizer( "9", "H", cldr, [{
		type: "H",
		lexeme: "9",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (HH) using 24-hour-cycle [0-23] with padding", function( assert ) {
	assert.dateTokenizer( "09", "HH", cldr, [{
		type: "HH",
		lexeme: "09",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (K) using 12-hour-cycle [0-11] with no padding", function( assert ) {
	assert.dateTokenizer( "9", "K", cldr, [{
		type: "K",
		lexeme: "9",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (KK) using 12-hour-cycle [0-11] with padding", function( assert ) {
	assert.dateTokenizer( "09", "KK", cldr, [{
		type: "KK",
		lexeme: "09",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (k) using 24-hour-cycle [1-24] with no padding", function( assert ) {
	assert.dateTokenizer( "9", "k", cldr, [{
		type: "k",
		lexeme: "9",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (kk) using 24-hour-cycle [1-24] with padding", function( assert ) {
	assert.dateTokenizer( "09", "kk", cldr, [{
		type: "kk",
		lexeme: "09",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function( assert ) {
	assert.dateTokenizer( "9", "j", cldr, [{
		type: "j",
		lexeme: "9",
		value: 9
	}] );
});

QUnit.test( "should tokenize hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function( assert ) {
	assert.dateTokenizer( "09", "jj", cldr, [{
		type: "jj",
		lexeme: "09",
		value: 9
	}] );
});

/**
 *  Minute
 */

QUnit.test( "should tokenize minute (m) with no padding", function( assert ) {
	assert.dateTokenizer( "5", "m", cldr, [{
		type: "m",
		lexeme: "5",
		value: 5
	}] );
});

QUnit.test( "should tokenize minute (mm) with padding", function( assert ) {
	assert.dateTokenizer( "05", "mm", cldr, [{
		type: "mm",
		lexeme: "05",
		value: 5
	}] );
});

/**
 *  Second
 */

QUnit.test( "should tokenize second (s) with no padding", function( assert ) {
	assert.dateTokenizer( "59", "s", cldr, [{
		type: "s",
		lexeme: "59",
		value: 59
	}] );
});

QUnit.test( "should tokenize second (ss) with padding", function( assert ) {
	assert.dateTokenizer( "59", "ss", cldr, [{
		type: "ss",
		lexeme: "59",
		value: 59
	}] );
});

QUnit.test( "should tokenize milliseconds (S+)", function( assert ) {
	assert.dateTokenizer( "4", "S", cldr, [{
		type: "S",
		lexeme: "4",
		value: 4
	}] );
	assert.dateTokenizer( "37", "SS", cldr, [{
		type: "SS",
		lexeme: "37",
		value: 37
	}] );
	assert.dateTokenizer( "369", "SSS", cldr, [{
		type: "SSS",
		lexeme: "369",
		value: 369
	}] );
	assert.dateTokenizer( "3690", "SSSS", cldr, [{
		type: "SSSS",
		lexeme: "3690",
		value: 3690
	}] );
	assert.dateTokenizer( "36900", "SSSSS", cldr, [{
		type: "SSSSS",
		lexeme: "36900",
		value: 36900
	}] );
});

QUnit.test( "should tokenize milliseconds in a day (A+)", function( assert ) {
	assert.dateTokenizer( "633074", "A", cldr, [{
		type: "A",
		lexeme: "633074",
		value: 633074
	}] );
	assert.dateTokenizer( "6330737", "AA", cldr, [{
		type: "AA",
		lexeme: "6330737",
		value: 6330737
	}] );
	assert.dateTokenizer( "63307369", "AAA", cldr, [{
		type: "AAA",
		lexeme: "63307369",
		value: 63307369
	}] );
	assert.dateTokenizer( "633073690", "AAAA", cldr, [{
		type: "AAAA",
		lexeme: "633073690",
		value: 633073690
	}] );
	assert.dateTokenizer( "6330736900", "AAAAA", cldr, [{
		type: "AAAAA",
		lexeme: "6330736900",
		value: 6330736900
	}] );
});

/**
 *  Zone
 */

QUnit.test( "should tokenize timezone (z)", function( assert ) {
	assert.dateTokenizer( "GMT", "z", cldr, [{
		lexeme: "GMT",
		type: "z",
		value: 0
	}] );
	assert.dateTokenizer( "GMT", "zzzz", cldr, [{
		lexeme: "GMT",
		type: "zzzz",
		value: 0
	}] );
	assert.dateTokenizer( "GMT-3", "z", cldr, [{
		lexeme: "GMT-3",
		type: "z",
		value: 180
	}] );
	assert.dateTokenizer( "GMT-03:00", "zzzz", cldr, [{
		lexeme: "GMT-03:00",
		type: "zzzz",
		value: 180
	}] );
	assert.dateTokenizer( "GMT+11", "z", cldr, [{
		lexeme: "GMT+11",
		type: "z",
		value: -660
	}] );
	assert.dateTokenizer( "GMT+11:00", "zzzz", cldr, [{
		lexeme: "GMT+11:00",
		type: "zzzz",
		value: -660
	}] );
});

QUnit.test( "should tokenize timezone (Z)", function( assert ) {
	assert.dateTokenizer( "+0000", "Z", cldr, [{
		lexeme: "+0000",
		type: "Z",
		value: 0
	}] );
	assert.dateTokenizer( "GMT", "ZZZZ", cldr, [{
		lexeme: "GMT",
		type: "ZZZZ",
		value: 0
	}] );
	assert.dateTokenizer( "Z", "ZZZZZ", cldr, [{
		lexeme: "Z",
		type: "ZZZZZ",
		value: 0
	}] );
	assert.dateTokenizer( "-0300", "Z", cldr, [{
		lexeme: "-0300",
		type: "Z",
		value: 180
	}] );
	assert.dateTokenizer( "GMT-03:00", "ZZZZ", cldr, [{
		lexeme: "GMT-03:00",
		type: "ZZZZ",
		value: 180
	}] );
	assert.dateTokenizer( "-03:00", "ZZZZZ", cldr, [{
		lexeme: "-03:00",
		type: "ZZZZZ",
		value: 180
	}] );
	assert.dateTokenizer( "+1100", "Z", cldr, [{
		lexeme: "+1100",
		type: "Z",
		value: -660
	}] );
	assert.dateTokenizer( "GMT+11:00", "ZZZZ", cldr, [{
		lexeme: "GMT+11:00",
		type: "ZZZZ",
		value: -660
	}] );
	assert.dateTokenizer( "+11:00", "ZZZZZ", cldr, [{
		lexeme: "+11:00",
		type: "ZZZZZ",
		value: -660
	}] );
});

QUnit.test( "should tokenize timezone (O)", function( assert ) {
	assert.dateTokenizer( "GMT", "O", cldr, [{
		lexeme: "GMT",
		type: "O",
		value: 0
	}] );
	assert.dateTokenizer( "GMT", "OOOO", cldr, [{
		lexeme: "GMT",
		type: "OOOO",
		value: 0
	}] );
	assert.dateTokenizer( "GMT-3", "O", cldr, [{
		lexeme: "GMT-3",
		type: "O",
		value: 180
	}] );
	assert.dateTokenizer( "GMT-03:00", "OOOO", cldr, [{
		lexeme: "GMT-03:00",
		type: "OOOO",
		value: 180
	}] );
	assert.dateTokenizer( "GMT+11", "O", cldr, [{
		lexeme: "GMT+11",
		type: "O",
		value: -660
	}] );
	assert.dateTokenizer( "GMT+11:00", "OOOO", cldr, [{
		lexeme: "GMT+11:00",
		type: "OOOO",
		value: -660
	}] );
});

QUnit.test( "should tokenize timezone (X)", function( assert ) {
	[ "X", "XX", "XXX", "XXXX", "XXXXX" ].forEach(function( X ) {
		assert.dateTokenizer( "Z", X, cldr, [{
			lexeme: "Z",
			type: X,
			value: 0
		}] );
	});
	assert.dateTokenizer( "-03", "X", cldr, [{
		lexeme: "-03",
		type: "X",
		value: 180
	}] );
	assert.dateTokenizer( "-0300", "XX", cldr, [{
		lexeme: "-0300",
		type: "XX",
		value: 180
	}] );
	assert.dateTokenizer( "-03:00", "XXX", cldr, [{
		lexeme: "-03:00",
		type: "XXX",
		value: 180
	}] );
	assert.dateTokenizer( "-0300", "XXXX", cldr, [{
		lexeme: "-0300",
		type: "XXXX",
		value: 180
	}] );
	assert.dateTokenizer( "-03:00", "XXXXX", cldr, [{
		lexeme: "-03:00",
		type: "XXXXX",
		value: 180
	}] );
	assert.dateTokenizer( "+0530", "XX", cldr, [{
		lexeme: "+0530",
		type: "XX",
		value: -330
	}] );
	assert.dateTokenizer( "+05:30", "XXX", cldr, [{
		lexeme: "+05:30",
		type: "XXX",
		value: -330
	}] );
	assert.dateTokenizer( "+0530", "XXXX", cldr, [{
		lexeme: "+0530",
		type: "XXXX",
		value: -330
	}] );
	assert.dateTokenizer( "+05:30", "XXXXX", cldr, [{
		lexeme: "+05:30",
		type: "XXXXX",
		value: -330
	}] );
	assert.dateTokenizer( "+11", "X", cldr, [{
		lexeme: "+11",
		type: "X",
		value: -660
	}] );
	assert.dateTokenizer( "+1100", "XX", cldr, [{
		lexeme: "+1100",
		type: "XX",
		value: -660
	}] );
	assert.dateTokenizer( "+11:00", "XXX", cldr, [{
		lexeme: "+11:00",
		type: "XXX",
		value: -660
	}] );
	assert.dateTokenizer( "+1100", "XXXX", cldr, [{
		lexeme: "+1100",
		type: "XXXX",
		value: -660
	}] );
	assert.dateTokenizer( "+11:00", "XXXXX", cldr, [{
		lexeme: "+11:00",
		type: "XXXXX",
		value: -660
	}] );
});

});
