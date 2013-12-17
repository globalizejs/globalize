define([
	"cldr",
	"globalize/date/expand-pattern",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json"
], function( Cldr, expandPattern, enCaGregorian, likelySubtags ) {

var cldr;

Cldr.load( enCaGregorian );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );

module( "Datetime Expand Pattern" );

test( "should expand skeleton \"<skeleton>\" (as a String)", function() {
	equal( expandPattern( "GyMMMEd", cldr ), "E, MMM d, y G", "" );
});

test( "should expand {skeleton: \"<skeleton>\"}", function() {
	equal( expandPattern( { skeleton: "GyMMMEd" }, cldr ), "E, MMM d, y G", "" );
});

test( "should expand {date: \"(full, ...)\"}", function() {
	equal( expandPattern( { date: "full" }, cldr ), "EEEE, MMMM d, y", "" );
});

test( "should expand {time: \"(full, ...)\"}", function() {
	equal( expandPattern( { time: "full" }, cldr ), "h:mm:ss a zzzz", "" );
});

test( "should expand {datetime: \"(full, ...)\"}", function() {
	equal( expandPattern( { datetime: "full" }, cldr ), "EEEE, MMMM d, y 'at' h:mm:ss a zzzz", "" );
});

test( "should expand {pattern: \"<pattern>\"}", function() {
	equal( expandPattern( { pattern: "MMM d" }, cldr ), "MMM d", "" );
});

});
