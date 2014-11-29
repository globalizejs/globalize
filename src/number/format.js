define([
	"./format/grouping-separator",
	"./format/integer-fraction-digits",
	"./format/significant-digits",
	"./format/currency-formatter"
], function( numberFormatGroupingSeparator, numberFormatIntegerFractionDigits,
	numberFormatSignificantDigits, numberFormatCurrencyFormatter ) {

/**
 * format( number, properties )
 *
 * @number [Number].
 *
 * @properties [Object] Output of number/format-properties.
 *
 * Return the formatted number.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( number, properties, cldr ) {
	var infinitySymbol, maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits,
	minimumIntegerDigits, minimumSignificantDigits, nanSymbol, padding, prefix,
	primaryGroupingSize, pattern, ret, round, roundIncrement, secondaryGroupingSize, suffix,
	symbolMap, currency;

	padding = properties[ 1 ];
	minimumIntegerDigits = properties[ 2 ];
	minimumFractionDigits = properties[ 3 ];
	maximumFractionDigits = properties[ 4 ];
	minimumSignificantDigits = properties[ 5 ];
	maximumSignificantDigits = properties[ 6 ];
	roundIncrement = properties[ 7 ];
	primaryGroupingSize = properties[ 8 ];
	secondaryGroupingSize = properties[ 9 ];
	round = properties[ 15 ];
	infinitySymbol = properties[ 16 ];
	nanSymbol = properties[ 17 ];
	symbolMap = properties[ 18 ];
	currency = properties[ 19 ];

	// NaN
	if ( isNaN( number ) ) {
		return nanSymbol;
	}

	if ( number < 0 ) {
		pattern = properties[ 12 ];
		prefix = properties[ 13 ];
		suffix = properties[ 14 ];
	} else {
		pattern = properties[ 11 ];
		prefix = properties[ 0 ];
		suffix = properties[ 10 ];
	}

	// Infinity
	if ( !isFinite( number ) ) {
		return prefix + infinitySymbol + suffix;
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
		number = numberFormatIntegerFractionDigits( number, minimumIntegerDigits,
			minimumFractionDigits, maximumFractionDigits, round, roundIncrement );
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize,
			secondaryGroupingSize );
	}

	// Format Currency
	if ( currency ) {
		number = numberFormatCurrencyFormatter( number, currency, cldr );
	}

	ret += number;

	// Scientific notation
	// TODO implement here

	// Padding
	// TODO implement here

	ret += suffix;

	// Symbols
	return ret.replace( /'([^']|'')+'|''|[.,\-+E%\u2030]/g, function( symbol ) {
		if ( symbol.charAt( 0 ) === "'" ) {
			symbol = symbol.replace( /''/, "'" );
			if ( symbol.length > 2 ) {
				symbol = symbol.slice( 1, -1 );
			}
			return symbol;
		}
		return symbolMap[ symbol ];
	});
};

});
