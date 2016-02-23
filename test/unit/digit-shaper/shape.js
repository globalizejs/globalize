define([
	"cldr",
	"src/digit-shaper/shape",
	"src/digit-shaper/properties",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/fa/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../functional/digit-shaper/shaper-testCases-ar",
	"../../functional/digit-shaper/shaper-testCases-fa"
], function( Cldr, shape, properties, arNumbers, faNumbers, likelySubtags,	numberingSystems, testCasesAr, testCasesFa ) {

var ar, fa;

Cldr.load(
	arNumbers,
	faNumbers,
	likelySubtags,
	numberingSystems
);

ar = new Cldr( "ar" );
fa = new Cldr( "fa" );
QUnit.module( "Digit Shape" );

QUnit.test( "should shape digits according to the context (Arabic)", function( assert ) {
	testCasesAr.forEach( function( testCase ) {
		assert.strictEqual( testCase.expected,
			shape( testCase.value, properties( ar, { "shaperType": testCase.shape, "textDir": testCase.textDir } ) ),
			testCase.shape + "-" + testCase.textDir );
	});
});

QUnit.test( "should shape digits according to the context (Farsi)", function( assert ) {
	testCasesFa.forEach( function( testCase ) {
		assert.strictEqual( testCase.expected,
			shape( testCase.value, properties( fa, { "shaperType": testCase.shape, "textDir": testCase.textDir } ) ),
			testCase.shape + "-" + testCase.textDir );
	});
});

});
