define(function() {

/**
 * toPrecision( number, precision, round )
 *
 * @number (Number)
 *
 * @precision (Number) significant figures precision (not decimal precision).
 *
 * @round (Function)
 *
 * Return number.toPrecision( precision ) using the given round function.
 */
return function( number, precision, round ) {
	var roundOrder;

	// Get number at two extra significant figure precision.
	number = number.toPrecision( precision + 2 );

	// Then, round it to the required significant figure precision.
	roundOrder = Math.ceil( Math.log( Math.abs( number ) ) / Math.log( 10 ) );
	roundOrder -= precision;

	return round( number, { exponent: roundOrder } );
};

});
