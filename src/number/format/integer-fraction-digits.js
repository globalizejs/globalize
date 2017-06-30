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

		// Use toFixed( maximumFractionDigits ) to make sure small numbers like 1e-7 are displayed
		// using plain digits instead of scientific notation.
		// 1: Remove leading decimal zeros.
		// 2: Remove leading decimal separator.
		number = number.toFixed( maximumFractionDigits )
			.replace( /0+$/, "" ) /* 1 */
			.replace( /\.$/, "" ) /* 2 */;

		// Minimum fraction digits
		if ( minimumFractionDigits ) {
			number = String( number ).split( "." );
			number[ 1 ] = stringPad( number[ 1 ] || "", minimumFractionDigits, true );
			number = number.join( "." );
		}
	} else {
		number = round( number );
		number = String( number );
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
