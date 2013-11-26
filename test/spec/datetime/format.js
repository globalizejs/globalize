define([
	"globalize/main",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json"
], function( Globalize, enCaGregorian, likelySubtags, timeData, weekData ) {

	var year0 = new Date( -62167190400000 ),
		yearBc = new Date( -62482053600000 ),
		date1 = new Date( 1982, 0, 2, 9, 5, 59 ),
		date2 = new Date( 2010, 8, 15, 17, 35, 7, 369 ),
		date3 = new Date( 1981, 11, 31, 12 ), // thu
		date4 = new Date( 1994, 11, 31, 12 ); // sat

	Globalize.load( enCaGregorian );
	Globalize.load( likelySubtags );
	Globalize.load( timeData );
	Globalize.load( weekData );
	Globalize.locale( "en" );

	module( "Datetime Raw Format" );

	/**
	 *  Era
	 */

	test( "should format era (G|GG|GGG)", function() {
		equal( Globalize.format( date1, { pattern: "G" } ), "AD", "" );
		equal( Globalize.format( year0, { pattern: "G" } ), "AD", "" );
		equal( Globalize.format( yearBc, { pattern: "G" } ), "BC", "" );
		equal( Globalize.format( date1, { pattern: "GG" } ), "AD", "" );
		equal( Globalize.format( year0, { pattern: "GG" } ), "AD", "" );
		equal( Globalize.format( yearBc, { pattern: "GG" } ), "BC", "" );
		equal( Globalize.format( date1, { pattern: "GGG" } ), "AD", "" );
		equal( Globalize.format( year0, { pattern: "GGG" } ), "AD", "" );
		equal( Globalize.format( yearBc, { pattern: "GGG" } ), "BC", "" );
	});

	test( "should format era (GGGG)", function() {
		equal( Globalize.format( date1, { pattern: "GGGG" } ), "Anno Domini", "" );
		equal( Globalize.format( year0, { pattern: "GGGG" } ), "Anno Domini", "" );
		equal( Globalize.format( yearBc, { pattern: "GGGG" } ), "Before Christ", "" );
	});

	test( "should format era (GGGGG)", function() {
		equal( Globalize.format( date1, { pattern: "GGGGG" } ), "A", "" );
		equal( Globalize.format( year0, { pattern: "GGGGG" } ), "A", "" );
		equal( Globalize.format( yearBc, { pattern: "GGGGG" } ), "B", "" );
	});

	/**
	 *  Year
	 */

	test( "should format year (y) with no padding", function() {
		equal( Globalize.format( date2, { pattern: "y" } ), "2010", "" );
		equal( Globalize.format( date1, { pattern: "y" } ), "1982", "" );
		equal( Globalize.format( year0, { pattern: "y" } ), "0", "" );
	});

	test( "should format year (yy) with padding, and limit 2 digits", function() {
		equal( Globalize.format( date2, { pattern: "yy" } ), "10", "" );
		equal( Globalize.format( date1, { pattern: "yy" } ), "82", "" );
		equal( Globalize.format( year0, { pattern: "yy" } ), "00", "" );
	});

	test( "should format year (yyy+) with padding", function() {
		equal( Globalize.format( date1, { pattern: "yyy" } ), "1982", "" );
		equal( Globalize.format( date2, { pattern: "yyy" } ), "2010", "" );
		equal( Globalize.format( year0, { pattern: "yyyy" } ), "0000", "" );
		equal( Globalize.format( date1, { pattern: "yyyyy" } ), "01982", "" );
		equal( Globalize.format( date2, { pattern: "yyyyy" } ), "02010", "" );
	});

	test( "should format year in \"week of year\" (Y) with no padding", function() {
		equal( Globalize.format( date3, { pattern: "Y" } ), "1982", "" );
		equal( Globalize.format( date4, { pattern: "Y" } ), "1994", "" );
	});

	test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function() {
		equal( Globalize.format( date3, { pattern: "YY" } ), "82", "" );
		equal( Globalize.format( date4, { pattern: "YY" } ), "94", "" );
	});

	test( "should format year in \"week of year\" (YYY+) with padding", function() {
		equal( Globalize.format( date3, { pattern: "YYY" } ), "1982", "" );
		equal( Globalize.format( date4, { pattern: "YYY" } ), "1994", "" );
		equal( Globalize.format( date3, { pattern: "YYYYY" } ), "01982", "" );
		equal( Globalize.format( date4, { pattern: "YYYYY" } ), "01994", "" );
	});

	/**
	 *  Quarter
	 */

	test( "should format quarter (Q|q) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "Q" } ), "1", "" );
		equal( Globalize.format( date2, { pattern: "Q" } ), "3", "" );
		equal( Globalize.format( date1, { pattern: "q" } ), "1", "" );
		equal( Globalize.format( date2, { pattern: "q" } ), "3", "" );
	});

	test( "should format quarter (QQ|qq) with padding", function() {
		equal( Globalize.format( date1, { pattern: "QQ" } ), "01", "" );
		equal( Globalize.format( date2, { pattern: "QQ" } ), "03", "" );
		equal( Globalize.format( date1, { pattern: "qq" } ), "01", "" );
		equal( Globalize.format( date2, { pattern: "qq" } ), "03", "" );
	});

	test( "should format quarter (QQQ|qqq)", function() {
		equal( Globalize.format( date1, { pattern: "QQQ" } ), "Q1", "" );
		equal( Globalize.format( date2, { pattern: "QQQ" } ), "Q3", "" );
		equal( Globalize.format( date1, { pattern: "qqq" } ), "Q1", "" );
		equal( Globalize.format( date2, { pattern: "qqq" } ), "Q3", "" );
	});

	test( "should format quarter (QQQQ|qqqq) with padding", function() {
		equal( Globalize.format( date1, { pattern: "QQQQ" } ), "1st quarter", "" );
		equal( Globalize.format( date2, { pattern: "QQQQ" } ), "3rd quarter", "" );
		equal( Globalize.format( date1, { pattern: "qqqq" } ), "1st quarter", "" );
		equal( Globalize.format( date2, { pattern: "qqqq" } ), "3rd quarter", "" );
	});

	/**
	 *  Month
	 */

	test( "should format month (M|L) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "M" } ), "1", "" );
		equal( Globalize.format( date2, { pattern: "M" } ), "9", "" );
		equal( Globalize.format( date1, { pattern: "L" } ), "1", "" );
		equal( Globalize.format( date2, { pattern: "L" } ), "9", "" );
	});

	test( "should format month (MM|LL) with padding", function() {
		equal( Globalize.format( date1, { pattern: "MM" } ), "01", "" );
		equal( Globalize.format( date2, { pattern: "MM" } ), "09", "" );
		equal( Globalize.format( date1, { pattern: "LL" } ), "01", "" );
		equal( Globalize.format( date2, { pattern: "LL" } ), "09", "" );
	});

	test( "should format month (MMM|LLL)", function() {
		equal( Globalize.format( date1, { pattern: "MMM" } ), "Jan", "" );
		equal( Globalize.format( date2, { pattern: "MMM" } ), "Sep", "" );
		equal( Globalize.format( date1, { pattern: "LLL" } ), "Jan", "" );
		equal( Globalize.format( date2, { pattern: "LLL" } ), "Sep", "" );
	});

	test( "should format month (MMMM|LLLL)", function() {
		equal( Globalize.format( date1, { pattern: "MMMM" } ), "January", "" );
		equal( Globalize.format( date2, { pattern: "MMMM" } ), "September", "" );
		equal( Globalize.format( date1, { pattern: "LLLL" } ), "January", "" );
		equal( Globalize.format( date2, { pattern: "LLLL" } ), "September", "" );
	});

	test( "should format month (MMMMM|LLLLL)", function() {
		equal( Globalize.format( date1, { pattern: "MMMMM" } ), "J", "" );
		equal( Globalize.format( date2, { pattern: "MMMMM" } ), "S", "" );
		equal( Globalize.format( date1, { pattern: "LLLLL" } ), "J", "" );
		equal( Globalize.format( date2, { pattern: "LLLLL" } ), "S", "" );
	});

	/**
	 *  Week
	 */

	test( "should format week of year (w) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "w" } ), "1", "" );
		equal( Globalize.format( date2, { pattern: "w" } ), "38", "" );
	});

	test( "should format week of year (ww) with padding", function() {
		equal( Globalize.format( date1, { pattern: "ww" } ), "01", "" );
		equal( Globalize.format( date2, { pattern: "ww" } ), "38", "" );
	});

	test( "should format week of month (W)", function() {
		equal( Globalize.format( date1, { pattern: "W" } ), "1", "" );
		equal( Globalize.format( date2, { pattern: "W" } ), "3", "" );
		equal( Globalize.format( date3, { pattern: "W" } ), "5", "" );
	});

	/**
	 *  Day
	 */

	test( "should format day (d) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "d" } ), "2", "" );
		equal( Globalize.format( date2, { pattern: "d" } ), "15", "" );
	});

	test( "should format day (dd) with padding", function() {
		equal( Globalize.format( date1, { pattern: "dd" } ), "02", "" );
		equal( Globalize.format( date2, { pattern: "dd" } ), "15", "" );
	});

	test( "should format day of year (D) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "D" } ), "2", "" );
		equal( Globalize.format( date2, { pattern: "D" } ), "258", "" );
	});

	test( "should format day of year (DD|DDD) with padding", function() {
		equal( Globalize.format( date1, { pattern: "DD" } ), "02", "" );
		equal( Globalize.format( date1, { pattern: "DDD" } ), "002", "" );
		equal( Globalize.format( date2, { pattern: "DD" } ), "258", "" );
	});

	test( "should format day of week in month (F)", function() {
		equal( Globalize.format( date1, { pattern: "F" } ), "1", "" );
		equal( Globalize.format( date2, { pattern: "F" } ), "3", "" );
	});

	/**
	 *  Week day
	 */

	test( "should format local day of week (e|c) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "e" } ), "7", "" );
		equal( Globalize.format( date2, { pattern: "e" } ), "4", "" );
		equal( Globalize.format( date1, { pattern: "c" } ), "7", "" );
		equal( Globalize.format( date2, { pattern: "c" } ), "4", "" );
	});

	test( "should format local day of week (ee|cc) with padding", function() {
		equal( Globalize.format( date1, { pattern: "ee" } ), "07", "" );
		equal( Globalize.format( date2, { pattern: "ee" } ), "04", "" );
		equal( Globalize.format( date1, { pattern: "cc" } ), "07", "" );
		equal( Globalize.format( date2, { pattern: "cc" } ), "04", "" );
	});

	test( "should format local day of week (E|EE|EEE|eee|ccc)", function() {
		equal( Globalize.format( date1, { pattern: "E" } ), "Sat", "" );
		equal( Globalize.format( date2, { pattern: "E" } ), "Wed", "" );
		equal( Globalize.format( date1, { pattern: "EE" } ), "Sat", "" );
		equal( Globalize.format( date2, { pattern: "EE" } ), "Wed", "" );
		equal( Globalize.format( date1, { pattern: "EEE" } ), "Sat", "" );
		equal( Globalize.format( date2, { pattern: "EEE" } ), "Wed", "" );
		equal( Globalize.format( date1, { pattern: "eee" } ), "Sat", "" );
		equal( Globalize.format( date2, { pattern: "eee" } ), "Wed", "" );
		equal( Globalize.format( date1, { pattern: "ccc" } ), "Sat", "" );
		equal( Globalize.format( date2, { pattern: "ccc" } ), "Wed", "" );
	});

	test( "should format local day of week (EEEE|eeee|cccc)", function() {
		equal( Globalize.format( date1, { pattern: "EEEE" } ), "Saturday", "" );
		equal( Globalize.format( date2, { pattern: "EEEE" } ), "Wednesday", "" );
		equal( Globalize.format( date1, { pattern: "eeee" } ), "Saturday", "" );
		equal( Globalize.format( date2, { pattern: "eeee" } ), "Wednesday", "" );
		equal( Globalize.format( date1, { pattern: "cccc" } ), "Saturday", "" );
		equal( Globalize.format( date2, { pattern: "cccc" } ), "Wednesday", "" );
	});

	test( "should format local day of week (EEEEE|eeeee|ccccc)", function() {
		equal( Globalize.format( date1, { pattern: "EEEEE" } ), "S", "" );
		equal( Globalize.format( date2, { pattern: "EEEEE" } ), "W", "" );
		equal( Globalize.format( date1, { pattern: "eeeee" } ), "S", "" );
		equal( Globalize.format( date2, { pattern: "eeeee" } ), "W", "" );
		equal( Globalize.format( date1, { pattern: "ccccc" } ), "S", "" );
		equal( Globalize.format( date2, { pattern: "ccccc" } ), "W", "" );
	});

	test( "should format local day of week (EEEEEE|eeeeee|cccccc)", function() {
		equal( Globalize.format( date1, { pattern: "EEEEEE" } ), "Sa", "" );
		equal( Globalize.format( date2, { pattern: "EEEEEE" } ), "We", "" );
		equal( Globalize.format( date1, { pattern: "eeeeee" } ), "Sa", "" );
		equal( Globalize.format( date2, { pattern: "eeeeee" } ), "We", "" );
		equal( Globalize.format( date1, { pattern: "cccccc" } ), "Sa", "" );
		equal( Globalize.format( date2, { pattern: "cccccc" } ), "We", "" );
	});

	// TODO all

	/**
	 *  Period
	 */

	test( "should format period (a)", function() {
		equal( Globalize.format( date1, { pattern: "a" } ), "AM", "" );
		equal( Globalize.format( date2, { pattern: "a" } ), "PM", "" );
	});

	/**
	 *  Hour
	 */

	test( "should format hour (h) using 12-hour-cycle [1-12] with no padding", function() {
		equal( Globalize.format( date1, { pattern: "h" } ), "9", "" );
		equal( Globalize.format( date2, { pattern: "h" } ), "5", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "h" } ), "12", "" );
	});

	test( "should format hour (hh) using 12-hour-cycle [1-12] with padding", function() {
		equal( Globalize.format( date1, { pattern: "hh" } ), "09", "" );
		equal( Globalize.format( date2, { pattern: "hh" } ), "05", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "hh" } ), "12", "" );
	});

	test( "should format hour (H) using 24-hour-cycle [0-23] with no padding", function() {
		equal( Globalize.format( date1, { pattern: "H" } ), "9", "" );
		equal( Globalize.format( date2, { pattern: "H" } ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "H" } ), "0", "" );
	});

	test( "should format hour (HH) using 24-hour-cycle [0-23] with padding", function() {
		equal( Globalize.format( date1, { pattern: "HH" } ), "09", "" );
		equal( Globalize.format( date2, { pattern: "HH" } ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "HH" } ), "00", "" );
	});

	test( "should format hour (K) using 12-hour-cycle [0-11] with no padding", function() {
		equal( Globalize.format( date1, { pattern: "K" } ), "9", "" );
		equal( Globalize.format( date2, { pattern: "K" } ), "5", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "K" } ), "0", "" );
	});

	test( "should format hour (KK) using 12-hour-cycle [0-11] with padding", function() {
		equal( Globalize.format( date1, { pattern: "KK" } ), "09", "" );
		equal( Globalize.format( date2, { pattern: "KK" } ), "05", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "KK" } ), "00", "" );
	});

	test( "should format hour (k) using 24-hour-cycle [1-24] with no padding", function() {
		equal( Globalize.format( date1, { pattern: "k" } ), "9", "" );
		equal( Globalize.format( date2, { pattern: "k" } ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "k" } ), "24", "" );
	});

	test( "should format hour (kk) using 24-hour-cycle [1-24] with padding", function() {
		equal( Globalize.format( date1, { pattern: "kk" } ), "09", "" );
		equal( Globalize.format( date2, { pattern: "kk" } ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "kk" } ), "24", "" );
	});

	test( "should format hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function() {
		equal( Globalize.format( date2, { pattern: "j" } ), "5", "" );
		equal( Globalize.format( date2, { pattern: "j" }, "pt-BR" ), "17", "" );
		equal( Globalize.format( date2, { pattern: "j" }, "de" ), "17", "" );
		equal( Globalize.format( date2, { pattern: "j" }, "en-IN" ), "5", "" );
		equal( Globalize.format( date2, { pattern: "j" }, "en-GB" ), "17", "" );
		equal( Globalize.format( date2, { pattern: "j" }, "ru" ), "17", "" );
	});

	test( "should format hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function() {
		equal( Globalize.format( date1, { pattern: "jj" } ), "09", "" );
		equal( Globalize.format( date2, { pattern: "jj" } ), "05", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), { pattern: "jj" } ), "12", "" );
	});

	/**
	 *  Minute
	 */

	test( "should format minute (m) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "m" } ), "5", "" );
		equal( Globalize.format( date2, { pattern: "m" } ), "35", "" );
	});

	test( "should format minute (mm) with padding", function() {
		equal( Globalize.format( date1, { pattern: "mm" } ), "05", "" );
		equal( Globalize.format( date2, { pattern: "mm" } ), "35", "" );
	});

	/**
	 *  Second
	 */

	test( "should format second (s) with no padding", function() {
		equal( Globalize.format( date1, { pattern: "s" } ), "59", "" );
		equal( Globalize.format( date2, { pattern: "s" } ), "7", "" );
	});

	test( "should format second (ss) with padding", function() {
		equal( Globalize.format( date1, { pattern: "ss" } ), "59", "" );
		equal( Globalize.format( date2, { pattern: "ss" } ), "07", "" );
	});

	test( "should format various milliseconds (S+)", function() {
		equal( Globalize.format( date2, { pattern: "S" } ), "4", "" );
		equal( Globalize.format( date2, { pattern: "SS" } ), "37", "" );
		equal( Globalize.format( date2, { pattern: "SSS" } ), "369", "" );
		equal( Globalize.format( date2, { pattern: "SSSS" } ), "3690", "" );
		equal( Globalize.format( date2, { pattern: "SSSSS" } ), "36900", "" );
	});

	test( "should format various milliseconds (A+)", function() {
		equal( Globalize.format( date2, { pattern: "A" } ), "633074", "" );
		equal( Globalize.format( date2, { pattern: "AA" } ), "6330737", "" );
		equal( Globalize.format( date2, { pattern: "AAA" } ), "63307369", "" );
		equal( Globalize.format( date2, { pattern: "AAAA" } ), "633073690", "" );
		equal( Globalize.format( date2, { pattern: "AAAAA" } ), "6330736900", "" );
	});

	/**
	 *  Zone
	 */

	// TODO all

	module( "Datetime preset Formats" );

	test( "should format skeleton", function() {
		equal( Globalize.format( date2, { skeleton: "d" } ), "15", "" );
		equal( Globalize.format( date2, { skeleton: "Ed" } ), "15 Wed", "" );
		equal( Globalize.format( date2, { skeleton: "Ehms" } ), "Wed 5:35:07 PM", "" );
		equal( Globalize.format( date2, { skeleton: "GyMMMEd" } ), "Wed, Sep 15, 2010 AD", "" );
		equal( Globalize.format( date2, { skeleton: "yMd" } ), "9/15/2010", "" );
		equal( Globalize.format( date2, { skeleton: "yQQQ" } ), "Q3 2010", "" );

		// Passed as string
		equal( Globalize.format( date2, "GyMMMEd" ), "Wed, Sep 15, 2010 AD", "" );
	});

	test( "should format time presets", function() {
		equal( Globalize.format( date2, { time: "medium" } ), "5:35:07 PM", "" );
		equal( Globalize.format( date2, { time: "short" } ), "5:35 PM", "" );
	});

	test( "should format date presets", function() {
		equal( Globalize.format( date2, { date: "full" } ), "Wednesday, September 15, 2010", "" );
		equal( Globalize.format( date2, { date: "long" } ), "September 15, 2010", "" );
		equal( Globalize.format( date2, { date: "medium" } ), "Sep 15, 2010", "" );
		equal( Globalize.format( date2, { date: "short" } ), "9/15/10", "" );
	});

	test( "should format datetime presets", function() {
		equal( Globalize.format( date2, { datetime: "medium" } ), "Sep 15, 2010, 5:35:07 PM", "" );
	});

});
