define([
	"./number-re",
	"../util/regexp/escape"
], function( numberNumberRe, regexpEscape ) {

/**
 * parse( value, properties )
 *
 * @value [String].
 *
 * @properties [Object] Parser properties is a reduced pre-processed cldr
 * data set returned by numberParserProperties().
 *
 * Return the parsed Number (including Infinity) or NaN when value is invalid.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( value, properties ) {
	var aux, infinitySymbol, invertedNuDigitsMap, invertedSymbolMap, localizedDigitRe,
		localizedSymbolsRe, negativePrefix, negativeSuffix, number, prefix, suffix;

	infinitySymbol = properties[ 0 ];
	invertedSymbolMap = properties[ 1 ];
	negativePrefix = properties[ 2 ];
	negativeSuffix = properties[ 3 ];
	invertedNuDigitsMap = properties[ 4 ];

	// Infinite number.
	if ( aux = value.match( infinitySymbol ) ) {

		number = Infinity;
		prefix = value.slice( 0, aux.length );
		suffix = value.slice( aux.length + 1 );

	// Finite number.
	} else {

		// TODO: Create it during setup, i.e., make it a property.
		localizedSymbolsRe = new RegExp(
			Object.keys( invertedSymbolMap ).map(function( localizedSymbol ) {
				return regexpEscape( localizedSymbol );
			}).join( "|" ),
			"g"
		);

		// Reverse localized symbols.
		value = value.replace( localizedSymbolsRe, function( localizedSymbol ) {
			return invertedSymbolMap[ localizedSymbol ];
		});

		// Reverse localized numbering system.
		if ( invertedNuDigitsMap ) {

			// TODO: Create it during setup, i.e., make it a property.
			localizedDigitRe = new RegExp(
				Object.keys( invertedNuDigitsMap ).map(function( localizedDigit ) {
					return regexpEscape( localizedDigit );
				}).join( "|" ),
				"g"
			);
			value = value.replace( localizedDigitRe, function( localizedDigit ) {
				return invertedNuDigitsMap[ localizedDigit ];
			});
		}

		// Add padding zero to leading decimal.
		if ( value.charAt( 0 ) === "." ) {
			value = "0" + value;
		}

		// Is it a valid number?
		value = value.match( numberNumberRe );
		if ( !value ) {

			// Invalid number.
			return NaN;
		}

		prefix = value[ 1 ];
		suffix = value[ 6 ];

		// Remove grouping separators.
		number = value[ 2 ].replace( /,/g, "" );

		// Scientific notation
		if ( value[ 5 ] ) {
			number += value[ 5 ];
		}

		number = +number;

		// Is it a valid number?
		if ( isNaN( number ) ) {

			// Invalid number.
			return NaN;
		}

		// Percent
		if ( value[ 0 ].indexOf( "%" ) !== -1 ) {
			number /= 100;
			suffix = suffix.replace( "%", "" );

		// Per mille
		} else if ( value[ 0 ].indexOf( "\u2030" ) !== -1 ) {
			number /= 1000;
			suffix = suffix.replace( "\u2030", "" );
		}
	}

	// Negative number
	// "If there is an explicit negative subpattern, it serves only to specify the negative prefix
	// and suffix. If there is no explicit negative subpattern, the negative subpattern is the
	// localized minus sign prefixed to the positive subpattern" UTS#35
	if ( prefix === negativePrefix && suffix === negativeSuffix ) {
		number *= -1;
	}

	return number;
};

});
