define([
	"./format-properties",
	"./symbol/inverted-map",
	"../util/always-array",
	"../util/object/map",
	"../util/regexp/cf-g",
	"../util/regexp/dash-g",
	"../util/regexp/escape",
	"../util/regexp/zs-g",
	"../util/remove-literal-quotes"
], function( numberFormatProperties, numberSymbolInvertedMap, alwaysArray, objectMap, regexpCfG,
	regexpDashG, regexpEscape, regexpZsG, removeLiteralQuotes ) {

/**
 * parseProperties( pattern, cldr )
 *
 * @pattern [String] raw pattern for numbers.
 *
 * @cldr [Cldr instance].
 *
 * Return parser properties, used to feed parser function.
 *
 * TODO:
 * - Scientific_notation;
 * - Padding;
 */
return function( pattern, cldr, options ) {
	var aux, decimalSymbolRe, digitsRe, groupingSeparatorRe, infinitySymbol, invertedNuDigitsMap,
		invertedSymbolMap, maximumFractionDigits, maximumSignificantDigits,
		minimumSignificantDigits, nanSymbol, negativePrefix, negativeSuffix, nuDigitsMap,
		numberTokenizer, prefix, primaryGroupingSize, secondaryGroupingSize, suffix, symbolMap,
		formatProperties = numberFormatProperties( pattern, cldr, options );

	// Loose Matching:
	// - Ignore all format characters, which includes RLM, LRM or ALM used to control BIDI
	//   formatting.
	// - Map all characters in [:Zs:] to U+0020 SPACE;
	// - Map all characters in [:Dash:] to U+002D HYPHEN-MINUS;
	function looseMatching( value ) {
		return value
			.replace( regexpCfG, "" )
			.replace( regexpDashG, "-" )
			.replace( regexpZsG, " " );
	}

	prefix = looseMatching( formatProperties[ 0 ] );
	maximumFractionDigits = formatProperties[ 4 ];
	minimumSignificantDigits = formatProperties[ 5 ];
	maximumSignificantDigits = formatProperties[ 6 ];
	primaryGroupingSize = formatProperties[ 8 ];
	secondaryGroupingSize = formatProperties[ 9 ];
	suffix = looseMatching( formatProperties[ 10 ] );
	negativePrefix = looseMatching( formatProperties[ 13 ] );
	negativeSuffix = looseMatching( formatProperties[ 14 ] );
	infinitySymbol = looseMatching( formatProperties[ 16 ] );
	nanSymbol = looseMatching( formatProperties[ 17 ] );
	symbolMap = objectMap( formatProperties[ 18 ], function( pair ) {
		return [ pair[ 0 ], looseMatching( pair[ 1 ] ) ];
	});
	nuDigitsMap = formatProperties[ 19 ];

	invertedSymbolMap = objectMap( numberSymbolInvertedMap( cldr ), function( pair ) {
		return [ looseMatching( pair[ 0 ] ), pair[ 1 ] ];
	});

	digitsRe = nuDigitsMap ? "[" + nuDigitsMap + "]" : "\\d";
	groupingSeparatorRe = regexpEscape( symbolMap[ "," ] );
	decimalSymbolRe = regexpEscape( symbolMap[ "." ] );

	if ( nuDigitsMap ) {
		invertedNuDigitsMap = nuDigitsMap.split( "" ).reduce(function( object, localizedDigit, i ) {
			object[ localizedDigit ] = String( i );
			return object;
		}, {} );
	}

	aux = [ prefix, suffix, negativePrefix, negativeSuffix ].map(function( value ) {
		return value.replace( /('([^']|'')+'|'')|./g, function( character, literal ) {

			// Literals
			if ( literal ) {
				return removeLiteralQuotes( literal );
			}

			// Symbols
			character = character.replace( /[\-+E%\u2030]/, function( symbol ) {
				return symbolMap[ symbol ];
			});

			return character;
		});
	});

	prefix = aux[ 0 ];
	suffix = aux[ 1 ];
	negativePrefix = aux[ 2 ];
	negativeSuffix = aux[ 3 ];

	// Number
	//
	// number_re =                       integer fraction?
	//
	// integer =                         digits | digits_using_grouping_separators
	//
	// fraction =                        regexp((.\d+)?)
	//
	// digits =                          regexp(\d+)
	//
	// digits_w_grouping_separators =    digits_w_1_grouping_separators |
	//                                   digits_w_2_grouping_separators
	//
	// digits_w_1_grouping_separators =  regexp(\d{1,3}(,\d{3})+)
	//
	// digits_w_2_grouping_separators =  regexp(\d{1,2}((,\d{2})*(,\d{3})))

	// Integer part
	numberTokenizer = digitsRe + "+";

	// Grouping separators
	if ( primaryGroupingSize ) {
		if ( secondaryGroupingSize ) {
			aux = digitsRe + "{1," + secondaryGroupingSize + "}((" + groupingSeparatorRe +
				digitsRe + "{" + secondaryGroupingSize + "})*(" + groupingSeparatorRe +
				digitsRe + "{" + primaryGroupingSize + "}))";
		} else {
			aux = digitsRe + "{1," + primaryGroupingSize + "}(" + groupingSeparatorRe +
				digitsRe + "{" + primaryGroupingSize + "})+";
		}
		numberTokenizer = "(" + aux + "|" + numberTokenizer + ")";
	}

	// Fraction part? Only included if 1 or 2.
	// 1: Using significant digit format.
	// 2: Using integer and fractional format && it has a maximumFractionDigits.
	if ( !isNaN( minimumSignificantDigits * maximumSignificantDigits ) || /* 1 */
				maximumFractionDigits /* 2 */ ) {

		// Handle non-padded decimals, e.g., `".12"` => `0.12` by making the integer part optional.
		numberTokenizer = "(" + numberTokenizer + ")?";

		numberTokenizer += "(" + decimalSymbolRe + digitsRe + "+)?";
	}

	// 0: @invertedSymbolMap [Object] Inverted symbol map.
	// 1: @invertedNuDigitsMap [Object] Inverted digits map if numbering system is different than
	//    `latn`.
	// 2: @tokenizer [Object] Tokenizer map, used by parser to consume input.
	return [
		invertedSymbolMap,
		invertedNuDigitsMap,
		{
			infinity: new RegExp( "^" + regexpEscape( infinitySymbol ) ),
			nan:  new RegExp( "^" + regexpEscape( nanSymbol ) ),
			negativePrefix: new RegExp( "^" + regexpEscape( negativePrefix ) ),
			negativeSuffix: new RegExp( "^" + regexpEscape( negativeSuffix ) ),
			number: new RegExp( "^" + numberTokenizer ),
			prefix: new RegExp( "^" + regexpEscape( prefix ) ),
			suffix: new RegExp( "^" + regexpEscape( suffix ) )
		}
	];

};

});
