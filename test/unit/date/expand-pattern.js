define([
	"cldr",
	"src/date/expand-pattern",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, expandPattern, enCaGregorian, likelySubtags ) {

var cldr;

Cldr.load( enCaGregorian, likelySubtags );

cldr = new Cldr( "en" );

QUnit.module( "Date Expand Pattern" );

QUnit.test( "should expand skeleton \"<skeleton>\" (as a String)", function( assert ) {
	assert.equal( expandPattern( "GyMMMEd", cldr ), "E, MMM d, y G" );
});

QUnit.test( "should expand {skeleton: \"<skeleton>\"}", function( assert ) {
	assert.equal( expandPattern( { skeleton: "GyMMMEd" }, cldr ), "E, MMM d, y G" );
});

QUnit.test( "should expand {date: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { date: "full" }, cldr ), "EEEE, MMMM d, y" );
});

QUnit.test( "should expand {time: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { time: "full" }, cldr ), "h:mm:ss a zzzz" );
});

QUnit.test( "should expand {datetime: \"(full, ...)\"}", function( assert ) {
	assert.equal( expandPattern( { datetime: "full" }, cldr ), "EEEE, MMMM d, y 'at' h:mm:ss a zzzz" );
});

QUnit.test( "should expand {pattern: \"<pattern>\"}", function( assert ) {
	assert.equal( expandPattern( { pattern: "MMM d" }, cldr ), "MMM d" );
});

});
