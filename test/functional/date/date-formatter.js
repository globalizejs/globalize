define([
	"globalize",
	"json!fixtures/cldr/main/en/ca-gregorian.json",
	"json!fixtures/cldr/main/pt/ca-gregorian.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/timeData.json",
	"json!fixtures/cldr/supplemental/weekData.json",
	"../../util",
	"globalize/date"
], function( Globalize, enCaGregorian, ptCaGregorian, likelySubtags, timeData, weekData, util ) {

var date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

function extraSetup() {
	Globalize.load( enCaGregorian );
	Globalize.load( ptCaGregorian );
	Globalize.load( timeData );
	Globalize.load( weekData );
}

QUnit.module( "Datetime Format", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "pattern", function() {
		Globalize.dateFormatter();
	});

	util.assertDatePatternParameter( assert, "pattern", function( invalidPattern ) {
		return function() {
			Globalize.dateFormatter( invalidPattern );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.dateFormatter( "GyMMMEd" );
	});
});

QUnit.test( "should return a formatter", function( assert ) {
	extraSetup();

	assert.equal( Globalize.dateFormatter( "GyMMMEd" )( date ), "Wed, Sep 15, 2010 AD" );
});

});
