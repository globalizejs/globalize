define([
	"./pattern-re",
	"../common/create-error/unsupported-feature"
], function( numberPatternRe, createErrorUnsupportedFeature ) {

/**
 * format( number, pattern )
 *
 * @number [Number].
 *
 * @pattern [String] raw pattern for numbers.
 *
 * Return the formatted number.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( pattern ) {
	var aux1, aux2, fractionPattern, integerFractionOrSignificantPattern, integerPattern,
		maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits,
		minimumIntegerDigits, minimumSignificantDigits, padding, prefix, primaryGroupingSize,
		roundIncrement, scientificNotation, secondaryGroupingSize, significantPattern, suffix;

	pattern = pattern.match( numberPatternRe );
	if ( !pattern ) {
		throw new Error( "Invalid pattern: " + pattern );
	}

	prefix = pattern[ 1 ];
	padding = pattern[ 3 ];
	integerFractionOrSignificantPattern = pattern[ 4 ];
	significantPattern = pattern[ 8 ];
	scientificNotation = pattern[ 9 ];
	suffix = pattern[ 10 ];

	// Significant digit format
	if ( significantPattern ) {
		significantPattern.replace( /(@+)(#*)/, function( match, minimumSignificantDigitsMatch, maximumSignificantDigitsMatch ) {
			minimumSignificantDigits = minimumSignificantDigitsMatch.length;
			maximumSignificantDigits = minimumSignificantDigits +
				maximumSignificantDigitsMatch.length;
		});

	// Integer and fractional format
	} else {
		fractionPattern = pattern[ 7 ];
		integerPattern = pattern[ 6 ];

		if ( fractionPattern ) {

			// Minimum fraction digits, and rounding.
			fractionPattern.replace( /[0-9]+/, function( match ) {
				minimumFractionDigits = match;
			});
			if ( minimumFractionDigits ) {
				roundIncrement = +( "0." + minimumFractionDigits );
				minimumFractionDigits = minimumFractionDigits.length;
			} else {
				minimumFractionDigits = 0;
			}

			// Maximum fraction digits
			// 1: ignore decimal character
			maximumFractionDigits = fractionPattern.length - 1 /* 1 */;
		}

		// Minimum integer digits
		integerPattern.replace( /0+$/, function( match ) {
			minimumIntegerDigits = match.length;
		});
	}

	// Scientific notation
	if ( scientificNotation ) {
		throw createErrorUnsupportedFeature({
			feature: "scientific notation (not implemented)"
		});
	}

	// Padding
	if ( padding ) {
		throw createErrorUnsupportedFeature({
			feature: "padding (not implemented)"
		});
	}

	// Grouping
	if ( ( aux1 = integerFractionOrSignificantPattern.lastIndexOf( "," ) ) !== -1 ) {

		// Primary grouping size is the interval between the last group separator and the end of
		// the integer (or the end of the significant pattern).
		aux2 = integerFractionOrSignificantPattern.split( "." )[ 0 ];
		primaryGroupingSize = aux2.length - aux1 - 1;

		// Secondary grouping size is the interval between the last two group separators.
		if ( ( aux2 = integerFractionOrSignificantPattern.lastIndexOf( ",", aux1 - 1 ) ) !== -1 ) {
			secondaryGroupingSize = aux1 - 1 - aux2;
		}
	}

	// Return:
	//  0: @prefix String
	//  1: @padding Array [ <character>, <count> ] TODO
	//  2: @minimumIntegerDigits non-negative integer Number value indicating the minimum integer
	//        digits to be used. Numbers will be padded with leading zeroes if necessary.
	//  3: @minimumFractionDigits and
	//  4: @maximumFractionDigits are non-negative integer Number values indicating the minimum and
	//        maximum fraction digits to be used. Numbers will be rounded or padded with trailing
	//        zeroes if necessary.
	//  5: @minimumSignificantDigits and
	//  6: @maximumSignificantDigits are positive integer Number values indicating the minimum and
	//        maximum fraction digits to be shown. Either none or both of these properties are
	//        present; if they are, they override minimum and maximum integer and fraction digits
	//        – the formatter uses however many integer and fraction digits are required to display
	//        the specified number of significant digits.
	//  7: @roundIncrement Decimal round increment or null
	//  8: @primaryGroupingSize
	//  9: @secondaryGroupingSize
	// 10: @suffix String
	return [
		prefix,
		padding,
		minimumIntegerDigits,
		minimumFractionDigits,
		maximumFractionDigits,
		minimumSignificantDigits,
		maximumSignificantDigits,
		roundIncrement,
		primaryGroupingSize,
		secondaryGroupingSize,
		suffix
	];
};

});
