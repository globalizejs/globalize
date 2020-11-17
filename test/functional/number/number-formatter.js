define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"../../util",

	"globalize/number"
], function( Globalize, arNumbers, enNumbers, esNumbers, likelySubtags, util ) {

var pi = 3.14159265359;

function extraSetup() {
	Globalize.load(
		arNumbers,
		enNumbers,
		esNumbers
	);
}

QUnit.module( ".numberFormatter( [options] )", {
	beforeEach: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.numberFormatter( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.numberFormatter();
	});
});

QUnit.test( "should validate options", function( assert ) {
	extraSetup();

	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.numberFormatter({
			maximumSignificantDigits: 1,
			minimumSignificantDigits: num
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.numberFormatter({
			maximumSignificantDigits: num,
			minimumSignificantDigits: 1
		});
	});
	util.assertParameterRange( assert, 1, 21, function( num ) {
		Globalize.numberFormatter({ minimumIntegerDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.numberFormatter({ minimumFractionDigits: num } );
	});
	util.assertParameterRange( assert, 0, 20, function( num ) {
		Globalize.numberFormatter({ maximumFractionDigits: num } );
	});
});

QUnit.test( "should return a formatter", function( assert ) {
	extraSetup();

	assert.equal( Globalize.numberFormatter()( pi ), "3.142" );
});

});
