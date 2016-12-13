define([
	"src/number/shaper",
	"./shaper-testCases"
], function( numericShaper, testCases ) {

QUnit.module( "Number Shaper" );

QUnit.test( "should shape digits according to the context", function( assert ) {
	testCases.forEach( function( testCase ) {
		assert.strictEqual( testCase.expected,
				numericShaper.shape( testCase.value, testCase.shape, testCase.textDir ),
				testCase.shape + "-" + testCase.textDir );
	});
});

});
