define([
	"cldr",
	"src/unit/get",
	"json!fixtures/cldr/main/en/units.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"src/plural"
], function( Cldr, unitGet, enUnits, likelySubtags ) {

var cldr;

Cldr.load( enUnits );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );

QUnit.module( "Unit Get" );

QUnit.test( "should get type-unit", function( assert ) {
	assert.deepEqual( unitGet( "duration-second", "short", cldr ), {
		"one": "{0} sec",
		"other": "{0} secs"
	});
	assert.deepEqual( unitGet( "duration-second", "long", cldr ), {
		"one": "{0} second",
		"other": "{0} seconds"
	});
});

QUnit.test( "should get unit (when no type is provided)", function( assert ) {
	assert.deepEqual( unitGet( "second", "short", cldr ), {
		"one": "{0} sec",
		"other": "{0} secs"
	});
	assert.deepEqual( unitGet( "second", "long", cldr ), {
		"one": "{0} second",
		"other": "{0} seconds"
	});
});

QUnit.test( "should get precomputed compound-unit", function( assert ) {
	assert.deepEqual( unitGet( "meter-per-second", "short", cldr ), {
		"one": "{0} m/s",
		"other": "{0} m/s"
	});
});

QUnit.test( "should compute compound-unit", function( assert ) {
	assert.deepEqual( unitGet( "length-foot-per-second", "short", cldr ), [{
		"one": "{0} ft",
		"other": "{0} ft"
	}, {
		"one": "{0} sec",
		"other": "{0} secs"
	}]);
});

});
