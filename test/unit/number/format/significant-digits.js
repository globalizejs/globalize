define([
	"globalize/number/format/significant-digits",
	"globalize/util/number/round"
], function( formatSignificantDigits, round) {

var ceil = round( "ceil" ),
	deci = 0.1,
	floor = round( "floor" ),
	pi = 3.14159265359,
	truncate = round( "truncate" );

round = round( "round" ),

module( "Number Significant Format" );

test( "should zero-pad minimum significant figures", function() {
	equal( formatSignificantDigits( deci, 3, 3, round ), "0.100", "" );
});

test( "should limit maximum significant figures", function() {
	equal( formatSignificantDigits( 123, 3, 3, round ), "123", "" );
	equal( formatSignificantDigits( 12345, 3, 3, round ), "12300", "" );
	equal( formatSignificantDigits( pi, 2, 2, round ), "3.1", "" );
	equal( formatSignificantDigits( pi, 2, 3, round ), "3.14", "" );
	equal( formatSignificantDigits( pi, 2, 4, round ), "3.142", "" );
	equal( formatSignificantDigits( pi, 1, 5, round ), "3.1416", "" );
	equal( formatSignificantDigits( 0.10004, 2, 2, round ), "0.10", "" );
	equal( formatSignificantDigits( 0.12345, 3, 3, round ), "0.123", "" );
	equal( formatSignificantDigits( 0.012345, 3, 3, round ), "0.0123", "" );
});

test( "should allow different round options", function() {
	equal( formatSignificantDigits( 0.12345, 3, 3, ceil ), "0.124", "" );
	equal( formatSignificantDigits( 0.12345, 3, 3, floor ), "0.123", "" );
	equal( formatSignificantDigits( 0.12345, 3, 3, truncate ), "0.123", "" );
	equal( formatSignificantDigits( -0.12345, 3, 3, ceil ), "-0.123", "" );
	equal( formatSignificantDigits( -0.12345, 3, 3, floor ), "-0.124", "" );
	equal( formatSignificantDigits( -0.12345, 3, 3, truncate ), "-0.123", "" );
});

});
