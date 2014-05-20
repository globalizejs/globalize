define([
	"cldr",
	"globalize/core",
	"globalize/unit/get",
	"json!fixtures/cldr/main/en/units.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"globalize/plural"
], function( Cldr, Globalize, unitGet, enUnits, likelySubtags ) {

var cldr;

Cldr.load( enUnits );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );
Globalize.locale( "en" );

module( "Unit Get" );

test( "should get type-unit", function() {
	equal( unitGet( "duration-second", "short", 0, cldr, Globalize ), "0 secs" );
	equal( unitGet( "duration-second", "short", 1, cldr, Globalize ), "1 sec" );
});

test( "should get unit (when no type is provided)", function() {
	equal( unitGet( "second", "short", 0, cldr, Globalize ), "0 secs" );
	equal( unitGet( "second", "short", 1, cldr, Globalize ), "1 sec" );
});

});
