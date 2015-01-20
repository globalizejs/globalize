define([
	"globalize",
	"src/date/start-of",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/pt/ca-gregorian.json",
	"json!cldr-data/main/pt/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"../../util",

	"globalize/date"
], function( Globalize, startOf, enCaGregorian, enNumbers, ptCaGregorian, ptNumbers, likelySubtags,
	numberingSystems, timeData, weekData, util ) {

function assertParseDate( assert, input, options, output ) {
	assert.deepEqual( Globalize.dateParser( options )( input ), output, JSON.stringify( options ) );
}

function extraSetup() {
	Globalize.load(
		enCaGregorian,
		enNumbers,
		ptCaGregorian,
		ptNumbers,
		numberingSystems,
		timeData,
		weekData
	);
}

QUnit.module( ".dateParser( pattern )", {
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
		Globalize.dateParser();
	});

	util.assertDatePatternParameter( assert, "pattern", function( invalidValue ) {
		return function() {
			Globalize.dateParser( invalidValue );
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
