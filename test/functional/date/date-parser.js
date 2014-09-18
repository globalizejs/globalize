define([
	"globalize",
	"src/date/start-of",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/main/pt/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json",
	"../../util",
	"globalize/date"
], function( Globalize, startOf, enCaGregorian, ptCaGregorian, likelySubtags, timeData, weekData, util ) {

function assertParseDate( assert, input, options, output ) {
	assert.deepEqual( Globalize.dateParser( options )( input ), output, JSON.stringify( options ) );
}

function extraSetup() {
	Globalize.load( enCaGregorian );
	Globalize.load( ptCaGregorian );
	Globalize.load( timeData );
	Globalize.load( weekData );
}

QUnit.module( ".dateParser( [patterns] )", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertDatePatternParameter( assert, "patterns", function( invalidValue ) {
		return function() {
			Globalize.dateParser( [ invalidValue ] );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.dateParser( "d" );
	});
});

QUnit.test( "should return a parser", function( assert ) {
	extraSetup();
	assertParseDate( assert, "Wed, Sep 15, 2010 AD", { skeleton: "GyMMMEd" },
		new Date( 2010, 8, 15 ) );
});

});
