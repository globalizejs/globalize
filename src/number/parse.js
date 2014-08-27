define([
	"./number-re",
	"./pattern-properties",
	"./symbol",
	"./symbol/map",
	"../util/regexp/escape"
], function( numberNumberRe, numberPatternProperties, numberSymbol, numberSymbolMap,
	regexpEscape ) {

/**
 * parse( value, cldr )
 *
 * @value [String].
 *
 * @cldr [Cldr instance].
 *
 * Return the parsed Number (including Infinity) or NaN when value is invalid.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( value, pattern, cldr ) {
	var aux, localizedSymbolsRe, number, prefix, properties, suffix, symbolMap;

	// Infinite number.
	if ( aux = value.match( numberSymbol( "infinity", cldr ) ) ) {

		number = Infinity;
		prefix = value.slice( 0, aux.length );
		suffix = value.slice( aux.length + 1 );

	// Finite number.
	} else {

		symbolMap = numberSymbolMap( cldr );
		localizedSymbolsRe = new RegExp( Object.keys( symbolMap ).map(function( localizedSymbol ) {
			return regexpEscape( localizedSymbol );
		}).join( "|" ), "g" );

		// Reverse localized symbols.
		value = value.replace( localizedSymbolsRe, function( localizedSymbol ) {
			return symbolMap[ localizedSymbol ];
		});

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

		// Per mille
		} else if ( value[ 0 ].indexOf( "\u2030" ) !== -1 ) {
			number /= 1000;
		}
	}

	// Negative number
	// "If there is an explicit negative subpattern, it serves only to specify the negative prefix
	// and suffix. If there is no explicit negative subpattern, the negative subpattern is the
	// localized minus sign prefixed to the positive subpattern" UTS#35
	pattern = pattern.split( ";" );
	properties = numberPatternProperties( pattern[ 1 ] || pattern[ 0 ] );
	if ( prefix === ( pattern[ 1 ] ? "" : "-" ) + properties[ 0 ] && suffix === properties[ 10 ] ) {
		number *= -1;
	}

	return number;
};

});
