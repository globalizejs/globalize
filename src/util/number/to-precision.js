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
	var roundOrder, roundIncrement;

	// Get number at two extra significant figure precision.
	number = number.toPrecision( precision + 2 );

	// Then, round it to the required significant figure precision.
	roundOrder = Math.ceil( Math.log( Math.abs( number ) ) / Math.log( 10 ) );
	roundOrder -= precision;
	roundIncrement = Math.pow( 10, roundOrder );

	number = round( number, roundIncrement );

	// Ignore decimal error, eg. `1234 * 0.0001 = 0.12340000000000001`.
	if ( roundOrder < 0 ) {
		number = +number.toFixed( -roundOrder );
	}

	return number;
};

});
