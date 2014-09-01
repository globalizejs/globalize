define([
	"./format/grouping-separator",
	"./format/integer-fraction-digits",
	"./format/significant-digits",
	"./pattern-properties",
	"./symbol",
	"./symbol/name",
	"../common/validate/parameter-range",
	"../util/number/round"
], function( numberFormatGroupingSeparator, numberFormatIntegerFractionDigits,
	numberFormatSignificantDigits, numberPatternProperties, numberSymbol, numberSymbolName,
	validateParameterRange, numberRound ) {

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
	var maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits,
		minimumIntegerDigits, minimumSignificantDigits, padding, prefix, primaryGroupingSize,
		properties, ret, round, roundIncrement, secondaryGroupingSize, suffix;

	// NaN
	if ( isNaN( number ) ) {
		return numberSymbol( "nan", cldr );
	}

	pattern = pattern.split( ";" );

	function getOptions( property, defaultValue ) {
		return property in options ? options[ property ] : defaultValue;
	}

	options = options || {};
	round = numberRound( options.round );
	properties = numberPatternProperties( pattern[ 0 ] );
	padding = properties[ 1 ];
	minimumIntegerDigits = getOptions( "minimumIntegerDigits", properties[ 2 ] );
	minimumIntegerDigits = getOptions( "minimumIntegerDigits", properties[ 2 ] );
	minimumFractionDigits = getOptions( "minimumFractionDigits", properties[ 3 ] );
	maximumFractionDigits = getOptions( "maximumFractionDigits", properties[ 4 ] );
	minimumSignificantDigits = getOptions( "minimumSignificantDigits", properties[ 5 ] );
	maximumSignificantDigits = getOptions( "maximumSignificantDigits", properties[ 6 ] );
	roundIncrement = properties[ 7 ];
	primaryGroupingSize = properties[ 8 ];
	secondaryGroupingSize = properties[ 9 ];

	// Negative pattern
	// "If there is an explicit negative subpattern, it serves only to specify the negative prefix
	// and suffix" UTS#35
	if ( number < 0 ) {

		// "If there is no explicit negative subpattern, the negative subpattern is the localized
		// minus sign prefixed to the positive subpattern" UTS#35
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
	if ( !isNaN( minimumSignificantDigits * maximumSignificantDigits ) ) {
		validateParameterRange( minimumSignificantDigits, "minimumSignificantDigits", 1, 21 );
		validateParameterRange( maximumSignificantDigits, "maximumSignificantDigits",
			minimumSignificantDigits, 21 );

		number = numberFormatSignificantDigits( number, minimumSignificantDigits,
			maximumSignificantDigits, round );

	} else if ( !isNaN( minimumSignificantDigits ) || !isNaN( maximumSignificantDigits ) ) {
		throw new Error( "Neither or both the minimum and maximum significant digits must be " +
			"present" );

	// Integer and fractional format
	} else {

		// Normalize number of digits if only one of either minimumFractionDigits or
		// maximumFractionDigits is passed in as an option
		if ( "minimumFractionDigits" in options && !( "maximumFractionDigits" in options ) ) {
			maximumFractionDigits = Math.max( minimumFractionDigits, maximumFractionDigits );
		} else if ( !( "minimumFractionDigits" in options ) &&
				"maximumFractionDigits" in options ) {
			minimumFractionDigits = Math.min( minimumFractionDigits, maximumFractionDigits );
		}
		validateParameterRange( minimumIntegerDigits, "minimumIntegerDigits", 1, 21 );
		validateParameterRange( minimumFractionDigits, "minimumFractionDigits", 0, 20 );
		validateParameterRange( maximumFractionDigits, "maximumFractionDigits",
			minimumFractionDigits, 20 );
		number = numberFormatIntegerFractionDigits( number, minimumIntegerDigits,
			minimumFractionDigits, maximumFractionDigits, round, roundIncrement );
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize && !( "useGrouping" in options && !options.useGrouping ) ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize,
			secondaryGroupingSize );
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
