define([
	"cldr",
	"src/digit-shaper/shape/contextual-ar",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../../functional/digit-shaper/shaper-testCases-ar"
], function( Cldr, shapeContextual, arNumbers, likelySubtags,	numberingSystems, testCases ) {

var ar, nuDigitsMap, context;

Cldr.load(
	arNumbers,
	likelySubtags,
	numberingSystems
);

ar = new Cldr( "ar" );
nuDigitsMap = {
		"0": "٠",
		"1": "١",
		"2": "٢",
		"3": "٣",
		"4": "٤",
		"5": "٥",
		"6": "٦",
		"7": "٧",
		"8": "٨",
		"9": "٩"
	};

QUnit.module( "Digit Contextual Shaping" );

QUnit.test( "should shape digits according to the context", function( assert ) {
	testCases.forEach( function( testCase ) {

		context = ( testCase.textDir === "rtl" ? 2 : 1 );

		if (testCase.shape === "Contextual") {
			assert.strictEqual( testCase.expected,
					shapeContextual( testCase.value, nuDigitsMap, context ),
					testCase.shape + "-" + testCase.textDir );
		}

	});
});

});
