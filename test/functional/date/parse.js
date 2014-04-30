define([
	"globalize",
	"src/date/start-of",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/main/pt/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json",
	"globalize/date"
], function( Globalize, startOf, enCaGregorian, ptCaGregorian, likelySubtags, timeData, weekData ) {

var date;

Globalize.load( enCaGregorian );
Globalize.load( ptCaGregorian );
Globalize.load( likelySubtags );
Globalize.load( timeData );
Globalize.load( weekData );
Globalize.locale( "en" );

module( "Datetime Parse" );

test( "should parse skeleton", function() {
	date = new Date();
	date.setDate( 15 );
	date = startOf( date, "day" );
	deepEqual( Globalize.parseDate( "15", { skeleton: "d" } ), date, "{ skeleton: \"d\" }" );
	deepEqual( Globalize.parseDate( "15 Wed", { skeleton: "Ed" } ), date, "{ skeleton: \"Ed\" }" );

	date = new Date();
	date.setHours( 17 );
	date.setMinutes( 35 );
	date.setSeconds( 7 );
	date = startOf( date, "second" );
	deepEqual( Globalize.parseDate( "Wed 5:35:07 PM", { skeleton: "Ehms" } ), date, "{ skeleton: \"Ehms\" }" );

	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	deepEqual( Globalize.parseDate( "Wed, Sep 15, 2010 AD", { skeleton: "GyMMMEd" } ), date, "{ skeleton: \"GyMMMEd\" }" );
	deepEqual( Globalize.parseDate( "9/15/2010", { skeleton: "yMd" } ), date, "{ skeleton: \"yMd\" }" );

	date = new Date( 2010, 0 );
	date = startOf( date, "year" );
	deepEqual( Globalize.parseDate( "Q3 2010", { skeleton: "yQQQ" } ), date, "{ skeleton: \"yQQQ\" }" );

	// Via instance globalize.parseDate().
	deepEqual( Globalize( "pt" ).parseDate( "2010 T3", { skeleton: "yQQQ" } ), date, "{ skeleton: \"yQQQ\" }" );
});

test( "should parse time presets", function() {
	date = new Date();
	date.setHours( 17 );
	date.setMinutes( 35 );
	date.setSeconds( 7 );
	date = startOf( date, "second" );
	deepEqual( Globalize.parseDate( "5:35:07 PM", { time: "medium" } ), date, "{ time: \"medium\" }" );
	date = startOf( date, "minute" );
	deepEqual( Globalize.parseDate( "5:35 PM", { time: "short" } ), date, "{ time: \"short\" }" );
});

test( "should parse date presets", function() {
	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	deepEqual( Globalize.parseDate( "Wednesday, September 15, 2010", { date: "full" } ), date, "{ date: \"full\" }" );
	deepEqual( Globalize.parseDate( "September 15, 2010", { date: "long" } ), date, "{ date: \"long\" }" );
	deepEqual( Globalize.parseDate( "Sep 15, 2010", { date: "medium" } ), date, "{ date: \"medium\" }" );
	deepEqual( Globalize.parseDate( "9/15/10", { date: "short" } ), date, "{ date: \"short\" }" );
});

test( "should parse datetime presets", function() {
	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	deepEqual( Globalize.parseDate( "Wednesday, September 15, 2010", { date: "full" } ), date, "{ date: \"full\" }" );

	date = new Date( 2010, 8, 15, 17, 35, 7 );
	date = startOf( date, "second" );
	deepEqual( Globalize.parseDate( "Sep 15, 2010, 5:35:07 PM", { datetime: "medium" } ), date, "{ datetime: \"medium\" }" );
});

test( "should parse raw patterns", function() {
	date = new Date( 2010, 8, 15 );
	date = startOf( date, "day" );
	deepEqual( Globalize.parseDate( "Wed, Sep 15, 2010 AD", { pattern: "E, MMM d, y G" } ), date, "{ pattern: \"E, MMM d, y G\" }" );
});

test( "should parse a formatted date (reverse operation test)", function() {
	date = new Date();
	date = startOf( date, "minute" );
	deepEqual( Globalize.parseDate( Globalize.formatDate( date, { datetime: "short" } ), { datetime: "short" } ), date, "" );
});

});
