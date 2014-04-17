define([
	"globalize",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/plurals.json",
	"../../util",
	"globalize/plural"
], function( Globalize, likelySubtags, plurals, util ) {

function extraSetup() {
	Globalize.load( plurals );
}

QUnit.module( ".plural()", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.plural();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.plural( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.plural( 1 );
	});
});

QUnit.test( "should return plural form", function( assert ) {
	extraSetup();
	assert.equal( Globalize.plural( 0 ), "other" );
	assert.equal( Globalize( "ar" ).plural( 0 ), "zero" );
});


});
