define([
	"cldr",
	"src/date/format-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!cldr-data/supplemental/metaZones.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, enCaGregorian, likelySubtags, timeData, weekData, metaZones ) {

var cldr;

Cldr.load(
	enCaGregorian,
	likelySubtags,
	timeData,
	weekData,
	metaZones
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
	assert.equal( Object.keys(properties( "a", cldr ).dayPeriods).length, 2 );
});

/**
 *  Zone
 */

QUnit.test( "should return standardTzName and daylightTzName properties for zone (z|zz|zzz|zzzz|zzzzz)",
		function( assert ) {
	[ "z", "zz", "zzz", "zzzz", "zzzzz" ].forEach(function( pattern ) {
		var timeZone = "America/Los_Angeles",
			length = pattern.length;
		assert.ok( "standardTzName" in properties( pattern, cldr, timeZone ) );
		assert.ok( "daylightTzName" in properties( pattern, cldr, timeZone ) );

		if ( length < 4 ) {
			assert.equal( "PST", properties( pattern, cldr, timeZone ).standardTzName );
			assert.equal( "PDT", properties( pattern, cldr, timeZone ).daylightTzName );
		} else {
			assert.equal( "Pacific Standard Time", properties( pattern, cldr, timeZone ).standardTzName );
			assert.equal( "Pacific Daylight Time", properties( pattern, cldr, timeZone ).daylightTzName );
		}
	});
});

QUnit.test( "should return standardTzName and daylightTzName properties for zone (v|vvvv)",
		function( assert ) {
	[ "v", "vvvv" ].forEach(function( pattern ) {
		var timeZone = "America/Los_Angeles",
			length = pattern.length;
		assert.ok( "genericTzName" in properties( pattern, cldr, timeZone ) );

		if ( length === 1 ) {
			assert.equal( "PT", properties( pattern, cldr, timeZone ).genericTzName );
		} else if ( length === 4 ) {
			assert.equal( "Pacific Time", properties( pattern, cldr, timeZone ).genericTzName );
		}
	});
});

QUnit.test( "should return standardTzName and daylightTzName properties for zone (VV|VVV|VVVV)",
		function( assert ) {
	[ "VV", "VVV", "VVVV" ].forEach(function( pattern ) {
		var timeZone = "America/Los_Angeles",
			length = pattern.length;
		assert.ok( "timeZoneName" in properties( pattern, cldr, timeZone ) );

		if ( length === 2 ) {
			assert.equal( "America/Los_Angeles", properties( pattern, cldr, timeZone ).timeZoneName );
		} else if ( length === 3 ) {
			assert.equal( "Los Angeles", properties( pattern, cldr, timeZone ).timeZoneName );
		} else if ( length === 4 ) {
			assert.equal( "Los Angeles Time", properties( pattern, cldr, timeZone ).timeZoneName );
		}
	});
});

});
