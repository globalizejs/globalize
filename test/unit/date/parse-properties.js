define([
	"cldr",
	"src/date/parse-properties",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/timeData.json",
	"cldr/supplemental"
], function( Cldr, parseProperties, enCaGregorian, likelySubtags, timeData ) {

var cldr;

Cldr.load( enCaGregorian );
Cldr.load( likelySubtags );
Cldr.load( timeData );

cldr = new Cldr( "en" );

QUnit.module( "Date Parse Properties" );

QUnit.test( "should return parse properties", function( assert ) {
	assert.ok( "preferredTimeData" in parseProperties( cldr ) );
});

});
