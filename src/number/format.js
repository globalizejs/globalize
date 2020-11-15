define([
	"./compact-pattern-re",
	"./format/grouping-separator",
	"./format/integer-fraction-digits",
	"./format/significant-digits",
	"./symbol/name",
	"../common/parts/push",
	"../util/remove-literal-quotes"
], function( numberCompactPatternRe, numberFormatGroupingSeparator,
	numberFormatIntegerFractionDigits, numberFormatSignificantDigits,
	numberSymbolName, partsPush, removeLiteralQuotes ) {

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
return function( number, properties, pluralGenerator ) {
	var aux, compactMap, infinitySymbol, maximumFractionDigits, maximumSignificantDigits,
		minimumFractionDigits, minimumIntegerDigits, minimumSignificantDigits, nanSymbol,
		nuDigitsMap, prefix, primaryGroupingSize, pattern, round, roundIncrement,
		secondaryGroupingSize, stringToParts, suffix, symbolMap;

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
	nuDigitsMap = properties[ 19 ];
	compactMap = properties[ 20 ];

	// NaN
	if ( isNaN( number ) ) {
		return [ { type: "nan", value: nanSymbol } ];
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

	// For prefix, suffix, and number parts.
	stringToParts = function( string ) {
		var numberType = "integer",
			parts = [];

		// TODO Move the tokenization of all parts that don't depend on number into
		// format-properties.
		string.replace( /('([^']|'')+'|'')|./g, function( character, literal ) {

			// Literals
			if ( literal ) {
				partsPush( parts, "literal", removeLiteralQuotes( literal ) );
				return;
			}

			// Currency symbol
			if ( character === "\u00A4" ) {
				partsPush( parts, "currency", character );
				return;
			}

			// Symbols
			character = character.replace( /[.,\-+E%\u2030]/, function( symbol ) {
				if ( symbol === "." ) {
					numberType = "fraction";
				}
				partsPush( parts, numberSymbolName[ symbol ], symbolMap[ symbol ] );

				// "Erase" handled character.
				return "";
			});

			// Number
			character = character.replace( /[0-9]/, function( digit ) {

				// Numbering system
				if ( nuDigitsMap ) {
					digit = nuDigitsMap[ +digit ];
				}
				partsPush( parts, numberType, digit );

				// "Erase" handled character.
				return "";
			});

			// Etc
			character.replace( /./, function( etc ) {
				partsPush( parts, "literal", etc );
			});
		});
		return parts;
	};

	prefix = stringToParts( prefix );
	suffix = stringToParts( suffix );

	// Infinity
	if ( !isFinite( number ) ) {
		return prefix.concat(
			{ type: "infinity", value: infinitySymbol },
			suffix
		);
	}

	// Percent
	if ( pattern.indexOf( "%" ) !== -1 ) {
		number *= 100;

	// Per mille
	} else if ( pattern.indexOf( "\u2030" ) !== -1 ) {
		number *= 1000;
	}

	var compactPattern, compactDigits, compactProperties, divisor, numberExponent, pluralForm;

	// Compact mode: initial number digit processing
	if ( compactMap ) {
		numberExponent = Math.abs( Math.floor( number ) ).toString().length - 1;
		numberExponent = Math.min( numberExponent, compactMap.maxExponent );

		// Use default plural form to perform initial decimal shift
		if ( numberExponent >= 3 ) {
			compactPattern = compactMap[ numberExponent ] && compactMap[ numberExponent ].other;
		}

		if ( compactPattern === "0" ) {
			compactPattern = null;
		} else if ( compactPattern ) {
			compactDigits = compactPattern.split( "0" ).length - 1;
			divisor = numberExponent - ( compactDigits - 1 );
			number = number / Math.pow( 10, divisor );
		}
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

	// Compact mode: apply formatting
	if ( compactMap && compactPattern ) {

		// Get plural form after possible roundings
		pluralForm = pluralGenerator ? pluralGenerator( +number ) : "other";

		compactPattern = compactMap[ numberExponent ][ pluralForm ] || compactPattern;
		compactProperties = compactPattern.match( numberCompactPatternRe );

		// TODO Move the tokenization of all parts that don't depend on number into
		// format-properties.
		aux = function( string ) {
			var parts = [];
			string.replace( /(\s+)|([^\s0]+)/g, function( _garbage, space, compact ) {

				// Literals
				if ( space ) {
					partsPush( parts, "literal", space );
					return;
				}

				// Compact value
				if ( compact ) {
					partsPush( parts, "compact", compact );
					return;
				}
			});
			return parts;
		};

		// update prefix/suffix with compact prefix/suffix
		prefix = prefix.concat( aux( compactProperties[ 1 ] ) );
		suffix = aux( compactProperties[ 3 ] ).concat( suffix );
	}

	// Remove the possible number minus sign
	number = number.replace( /^-/, "" );

	// Grouping separators
	if ( primaryGroupingSize ) {
		number = numberFormatGroupingSeparator( number, primaryGroupingSize,
			secondaryGroupingSize );
	}

	// Scientific notation
	// TODO implement here

	// Padding/'([^']|'')+'|''|[.,\-+E%\u2030]/g
	// TODO implement here

	return prefix.concat(
		stringToParts( number ),
		suffix
	);
};

});
