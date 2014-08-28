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
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatDate();
	});

	util.assertDateParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatDate( invalidValue, "GyMMMEd" );
		};
	});

	util.assertParameterPresence( assert, "pattern", function() {
		Globalize.formatDate( date );
	});

	util.assertDatePatternParameter( assert, "pattern", function( invalidPattern ) {
		return function() {
			Globalize.formatDate( date, invalidPattern );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatDate( date, "GyMMMEd" );
	});
});

QUnit.test( "should format skeleton", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { skeleton: "d" } ), "15" );
	assert.equal( Globalize.formatDate( date, { skeleton: "Ed" } ), "15 Wed" );
	assert.equal( Globalize.formatDate( date, { skeleton: "Ehms" } ), "Wed 5:35:07 PM" );
	assert.equal( Globalize.formatDate( date, { skeleton: "GyMMMEd" } ), "Wed, Sep 15, 2010 AD" );
	assert.equal( Globalize.formatDate( date, { skeleton: "yMd" } ), "9/15/2010" );
	assert.equal( Globalize.formatDate( date, { skeleton: "yQQQ" } ), "Q3 2010" );

	// Passed as string
	assert.equal( Globalize.formatDate( date, "GyMMMEd" ), "Wed, Sep 15, 2010 AD" );

	// Via instance .formatDate().
	assert.equal( Globalize( "pt" ).formatDate( date, { skeleton: "Ehms" } ), "qua, 5:35:07 PM" );
	assert.equal( Globalize( "pt" ).formatDate( date, { skeleton: "GyMMMEd" } ), "qua, 15 'de' set 'de' 2010 d.C." );
});

QUnit.test( "should format time presets", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { time: "medium" } ), "5:35:07 PM" );
	assert.equal( Globalize.formatDate( date, { time: "short" } ), "5:35 PM" );
});

QUnit.test( "should format date presets", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { date: "full" } ), "Wednesday, September 15, 2010" );
	assert.equal( Globalize.formatDate( date, { date: "long" } ), "September 15, 2010" );
	assert.equal( Globalize.formatDate( date, { date: "medium" } ), "Sep 15, 2010" );
	assert.equal( Globalize.formatDate( date, { date: "short" } ), "9/15/10" );
});

QUnit.test( "should format datetime presets", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { datetime: "medium" } ), "Sep 15, 2010, 5:35:07 PM" );
});

QUnit.test( "should format raw patterns", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { pattern: "E, MMM d, y G" } ), "Wed, Sep 15, 2010 AD" );
});

});
