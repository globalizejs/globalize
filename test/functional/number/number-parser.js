define([
	"globalize",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en-IN/numbers.json",
	"json!cldr-data/main/tr-CY/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"../../util",

	"globalize/number"
], function( Globalize, enNumbers, enInNumbers, trCyNumbers, likelySubtags, util ) {

function extraSetup() {
	Globalize.load( enNumbers );
	Globalize.load( enInNumbers );
	Globalize.load( trCyNumbers );
}

QUnit.module( ".numberParser( [options] )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {},
				"en-IN": {},
				"tr-CY": {}
			}
		});
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

QUnit.test( "should throw unsupported exception if compact option is set", function( assert ) {
	assert.throws(function() {
		Globalize.numberParser({ compact: "short" });
	}, /Unsupported.*compact number parsing/);
});

QUnit.test( "should return parser", function( assert ) {
	extraSetup();

	assert.equal( Globalize.numberParser()( "3" ), 3 );
	assert.equal( Globalize( "en-IN" ).numberParser()( "76,54,321" ), 7654321 );

	assert.equal( Globalize.numberParser({
		style: "percent"
	})( "50%" ), 0.5 );

	assert.equal( Globalize( "tr-CY" ).numberParser({
		style: "percent"
	})( "%50" ), 0.5 );
});

});
