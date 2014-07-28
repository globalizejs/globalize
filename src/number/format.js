define([
	"./format/grouping-separator",
	"./format/integer-fraction-digits",
	"./format/significant-digits",
	"./pattern-properties",
	"./symbol",
	"./symbol/name",
	"../util/number/round"
], function( numberFormatGroupingSeparator, numberFormatIntegerFractionDigits, numberFormatSignificantDigits, numberPatternProperties, numberSymbol, numberSymbolName, numberRound ) {

/**
 * format( number, pattern, cldr [, options] )
 *
 * @number [Number].
 *
 * @pattern [String] raw pattern for numbers.
 *
 * @cldr [Cldr instance].
 *
 * @options [Object]:
 * - minimumIntegerDigits [Number] 
 * - minimumFractionDigits, maximumFractionDigits [Number] 
 * - minimumSignificantDigits, maximumSignificantDigits [Number] 
 * - round [String] "ceil", "floor", "round" (default), or "truncate".
 * - useGrouping [Boolean] default true.
 *
 * Return the formatted number.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( number, pattern, cldr, options ) {
	var maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits, minimumIntegerDigits, minimumSignificantDigits, padding, prefix, primaryGroupingSize, properties, ret, round, roundIncrement, secondaryGroupingSize, suffix;

	// NaN
	if ( isNaN( number ) ) {
		return numberSymbol( "nan", cldr );
	}

	pattern = pattern.split( ";" );

	options = options || {};
	round = numberRound( options.round );
	properties = numberPatternProperties( pattern[ 0 ] );
	padding = properties[ 1 ];
	minimumIntegerDigits = options.hasOwnProperty("minimumIntegerDigits") ? options.minimumIntegerDigits : properties[ 2 ];
	minimumFractionDigits = options.hasOwnProperty("minimumFractionDigits") ? options.minimumFractionDigits : properties[ 3 ];
	maximumFractionDigits = options.hasOwnProperty("maximumFractionDigits") ? options.maximumFractionDigits : properties[ 4 ];
	minimumSignificantDigits = options.hasOwnProperty("minimumSignificantDigits") ? options.minimumSignificantDigits : properties[ 5 ];
	maximumSignificantDigits = options.hasOwnProperty("maximumSignificantDigits") ? options.maximumSignificantDigits : properties[ 6 ];
	roundIncrement = properties[ 7 ];
	primaryGroupingSize = properties[ 8 ];
	secondaryGroupingSize = properties[ 9 ];

	// Validate and/or normalize number of digits
	if ( isFinite(minimumIntegerDigits) ) {
		if ( minimumIntegerDigits < 1 || minimumIntegerDigits > 21 ) {
			throw new Error( "Minimum integer digits is out of range" );
		}
	}

	if ( isFinite(minimumFractionDigits) ) {
		if ( minimumFractionDigits < 0 || minimumFractionDigits > 20 ) {
			throw new Error( "Minimum fraction digits is out of range" );
		}
	}

	if ( isFinite(maximumFractionDigits) ) {
		if ( maximumFractionDigits < 0 || minimumFractionDigits > 20 ) {
			throw new Error( "Maximum fraction digits is out of range" );
		}
	}

	if ( minimumFractionDigits > maximumFractionDigits ) {

		// Cases where minimum and maximum fraction digits options are provided
		if ( options.hasOwnProperty("minimumFractionDigits") && options.hasOwnProperty("maximumFractionDigits") ) {
			throw new Error( "Minimum fraction digits cannot be greater than its maximum" );

		// Minimum fraction digits option provided but maximum omitted
		} else if ( options.hasOwnProperty("minimumFractionDigits") ) {

			// e.g. For 3.14159 where minimumFractionDigits=5, a pattern-provided maximumFractionDigits=3 would have to be normalized to 5
			maximumFractionDigits = minimumFractionDigits;

		// Maximum fraction digits option provided but minimum omitted
		} else if ( options.hasOwnProperty("maximumFractionDigits") ) {

			// e.g. For 3.1 where maximumFractionDigits=1, a pattern-provided minimumFractionDigits=3 would have to be normalized to 1
			minimumFractionDigits = maximumFractionDigits;
		}

	}

	if ( isFinite(minimumSignificantDigits) && isFinite(maximumSignificantDigits) ) {

		if ( minimumSignificantDigits < 1 || minimumSignificantDigits > 21 ) {
			throw new Error( "Minimum significant digits is out of range" );
		}
		if ( minimumSignificantDigits < 1 || maximumSignificantDigits > 21 ) {
			throw new Error( "Maximum significant digits is out of range" );
		}

		if ( minimumSignificantDigits > maximumSignificantDigits ) {

			// Cases where minimum and maximum significant digits options are provided
			if ( options.hasOwnProperty("minimumSignificantDigits") && options.hasOwnProperty("maximumSignificantDigits") ) {
				throw new Error( "Minimum significant digits cannot be greater than its maximum" );

			// e.g. For 123.00 where minimumSignificantDigits=6, a pattern-provided maximumSignificantDigits=3 would have to be normalized to 5
			} else if ( options.hasOwnProperty("minimumSignificantDigits") ) {
				maximumSignificantDigits = minimumSignificantDigits;

			// e.g. For 120 where maximumSignificantDigits=2, a pattern-provided minimumSignificantDigits=3 would have to be normalized to 2
			} else if ( options.hasOwnProperty("maximumSignificantDigits") ) {
				minimumSignificantDigits = maximumSignificantDigits;
			}
		}

	} else if ( isFinite(minimumSignificantDigits) || isFinite(maximumSignificantDigits) ) {
		throw new Error( "None or both the minimum and maximum significant digits must be present" );
	}

	// Negative pattern
	// "If there is an explicit negative subpattern, it serves only to specify the negative prefix and suffix" UTS#35
	if ( number < 0 ) {

		// "If there is no explicit negative subpattern, the negative subpattern is the localized minus sign prefixed to the positive subpattern" UTS#35
		pattern = pattern[ 1 ] || "-" + pattern[ 0 ];
		properties = numberPatternProperties( pattern );
	} else {
		pattern = pattern[ 0 ];
	}

	prefix = properties[ 0 ];
	suffix = properties[ 10 ];

	// Infinity (observe that isNaN() has been checked above)
	if ( !isFinite( number ) ) {
		return prefix + numberSymbol( "infinity", cldr ) + suffix;
	}

	ret = prefix;

	// Percent
	if ( pattern.indexOf( "%" ) !== -1 ) {
		number *= 100;

	// Per mille
	} else if ( pattern.indexOf( "\u2030" ) !== -1 ) {
		number *= 1000;
	}

	// Significant digit format
	if ( minimumSignificantDigits && maximumSignificantDigits ) {
		number = numberFormatSignificantDigits( number, minimumSignificantDigits, maximumSignificantDigits, round );

	// Integer and fractional format
	} else {
		number = numberFormatIntegerFractionDigits( number, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, round, roundIncrement );
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize && !( "useGrouping" in options && !options.useGrouping ) ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize, secondaryGroupingSize );
	}

	ret += number;

	// Scientific notation
	if ( false ) {
		throw new Error( "Scientific notation not implemented" );
	}

	// Padding
	if ( false ) {
		throw new Error( "Padding not implemented" );
	}

	ret += suffix;

	// Symbols
	return ret.replace( /'[^']+'|[.,\-+E%\u2030]/g, function( symbol ) {
		if ( symbol.charAt( 0 ) === "'" ) {
			return symbol;
		}
		return numberSymbol( numberSymbolName[ symbol ], cldr );
	});
};

});
