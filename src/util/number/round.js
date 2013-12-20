define([
	"./truncate"
], function( numberTruncate ) {

/**
 * round( method )
 *
 * @method [String] with either "round", "ceil", "floor", or "truncate".
 *
 * Return function( value, increment ):
 *
 *   @value [Number] eg. 123.45.
 *
 *   @increment [Number] optional, eg. 0.1.
 *
 *   Return the rounded number, eg:
 *   - round( "round" )( 123.45 ): 123;
 *   - round( "ceil" )( 123.45 ): 124;
 *   - round( "floor" )( 123.45 ): 123;
 *   - round( "truncate" )( 123.45 ): 123;
 *   - round( "round" )( 123.45, 0.1 ): 123.5;
 *   - round( "round" )( 123.45, 10 ): 120;
 */
return function( method ) {
	method = method || "round";
	method = method === "truncate" ? numberTruncate : Math[ method ];
	return function( value, increment ) {
		increment = increment || 1;
		return method( value / increment ) * increment;
	};
};

});
