define([
	"globalize",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"../../util",

	"globalize/date"
], function( Globalize, enNumbers, enCaGregorian, likelySubtags, numberingSystems, timeData,
	weekData, util ) {

var date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

function extraSetup() {
	Globalize.load(
		enCaGregorian,
		enNumbers,
		numberingSystems,
		timeData,
		weekData
	);
}

QUnit.module( ".dateFormatter( pattern )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
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
