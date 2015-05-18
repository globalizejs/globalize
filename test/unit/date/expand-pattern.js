define([
	"cldr",
	"src/date/expand-pattern",
	"json!cldr-data/main/de/ca-gregorian.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, expandPattern, deCaGregorian, enCaGregorian, likelySubtags ) {

var de, en;

Cldr.load( deCaGregorian, enCaGregorian, likelySubtags );

de = new Cldr( "de" );
en = new Cldr( "en" );

QUnit.module( "Date Expand Pattern" );

QUnit.test( "should expand {skeleton: \"<skeleton>\"}", function( assert ) {
	assert.equal( expandPattern( { skeleton: "GyMMMEd" }, en ), "E, MMM d, y G" );
	assert.equal( expandPattern( { skeleton: "GyMMMEdhms" }, en ), "E, MMM d, y G, h:mm:ss a" );
	assert.equal( expandPattern( { skeleton: "MMMMEdhm" }, de ), "E, d. MMMM 'um' h:mm a" );
});

QUnit.test( "should expand {date: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { date: "full" }, en ), "EEEE, MMMM d, y" );
});

QUnit.test( "should expand {time: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { time: "full" }, en ), "h:mm:ss a zzzz" );
});

QUnit.test( "should expand {datetime: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { datetime: "full" }, en ), "EEEE, MMMM d, y 'at' h:mm:ss a zzzz" );
});

QUnit.test( "should expand {raw: \"<pattern>\"}", function( assert ) {
	assert.equal( expandPattern( { raw: "MMM d" }, en ), "MMM d" );
});

});
