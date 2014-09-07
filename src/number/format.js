define([
	"./format/grouping-separator",
	"./format/integer-fraction-digits",
	"./format/significant-digits"
], function( numberFormatGroupingSeparator, numberFormatIntegerFractionDigits,
	numberFormatSignificantDigits ) {

/**
 * format( number, properties )
 *
 * @number [Number].
 *
 * @properties FIXME
 *
 * Return the formatted number.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( number, properties ) {
	var maximumSignificantDigits, minimumSignificantDigits, prefix, primaryGroupingSize, pattern,
		ret, round, suffix;

	minimumSignificantDigits = properties.minimumSignificantDigits;
	maximumSignificantDigits = properties.maximumSignificantDigits;
	primaryGroupingSize = properties.primaryGroupingSize;
	round = properties.round;

	// NaN
	if ( isNaN( number ) ) {
		return properties.nanSymbol;
	}

	if ( number < 0 ) {
		pattern = properties.negativePattern;
		prefix = properties.negativePrefix;
		suffix = properties.negativeSuffix;
	} else {
		pattern = properties.positivePattern;
		prefix = properties.positivePrefix;
		suffix = properties.positiveSuffix;
	}

	// Infinity
	if ( !isFinite( number ) ) {
		return prefix + properties.infinitySymbol + suffix;
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
		number = numberFormatSignificantDigits( number, minimumSignificantDigits,
			maximumSignificantDigits, round );

	// Integer and fractional format
	} else {
		number = numberFormatIntegerFractionDigits( number, properties.minimumIntegerDigits,
			properties.minimumFractionDigits, properties.maximumFractionDigits, round,
			properties.roundIncrement );
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize,
			properties.secondaryGroupingSize );
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
		return properties.symbolMap[ symbol ];
	});
};

});
