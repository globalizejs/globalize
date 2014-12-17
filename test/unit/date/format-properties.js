define([
	"cldr",
	"src/date/format-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, enCaGregorian, likelySubtags, timeData, weekData ) {

var cldr;

Cldr.load(
	enCaGregorian,
	likelySubtags,
	timeData,
	weekData
);

cldr = new Cldr( "en" );

QUnit.module( "Date Format Properties" );

/**
 *  Era
 */

QUnit.test( "should return eras property for (G|GG|GGG|GGGG|GGGGG)", function( assert ) {
	[ "G", "GG", "GGG", "GGGG", "GGGGG" ].forEach(function( pattern ) {
		assert.ok( "eras" in properties( pattern, cldr ) );
	});
});

/**
 *  Year
 */

QUnit.test( "should return appropriate properties for year in \"week of year\" (Y+)",
		function( assert ) {
	[ "Y", "YY", "YYY", "YYYYY" ].forEach(function( pattern ) {
		assert.ok( "firstDay" in properties( pattern, cldr ) );
		assert.ok( "minDays" in properties( pattern, cldr ) );
	});
});

/**
 *  Quarter
 */

QUnit.test( "should return quarters properties for quarter (QQQ|QQQQ|qqq|qqqq)",
		function( assert ) {
	[ "QQQ", "qqq", "QQQQ", "qqqq" ].forEach(function( pattern ) {
		var character = pattern.charAt( 0 ),
			length = pattern.length;
		assert.ok( "quarters" in properties( pattern, cldr ) );
		assert.ok( character in properties( pattern, cldr ).quarters );
		assert.ok( length in properties( pattern, cldr ).quarters[ character ] );
	});
});

/**
 *  Month
 */

QUnit.test( "should return months properties for month (MMM|MMMM|MMMMM|LLL|LLLL|LLLLL)",
		function( assert ) {
	[ "MMM", "LLL", "MMMM", "LLLL", "MMMMM", "LLLLL" ].forEach(function( pattern ) {
		var character = pattern.charAt( 0 ),
			length = pattern.length;
		assert.ok( "months" in properties( pattern, cldr ) );
		assert.ok( character in properties( pattern, cldr ).months );
		assert.ok( length in properties( pattern, cldr ).months[ character ] );
	});
});

/**
 *  Week
 */

QUnit.test( "should return appropriate properties for week of year (w) or week of month (W)",
		function( assert ) {
	[ "w", "W" ].forEach(function( pattern ) {
		assert.ok( "firstDay" in properties( pattern, cldr ) );
		assert.ok( "minDays" in properties( pattern, cldr ) );
	});
});

/**
 *  Week day
 */

QUnit.test( "should return firstDay property for day of week (e|ee|c|cc)", function( assert ) {
	[ "e", "c", "ee", "cc" ].forEach(function( pattern ) {
		assert.ok( "firstDay" in properties( pattern, cldr ) );
	});
});

QUnit.test( "should return days properties for day of week (eee..eeeeee|ccc..cccccc)",
		function( assert ) {
	[ "eee", "ccc", "eeee", "cccc", "eeeee", "ccccc", "eeeeee", "cccccc" ].forEach(
			function( pattern ) {
		var character = pattern.charAt( 0 ),
			length = pattern.length;
		assert.ok( "days" in properties( pattern, cldr ) );
		assert.ok( character in properties( pattern, cldr ).days );
		assert.ok( length in properties( pattern, cldr ).days[ character ] );
	});
});

/**
 *  Period
 */

QUnit.test( "should return dayPeriods property for period (a)", function( assert ) {
	assert.ok( "dayPeriods" in properties( "a", cldr ) );
});

});
