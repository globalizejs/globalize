define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../util",
	"./shaper-testCases"
], function( Globalize, arNumbers, likelySubtags,
		numberingSystems, util, testCases ) {

function extraSetup() {
	Globalize.load(
		arNumbers,
		numberingSystems
	);
}

QUnit.module( ".shapeNumber( value [, options] )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				ar: {}
			}
		});
		Globalize.locale( "ar" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.shapeNumber();
	});

	util.assertStringParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.shapeNumber( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.shapeNumber( "123", invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.shapeNumber( "123" );
	});
});

QUnit.test( "should shape digits", function( assert ) {
	extraSetup();
	testCases.forEach( function( testCase ) {
		assert.strictEqual( testCase.expected,
				Globalize.shapeNumber( testCase.value, { "shaperType": testCase.shape, "textDir": testCase.textDir } ),
				testCase.shape + "-" + testCase.textDir );
	});
});

});
