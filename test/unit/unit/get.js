define([
	"cldr",
	"src/unit/get",
	"json!cldr-data/main/en/units.json",
	"json!cldr-data/supplemental/likelySubtags.json",
], function( Cldr, unitGet, enUnits, likelySubtags ) {

var cldr;

Cldr.load( enUnits );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );

QUnit.module( "Unit Get" );

QUnit.test( "should get type-unit", function( assert ) {
	assert.deepEqual( unitGet( "duration-second", "short", cldr ), {
		"displayName": "secs",
		"one": "{0} sec",
		"other": "{0} sec",
		"perUnitPattern": "{0}/s"
	});
	assert.deepEqual( unitGet( "duration-second", "long", cldr ), {
		"displayName": "seconds",
		"one": "{0} second",
		"other": "{0} seconds",
		"perUnitPattern": "{0} per second"
	});
	assert.deepEqual( unitGet( "digital-megabyte", "long", cldr ), {
		"displayName": "megabytes",
		"one": "{0} megabyte",
		"other": "{0} megabytes"
	});
});

QUnit.test( "should get unit (when no type is provided)", function( assert ) {
	assert.deepEqual( unitGet( "second", "short", cldr ), {
		"displayName": "secs",
		"one": "{0} sec",
		"other": "{0} sec",
		"perUnitPattern": "{0}/s"
	});
	assert.deepEqual( unitGet( "second", "long", cldr ), {
		"displayName": "seconds",
		"one": "{0} second",
		"other": "{0} seconds",
		"perUnitPattern": "{0} per second"
	});
	assert.deepEqual( unitGet( "megabyte", "long", cldr ), {
		"displayName": "megabytes",
		"one": "{0} megabyte",
		"other": "{0} megabytes"
	});
});

QUnit.test( "should get precomputed compound-unit", function( assert ) {
	assert.deepEqual( unitGet( "meter-per-second", "short", cldr ), {
		"displayName": "meters/sec",
		"one": "{0} m/s",
		"other": "{0} m/s"
	});
});

QUnit.test( "should compute compound-unit", function( assert ) {
	assert.deepEqual( unitGet( "foot-per-second", "short", cldr ), [{
		"displayName": "feet",
		"one": "{0} ft",
		"other": "{0} ft",
		"perUnitPattern": "{0}/ft"
	}, {
		"displayName": "secs",
		"one": "{0} sec",
		"other": "{0} sec",
		"perUnitPattern": "{0}/s"
	}]);
});

QUnit.test( "should get precomputed compount-unit with '/'", function ( assert ) {
	assert.deepEqual( unitGet( "meter/second", "short", cldr ), {
		"displayName": "meters/sec",
		"one": "{0} m/s",
		"other": "{0} m/s"
	});
});

});
