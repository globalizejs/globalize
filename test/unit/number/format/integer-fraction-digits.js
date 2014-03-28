define([
	"globalize/number/format/integer-fraction-digits",
	"globalize/util/number/round"
], function( formatIntegerFractionDigits, round ) {

// 1: Earth average diameter according to:
// http://www.wolframalpha.com/input/?i=earth+diameter
var ceil = round( "ceil" ),
	deci = 0.1,
	earthDiameter = 12735, /* 1 */
	floor = round( "floor" ),
	pi = 3.14159265359,
	truncate = round( "truncate" );

round = round( "round" ),

module( "Number Integer and Fraction Format" );

/**
 *  Integers
 */

test( "should zero-pad minimum integer digits", function() {
	equal( formatIntegerFractionDigits( pi, 2, null, null, round, null ), "03", "" );
});

test( "should not limit the maximum number of digits of integers", function() {
	equal( formatIntegerFractionDigits( earthDiameter, 1, null, null, round, null ), "12735", "" );
});

/**
 *  Decimals
 */

test( "should limit maximum fraction digits", function() {
	equal( formatIntegerFractionDigits( pi, 1, 0, 2, round, null ), "3.14", "" );
	equal( formatIntegerFractionDigits( pi, 1, 4, 4, round, null ), "3.1416", "" );
});

test( "should zero-pad minimum fraction digits", function() {
	equal( formatIntegerFractionDigits( deci, 1, 2, 2, round, null ), "0.10", "" );
});

test( "should allow rounding", function() {
	equal( formatIntegerFractionDigits( pi, 1, 2, 2, round, 0.10 ), "3.10", "" );
});

test( "should allow different rounding options", function() {
	equal( formatIntegerFractionDigits( pi, 1, 0, 2, ceil, null ), "3.15", "" );
	equal( formatIntegerFractionDigits( pi, 1, 0, 2, floor, null ), "3.14", "" );
	equal( formatIntegerFractionDigits( pi, 1, 0, 2, round, null ), "3.14", "" );
	equal( formatIntegerFractionDigits( pi, 1, 0, 2, truncate, null ), "3.14", "" );
	equal( formatIntegerFractionDigits( pi, 1, 0, 4, ceil, null ), "3.1416", "" );
	equal( formatIntegerFractionDigits( pi, 1, 0, 4, floor, null), "3.1415", "" );
	equal( formatIntegerFractionDigits( pi, 1, 0, 4, round, null ), "3.1416", "" );
	equal( formatIntegerFractionDigits( pi, 1, 0, 4, truncate, null ), "3.1415", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 2, ceil, null ), "-3.14", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 2, floor, null ), "-3.15", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 2, round, null ), "-3.14", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 2, truncate, null ), "-3.14", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 4, ceil, null ), "-3.1415", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 4, floor, null ), "-3.1416", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 4, round, null ), "-3.1416", "" );
	equal( formatIntegerFractionDigits( -pi, 1, 0, 4, truncate, null ), "-3.1415", "" );
});

});
