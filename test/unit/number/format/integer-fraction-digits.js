define([
	"src/number/format/integer-fraction-digits",
	"src/util/number/round"
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

QUnit.module( "Number Integer and Fraction Format" );

/**
 *  Integers
 */

QUnit.test( "should zero-pad minimum integer digits", function( assert ) {
	assert.equal( formatIntegerFractionDigits( pi, 2, null, null, round, null ), "03" );
});

QUnit.test( "should not limit the maximum number of digits of integers", function( assert ) {
	assert.equal( formatIntegerFractionDigits( earthDiameter, 1, null, null, round, null ), "12735" );
});

/**
 *  Decimals
 */

QUnit.test( "should limit maximum fraction digits", function( assert ) {
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 0, round, null ), "3" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 2, round, null ), "3.14" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 4, 4, round, null ), "3.1416" );
});

QUnit.test( "should zero-pad minimum fraction digits", function( assert ) {
	assert.equal( formatIntegerFractionDigits( deci, 1, 2, 2, round, null ), "0.10" );
});

QUnit.test( "should allow rounding", function( assert ) {
	assert.equal( formatIntegerFractionDigits( pi, 1, 2, 2, round, 0.10 ), "3.10" );
	assert.equal( formatIntegerFractionDigits( 100.7, 1, 0, 0, round, null ), "101" );
});

QUnit.test( "should allow different rounding options", function( assert ) {
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 2, ceil, null ), "3.15" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 2, floor, null ), "3.14" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 2, round, null ), "3.14" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 2, truncate, null ), "3.14" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 4, ceil, null ), "3.1416" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 4, floor, null), "3.1415" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 4, round, null ), "3.1416" );
	assert.equal( formatIntegerFractionDigits( pi, 1, 0, 4, truncate, null ), "3.1415" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 2, ceil, null ), "-3.14" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 2, floor, null ), "-3.15" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 2, round, null ), "-3.14" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 2, truncate, null ), "-3.14" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 4, ceil, null ), "-3.1415" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 4, floor, null ), "-3.1416" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 4, round, null ), "-3.1416" );
	assert.equal( formatIntegerFractionDigits( -pi, 1, 0, 4, truncate, null ), "-3.1415" );
});

// `12341234.233` => `"12,341,234.233000001"` (#227).
// `0.00015 * 10000 = 1.49999999999999` (#376).
QUnit.test( "should handle inaccurate floating point arithmetics", function( assert ) {
	assert.equal( formatIntegerFractionDigits( 12341234.233, 1, 1, 3, round, null ), "12341234.233" );
	assert.equal( formatIntegerFractionDigits( 1234 * 0.0001, 1, 1, 4, round, null ), "0.1234" );
	assert.equal( formatIntegerFractionDigits( 0.00015, 1, 1, 4, round, null ), "0.0002" );
});

});
