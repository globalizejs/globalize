define([
	"globalize",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"../../util",
	"globalize/number"
], function( Globalize, enNumbers, likelySubtags, util ) {

function extraSetup() {
	Globalize.load( enNumbers );
}

QUnit.module( ".numberParser( [options] )", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.numberParser( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.numberParser();
	});
});

QUnit.test( "should return parser", function( assert ) {
	extraSetup();

	assert.equal( Globalize.numberParser()( "3" ), 3 );
	assert.equal( Globalize.numberParser({
		style: "percent"
	})( "50%" ), 0.5 );
});

});
