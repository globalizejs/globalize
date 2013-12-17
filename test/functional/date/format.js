define([
	"globalize",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json",
	"globalize/date"
], function( Globalize, enCaGregorian, likelySubtags, timeData, weekData ) {

var date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

Globalize.load( enCaGregorian );
Globalize.load( likelySubtags );
Globalize.load( timeData );
Globalize.load( weekData );
Globalize.locale( "en" );

module( "Datetime Format" );

test( "should format skeleton", function() {
	equal( Globalize.format( date, { skeleton: "d" } ), "15", "" );
	equal( Globalize.format( date, { skeleton: "Ed" } ), "15 Wed", "" );
	equal( Globalize.format( date, { skeleton: "Ehms" } ), "Wed 5:35:07 PM", "" );
	equal( Globalize.format( date, { skeleton: "GyMMMEd" } ), "Wed, Sep 15, 2010 AD", "" );
	equal( Globalize.format( date, { skeleton: "yMd" } ), "9/15/2010", "" );
	equal( Globalize.format( date, { skeleton: "yQQQ" } ), "Q3 2010", "" );

	// Passed as string
	equal( Globalize.format( date, "GyMMMEd" ), "Wed, Sep 15, 2010 AD", "" );
});

test( "should format time presets", function() {
	equal( Globalize.format( date, { time: "medium" } ), "5:35:07 PM", "" );
	equal( Globalize.format( date, { time: "short" } ), "5:35 PM", "" );
});

test( "should format date presets", function() {
	equal( Globalize.format( date, { date: "full" } ), "Wednesday, September 15, 2010", "" );
	equal( Globalize.format( date, { date: "long" } ), "September 15, 2010", "" );
	equal( Globalize.format( date, { date: "medium" } ), "Sep 15, 2010", "" );
	equal( Globalize.format( date, { date: "short" } ), "9/15/10", "" );
});

test( "should format datetime presets", function() {
	equal( Globalize.format( date, { datetime: "medium" } ), "Sep 15, 2010, 5:35:07 PM", "" );
});

test( "should format raw patterns", function() {
	equal( Globalize.format( date, { pattern: "E, MMM d, y G" } ), "Wed, Sep 15, 2010 AD", "" );
});

});
