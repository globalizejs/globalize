define([
	"cldr",
	"src/date/format-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/en-GB/ca-gregorian.json",
	"json!cldr-data/main/en-GB/timeZoneNames.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!cldr-data/supplemental/metaZones.json",
	"json!iana-tz-data.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, enCaGregorian, enTimeZoneNames, enGbCaGregorian, enGbTimeZoneNames,
	likelySubtags, timeData, weekData, metaZones, ianaTimezoneData ) {

var cldr;

Cldr.load(
	enCaGregorian,
	enTimeZoneNames,
	enGbCaGregorian,
	enGbTimeZoneNames,
	likelySubtags,
	timeData,
	weekData,
	metaZones
);

// Needed for globalizeDate.
Cldr.load({
	"globalize-iana": ianaTimezoneData
});

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
	assert.equal( Object.keys(properties( "a", cldr ).dayPeriods).length, 2 );
});

/**
 *  Zone
 */

QUnit.test( "should return standardTzName and daylightTzName properties for zone (z|zz|zzz|zzzz)",
		function( assert ) {
	var timeZone,
		enGb = new Cldr( "en-GB" );

	timeZone = "America/Los_Angeles";
	[ "z", "zz", "zzz" ].forEach(function( pattern ) {
		assert.equal( properties( pattern, cldr, timeZone ).standardTzName, "PST" );
		assert.equal( properties( pattern, cldr, timeZone ).daylightTzName, "PDT" );
	});
	[ "zzzz" ].forEach(function( pattern ) {
		assert.equal( properties( pattern, cldr, timeZone ).standardTzName, "Pacific Standard Time" );
		assert.equal( properties( pattern, cldr, timeZone ).daylightTzName, "Pacific Daylight Time" );
	});

	// Test for ??:
	timeZone = "Asia/Dubai";
	[ "z", "zz", "zzz" ].forEach(function( pattern ) {
		var formatProperties = properties( pattern, cldr, timeZone );
		assert.ok( !( "standardTzName" in formatProperties ) );
		assert.ok( !( "daylightTzName" in formatProperties ) );
		assert.ok( "gmtFormat" in formatProperties );
		assert.ok( "gmtZeroFormat" in formatProperties );
		assert.ok( "tzLongHourFormat" in formatProperties );
	});
	[ "zzzz" ].forEach(function( pattern ) {
		var formatProperties = properties( pattern, cldr, timeZone );
		assert.equal( formatProperties.standardTzName, "Gulf Standard Time" );
		assert.ok( !( "daylightTzName" in formatProperties ) );
		assert.ok( "gmtFormat" in formatProperties );
		assert.ok( "gmtZeroFormat" in formatProperties );
		assert.ok( "tzLongHourFormat" in formatProperties );
	});

	// Test for two things:
	// - daylightTzName using the zone data (primary), not the metazone (secondary try);
	// - standardTzName being undefined, therefore requiring the O fallback properties;
	timeZone = "Europe/London";
	[ "z", "zz", "zzz" ].forEach(function( pattern ) {
		var formatProperties = properties( pattern, enGb, timeZone );
		assert.ok( !( "standardTzName" in formatProperties ) );
		assert.equal( formatProperties.daylightTzName, "BST" );
		assert.ok( "gmtFormat" in formatProperties );
		assert.ok( "gmtZeroFormat" in formatProperties );
		assert.ok( "tzLongHourFormat" in formatProperties );
	});
	[ "zzzz" ].forEach(function( pattern ) {
		var formatProperties = properties( pattern, enGb, timeZone );
		assert.ok( !( "standardTzName" in formatProperties ) );
		assert.equal( formatProperties.daylightTzName, "British Summer Time" );
		assert.ok( "gmtFormat" in formatProperties );
		assert.ok( "gmtZeroFormat" in formatProperties );
		assert.ok( "tzLongHourFormat" in formatProperties );
	});
});

QUnit.test( "should return genericTzName property for zone (v|vvvv)", function( assert ) {
	var pattern,
		timeZone = "America/Los_Angeles";

	pattern = "v";
	assert.equal( properties( pattern, cldr, timeZone ).genericTzName, "PT" );

	pattern = "vvvv";
	assert.equal( properties( pattern, cldr, timeZone ).genericTzName, "Pacific Time" );
});

QUnit.test( "should return timeZoneName properties for zone (VV|VVV|VVVV)", function( assert ) {
	var pattern,
		timeZone = "America/Los_Angeles";

	pattern = "VV";
	assert.equal( properties( pattern, cldr, timeZone ).timeZoneName, "America/Los_Angeles" );

	pattern = "VVV";
	assert.equal( properties( pattern, cldr, timeZone ).timeZoneName, "Los Angeles" );

	pattern = "VVVV";
	assert.equal( properties( pattern, cldr, timeZone ).timeZoneName, "Los Angeles Time" );
});

QUnit.test( "should return timeZoneData properties when using timeZone for any pattern", function( assert ) {
	var formatProperties = properties( "d", cldr, "America/Los_Angeles" );
	assert.ok( "timeZoneData" in formatProperties );
	assert.ok( "offsets" in formatProperties.timeZoneData );
	assert.ok( "untils" in formatProperties.timeZoneData );
	assert.ok( "isdsts" in formatProperties.timeZoneData );
});

});
