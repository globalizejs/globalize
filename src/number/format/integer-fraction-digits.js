define([
	"../../util/string/pad"
], function( stringPad ) {

/**
 * integerFractionDigits( number, minimumIntegerDigits, minimumFractionDigits,
 * maximumFractionDigits, round, roundIncrement )
 *
 * @number [Number]
 *
 * @minimumIntegerDigits [Number]
 *
 * @minimumFractionDigits [Number]
 *
 * @maximumFractionDigits [Number]
 *
 * @round [Function]
 *
 * @roundIncrement [Function]
 *
 * Return the formatted integer and fraction digits.
 */
return function( number, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, round,
	roundIncrement ) {

	// Fraction
	if ( maximumFractionDigits ) {

		// Rounding
		if ( roundIncrement ) {
			number = round( number, roundIncrement );

		// Maximum fraction digits
		} else {
			number = round( number, { exponent: -maximumFractionDigits } );
		}

	} else {
		number = round( number );
	}

	number = String( number );

	// Maximum integer digits (post string phase)
	if ( maximumFractionDigits && /e-/.test( number ) ) {

		// Use toFixed( maximumFractionDigits ) to make sure small numbers like 1e-7 are
		// displayed using plain digits instead of scientific notation.
		// 1: Remove leading decimal zeros.
		// 2: Remove leading decimal separator.
		// Note: String() is still preferred so it doesn't mess up with a number precision
		// unnecessarily, e.g., (123456789.123).toFixed(10) === "123456789.1229999959",
		// String(123456789.123) === "123456789.123".
		number = ( +number ).toFixed( maximumFractionDigits )
			.replace( /0+$/, "" ) /* 1 */
			.replace( /\.$/, "" ) /* 2 */;
	}

	// Minimum fraction digits (post string phase)
	if ( minimumFractionDigits ) {
		number = number.split( "." );
		number[ 1 ] = stringPad( number[ 1 ] || "", minimumFractionDigits, true );
		number = number.join( "." );
	}

	// Minimum integer digits
	if ( minimumIntegerDigits ) {
		number = number.split( "." );
		number[ 0 ] = stringPad( number[ 0 ], minimumIntegerDigits );
		number = number.join( "." );
	}

	return number;
};

});
