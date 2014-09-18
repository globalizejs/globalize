define([
	"cldr",
	"src/date/parse-properties",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
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
