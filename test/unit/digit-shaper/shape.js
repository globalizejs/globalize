define([
	"cldr",
	"src/digit-shaper/shape",
	"src/digit-shaper/properties",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../functional/digit-shaper/shaper-testCases"
], function( Cldr, shape, properties, arNumbers, likelySubtags,	numberingSystems, testCases ) {

var ar;

Cldr.load(
	arNumbers,
	likelySubtags,
	numberingSystems
);

ar = new Cldr( "ar" );

QUnit.module( "Digit Shape" );

QUnit.test( "should shape digits according to the context", function( assert ) {
	testCases.forEach( function( testCase ) {
		assert.strictEqual( testCase.expected,
			shape( testCase.value, properties( ar, { "shaperType": testCase.shape, "textDir": testCase.textDir } ) ),
			testCase.shape + "-" + testCase.textDir );
	});
});

});
