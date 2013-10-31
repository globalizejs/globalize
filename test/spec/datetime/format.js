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

	module( "Datetime Format" );

	/**
	 *  Era
	 */

	test( "should format era (G|GG|GGG)", function() {
		equal( Globalize.format( date1, "G" ), "AD", "" );
		equal( Globalize.format( year0, "G" ), "AD", "" );
		equal( Globalize.format( yearBc, "G" ), "BC", "" );
		equal( Globalize.format( date1, "GG" ), "AD", "" );
		equal( Globalize.format( year0, "GG" ), "AD", "" );
		equal( Globalize.format( yearBc, "GG" ), "BC", "" );
		equal( Globalize.format( date1, "GGG" ), "AD", "" );
		equal( Globalize.format( year0, "GGG" ), "AD", "" );
		equal( Globalize.format( yearBc, "GGG" ), "BC", "" );
	});

	test( "should format era (GGGG)", function() {
		equal( Globalize.format( date1, "GGGG" ), "Anno Domini", "" );
		equal( Globalize.format( year0, "GGGG" ), "Anno Domini", "" );
		equal( Globalize.format( yearBc, "GGGG" ), "Before Christ", "" );
	});

	test( "should format era (GGGGG)", function() {
		equal( Globalize.format( date1, "GGGGG" ), "A", "" );
		equal( Globalize.format( year0, "GGGGG" ), "A", "" );
		equal( Globalize.format( yearBc, "GGGGG" ), "B", "" );
	});

	/**
	 *  Year
	 */

	test( "should format year (y) with no padding", function() {
		equal( Globalize.format( date2, "y" ), "2010", "" );
		equal( Globalize.format( date1, "y" ), "1982", "" );
		equal( Globalize.format( year0, "y" ), "0", "" );
	});

	test( "should format year (yy) with padding, and limit 2 digits", function() {
		equal( Globalize.format( date2, "yy" ), "10", "" );
		equal( Globalize.format( date1, "yy" ), "82", "" );
		equal( Globalize.format( year0, "yy" ), "00", "" );
	});

	test( "should format year (yyy+) with padding", function() {
		equal( Globalize.format( date1, "yyy" ), "1982", "" );
		equal( Globalize.format( date2, "yyy" ), "2010", "" );
		equal( Globalize.format( year0, "yyyy" ), "0000", "" );
		equal( Globalize.format( date1, "yyyyy" ), "01982", "" );
		equal( Globalize.format( date2, "yyyyy" ), "02010", "" );
	});

	test( "should format year in \"week of year\" (Y) with no padding", function() {
		equal( Globalize.format( date3, "Y" ), "1982", "" );
		equal( Globalize.format( date4, "Y" ), "1994", "" );
	});

	test( "should format year in \"week of year\" (YY) with padding, and limit 2 digits", function() {
		equal( Globalize.format( date3, "YY" ), "82", "" );
		equal( Globalize.format( date4, "YY" ), "94", "" );
	});

	test( "should format year in \"week of year\" (YYY+) with padding", function() {
		equal( Globalize.format( date3, "YYY" ), "1982", "" );
		equal( Globalize.format( date4, "YYY" ), "1994", "" );
		equal( Globalize.format( date3, "YYYYY" ), "01982", "" );
		equal( Globalize.format( date4, "YYYYY" ), "01994", "" );
	});

	/**
	 *  Quarter
	 */

	test( "should format quarter (Q|q) with no padding", function() {
		equal( Globalize.format( date1, "Q" ), "1", "" );
		equal( Globalize.format( date2, "Q" ), "3", "" );
		equal( Globalize.format( date1, "q" ), "1", "" );
		equal( Globalize.format( date2, "q" ), "3", "" );
	});

	test( "should format quarter (QQ|qq) with padding", function() {
		equal( Globalize.format( date1, "QQ" ), "01", "" );
		equal( Globalize.format( date2, "QQ" ), "03", "" );
		equal( Globalize.format( date1, "qq" ), "01", "" );
		equal( Globalize.format( date2, "qq" ), "03", "" );
	});

	test( "should format quarter (QQQ|qqq)", function() {
		equal( Globalize.format( date1, "QQQ" ), "Q1", "" );
		equal( Globalize.format( date2, "QQQ" ), "Q3", "" );
		equal( Globalize.format( date1, "qqq" ), "Q1", "" );
		equal( Globalize.format( date2, "qqq" ), "Q3", "" );
	});

	test( "should format quarter (QQQQ|qqqq) with padding", function() {
		equal( Globalize.format( date1, "QQQQ" ), "1st quarter", "" );
		equal( Globalize.format( date2, "QQQQ" ), "3rd quarter", "" );
		equal( Globalize.format( date1, "qqqq" ), "1st quarter", "" );
		equal( Globalize.format( date2, "qqqq" ), "3rd quarter", "" );
	});

	/**
	 *  Month
	 */

	test( "should format month (M|L) with no padding", function() {
		equal( Globalize.format( date1, "M" ), "1", "" );
		equal( Globalize.format( date2, "M" ), "9", "" );
		equal( Globalize.format( date1, "L" ), "1", "" );
		equal( Globalize.format( date2, "L" ), "9", "" );
	});

	test( "should format month (MM|LL) with padding", function() {
		equal( Globalize.format( date1, "MM" ), "01", "" );
		equal( Globalize.format( date2, "MM" ), "09", "" );
		equal( Globalize.format( date1, "LL" ), "01", "" );
		equal( Globalize.format( date2, "LL" ), "09", "" );
	});

	test( "should format month (MMM|LLL)", function() {
		equal( Globalize.format( date1, "MMM" ), "Jan", "" );
		equal( Globalize.format( date2, "MMM" ), "Sep", "" );
		equal( Globalize.format( date1, "LLL" ), "Jan", "" );
		equal( Globalize.format( date2, "LLL" ), "Sep", "" );
	});

	test( "should format month (MMMM|LLLL)", function() {
		equal( Globalize.format( date1, "MMMM" ), "January", "" );
		equal( Globalize.format( date2, "MMMM" ), "September", "" );
		equal( Globalize.format( date1, "LLLL" ), "January", "" );
		equal( Globalize.format( date2, "LLLL" ), "September", "" );
	});

	test( "should format month (MMMMM|LLLLL)", function() {
		equal( Globalize.format( date1, "MMMMM" ), "J", "" );
		equal( Globalize.format( date2, "MMMMM" ), "S", "" );
		equal( Globalize.format( date1, "LLLLL" ), "J", "" );
		equal( Globalize.format( date2, "LLLLL" ), "S", "" );
	});

	/**
	 *  Week
	 */

	test( "should format week of year (w) with no padding", function() {
		equal( Globalize.format( date1, "w" ), "1", "" );
		equal( Globalize.format( date2, "w" ), "38", "" );
	});

	test( "should format week of year (ww) with padding", function() {
		equal( Globalize.format( date1, "ww" ), "01", "" );
		equal( Globalize.format( date2, "ww" ), "38", "" );
	});

	test( "should format week of month (W)", function() {
		equal( Globalize.format( date1, "W" ), "1", "" );
		equal( Globalize.format( date2, "W" ), "3", "" );
		equal( Globalize.format( date3, "W" ), "5", "" );
	});

	/**
	 *  Day
	 */

	test( "should format day (d) with no padding", function() {
		equal( Globalize.format( date1, "d" ), "2", "" );
		equal( Globalize.format( date2, "d" ), "15", "" );
	});

	test( "should format day (dd) with padding", function() {
		equal( Globalize.format( date1, "dd" ), "02", "" );
		equal( Globalize.format( date2, "dd" ), "15", "" );
	});

	test( "should format day of year (D) with no padding", function() {
		equal( Globalize.format( date1, "D" ), "2", "" );
		equal( Globalize.format( date2, "D" ), "258", "" );
	});

	test( "should format day of year (DD|DDD) with padding", function() {
		equal( Globalize.format( date1, "DD" ), "02", "" );
		equal( Globalize.format( date1, "DDD" ), "002", "" );
		equal( Globalize.format( date2, "DD" ), "258", "" );
	});

	test( "should format day of week in month (F)", function() {
		equal( Globalize.format( date1, "F" ), "1", "" );
		equal( Globalize.format( date2, "F" ), "3", "" );
	});

	/**
	 *  Week day
	 */

	test( "should format local day of week (e|c) with no padding", function() {
		equal( Globalize.format( date1, "e" ), "7", "" );
		equal( Globalize.format( date2, "e" ), "4", "" );
		equal( Globalize.format( date1, "c" ), "7", "" );
		equal( Globalize.format( date2, "c" ), "4", "" );
	});

	test( "should format local day of week (ee|cc) with padding", function() {
		equal( Globalize.format( date1, "ee" ), "07", "" );
		equal( Globalize.format( date2, "ee" ), "04", "" );
		equal( Globalize.format( date1, "cc" ), "07", "" );
		equal( Globalize.format( date2, "cc" ), "04", "" );
	});

	test( "should format local day of week (E|EE|EEE|eee|ccc)", function() {
		equal( Globalize.format( date1, "E" ), "Sat", "" );
		equal( Globalize.format( date2, "E" ), "Wed", "" );
		equal( Globalize.format( date1, "EE" ), "Sat", "" );
		equal( Globalize.format( date2, "EE" ), "Wed", "" );
		equal( Globalize.format( date1, "EEE" ), "Sat", "" );
		equal( Globalize.format( date2, "EEE" ), "Wed", "" );
		equal( Globalize.format( date1, "eee" ), "Sat", "" );
		equal( Globalize.format( date2, "eee" ), "Wed", "" );
		equal( Globalize.format( date1, "ccc" ), "Sat", "" );
		equal( Globalize.format( date2, "ccc" ), "Wed", "" );
	});

	test( "should format local day of week (EEEE|eeee|cccc)", function() {
		equal( Globalize.format( date1, "EEEE" ), "Saturday", "" );
		equal( Globalize.format( date2, "EEEE" ), "Wednesday", "" );
		equal( Globalize.format( date1, "eeee" ), "Saturday", "" );
		equal( Globalize.format( date2, "eeee" ), "Wednesday", "" );
		equal( Globalize.format( date1, "cccc" ), "Saturday", "" );
		equal( Globalize.format( date2, "cccc" ), "Wednesday", "" );
	});

	test( "should format local day of week (EEEEE|eeeee|ccccc)", function() {
		equal( Globalize.format( date1, "EEEEE" ), "S", "" );
		equal( Globalize.format( date2, "EEEEE" ), "W", "" );
		equal( Globalize.format( date1, "eeeee" ), "S", "" );
		equal( Globalize.format( date2, "eeeee" ), "W", "" );
		equal( Globalize.format( date1, "ccccc" ), "S", "" );
		equal( Globalize.format( date2, "ccccc" ), "W", "" );
	});

	test( "should format local day of week (EEEEEE|eeeeee|cccccc)", function() {
		equal( Globalize.format( date1, "EEEEEE" ), "Sa", "" );
		equal( Globalize.format( date2, "EEEEEE" ), "We", "" );
		equal( Globalize.format( date1, "eeeeee" ), "Sa", "" );
		equal( Globalize.format( date2, "eeeeee" ), "We", "" );
		equal( Globalize.format( date1, "cccccc" ), "Sa", "" );
		equal( Globalize.format( date2, "cccccc" ), "We", "" );
	});

	// TODO all

	/**
	 *  Period
	 */

	test( "should format period (a)", function() {
		equal( Globalize.format( date1, "a" ), "AM", "" );
		equal( Globalize.format( date2, "a" ), "PM", "" );
	});

	/**
	 *  Hour
	 */

	test( "should format hour (h) using 12-hour-cycle [1-12] with no padding", function() {
		equal( Globalize.format( date1, "h" ), "9", "" );
		equal( Globalize.format( date2, "h" ), "5", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "h" ), "12", "" );
	});

	test( "should format hour (hh) using 12-hour-cycle [1-12] with padding", function() {
		equal( Globalize.format( date1, "hh" ), "09", "" );
		equal( Globalize.format( date2, "hh" ), "05", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "hh" ), "12", "" );
	});

	test( "should format hour (H) using 24-hour-cycle [0-23] with no padding", function() {
		equal( Globalize.format( date1, "H" ), "9", "" );
		equal( Globalize.format( date2, "H" ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "H" ), "0", "" );
	});

	test( "should format hour (HH) using 24-hour-cycle [0-23] with padding", function() {
		equal( Globalize.format( date1, "HH" ), "09", "" );
		equal( Globalize.format( date2, "HH" ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "HH" ), "00", "" );
	});

	test( "should format hour (K) using 12-hour-cycle [0-11] with no padding", function() {
		equal( Globalize.format( date1, "K" ), "9", "" );
		equal( Globalize.format( date2, "K" ), "5", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "K" ), "0", "" );
	});

	test( "should format hour (KK) using 12-hour-cycle [0-11] with padding", function() {
		equal( Globalize.format( date1, "KK" ), "09", "" );
		equal( Globalize.format( date2, "KK" ), "05", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "KK" ), "00", "" );
	});

	test( "should format hour (k) using 24-hour-cycle [1-24] with no padding", function() {
		equal( Globalize.format( date1, "k" ), "9", "" );
		equal( Globalize.format( date2, "k" ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "k" ), "24", "" );
	});

	test( "should format hour (kk) using 24-hour-cycle [1-24] with padding", function() {
		equal( Globalize.format( date1, "kk" ), "09", "" );
		equal( Globalize.format( date2, "kk" ), "17", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "kk" ), "24", "" );
	});

	test( "should format hour (j) using preferred hour format for the locale (h, H, K, or k) with no padding", function() {
		equal( Globalize.format( date2, "j" ), "5", "" );
		equal( Globalize.format( date2, "j", "pt-BR" ), "17", "" );
		equal( Globalize.format( date2, "j", "de" ), "17", "" );
		equal( Globalize.format( date2, "j", "en-IN" ), "5", "" );
		equal( Globalize.format( date2, "j", "en-GB" ), "17", "" );
		equal( Globalize.format( date2, "j", "ru" ), "17", "" );
	});

	test( "should format hour (jj) using preferred hour format for the locale (h, H, K, or k) with padding", function() {
		equal( Globalize.format( date1, "jj" ), "09", "" );
		equal( Globalize.format( date2, "jj" ), "05", "" );
		equal( Globalize.format( new Date( 0, 0, 0, 0 ), "jj" ), "12", "" );
	});

	/**
	 *  Minute
	 */

	test( "should format minute (m) with no padding", function() {
		equal( Globalize.format( date1, "m" ), "5", "" );
		equal( Globalize.format( date2, "m" ), "35", "" );
	});

	test( "should format minute (mm) with padding", function() {
		equal( Globalize.format( date1, "mm" ), "05", "" );
		equal( Globalize.format( date2, "mm" ), "35", "" );
	});

	/**
	 *  Second
	 */

	test( "should format second (s) with no padding", function() {
		equal( Globalize.format( date1, "s" ), "59", "" );
		equal( Globalize.format( date2, "s" ), "7", "" );
	});

	test( "should format second (ss) with padding", function() {
		equal( Globalize.format( date1, "ss" ), "59", "" );
		equal( Globalize.format( date2, "ss" ), "07", "" );
	});

	test( "should format various milliseconds (S+)", function() {
		equal( Globalize.format( date2, "S" ), "4", "" );
		equal( Globalize.format( date2, "SS" ), "37", "" );
		equal( Globalize.format( date2, "SSS" ), "369", "" );
		equal( Globalize.format( date2, "SSSS" ), "3690", "" );
		equal( Globalize.format( date2, "SSSSS" ), "36900", "" );
	});

	test( "should format various milliseconds (A+)", function() {
		equal( Globalize.format( date2, "A" ), "633074", "" );
		equal( Globalize.format( date2, "AA" ), "6330737", "" );
		equal( Globalize.format( date2, "AAA" ), "63307369", "" );
		equal( Globalize.format( date2, "AAAA" ), "633073690", "" );
		equal( Globalize.format( date2, "AAAAA" ), "6330736900", "" );
	});

	/**
	 *  Zone
	 */

	// TODO all

});
