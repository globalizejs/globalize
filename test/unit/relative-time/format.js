define([
	"cldr",
	"src/relative-time/format",
	"src/relative-time/properties",
	"json!cldr-data/main/en/dateFields.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, format, properties, enDateFields, likelySubtags ) {

var cldr;

Cldr.load( enDateFields );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );

QUnit.module( "Relative Time Format" );

// FIXME
QUnit.test( "FIXME", function( assert ) {
	assert.equal( format( "7", "other", properties( "month", cldr ) ), "7 months ago" );
});

});
