define([
	"globalize",
	"../../util",
	"../../unit/number/shaper-testCases"
], function( Globalize, util, testCases ) {

QUnit.module( ".shapeNumber( value, shaperType [, textDir] )" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.shapeNumber();
	});
	
	util.assertParameterPresence( assert, "shaperType", function() {
		Globalize.shapeNumber( "" );
	});

	util.assertStringParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.shapeNumber( invalidValue, "" );
		};
	});

	util.assertStringParameter( assert, "shaperType", function( invalidValue ) {
		return function() {
			Globalize.shapeNumber( "", invalidValue );
		};
	});
});

QUnit.test( "should shape digits", function( assert ) {

	testCases.forEach( function( testCase ) {
		assert.strictEqual( testCase.expected,
				Globalize.shapeNumber( testCase.value, testCase.shape, testCase.textDir ),
				testCase.shape + "-" + testCase.textDir );
	});

});

});
