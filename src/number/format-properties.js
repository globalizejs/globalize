define([
	"./compact",
	"./numbering-system-digits-map",
	"./pattern-properties",
	"./symbol",
	"./symbol/map",
	"./symbol/name",
	"../util/number/round"
], function( numberCompact, numberNumberingSystemDigitsMap, numberPatternProperties, numberSymbol,
	numberSymbolMap, numberSymbolName, numberRound ) {

/**
 * formatProperties( pattern, cldr [, options] )
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
 * Return the processed properties that will be used in number/format.
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( pattern, cldr, options ) {
	var negativePattern, negativePrefix, negativeProperties, negativeSuffix, positivePattern,
		roundFn, properties;

	function getOptions( attribute, propertyIndex ) {
		if ( attribute in options ) {
			properties[ propertyIndex ] = options[ attribute ];
		}
	}

	options = options || {};
	pattern = pattern.split( ";" );

	positivePattern = pattern[ 0 ];

	negativePattern = pattern[ 1 ] || "-" + positivePattern;
	negativeProperties = numberPatternProperties( negativePattern );
	negativePrefix = negativeProperties[ 0 ];
	negativeSuffix = negativeProperties[ 10 ];

	// Have runtime code to refer to numberRound() instead of including it explicitly.
	roundFn = numberRound( options.round );
	roundFn.generatorString = function() {
		return "numberRound(" + ( options.round ? "\"" + options.round + "\"" : "" ) + ")";
	};

	properties = numberPatternProperties( positivePattern ).concat([
		positivePattern,
		negativePrefix + positivePattern + negativeSuffix,
		negativePrefix,
		negativeSuffix,
		roundFn,
		numberSymbol( "infinity", cldr ),
		numberSymbol( "nan", cldr ),
		numberSymbolMap( cldr ),
		numberNumberingSystemDigitsMap( cldr )
	]);

	if ( options.compact ) {

		// The compact digits number pattern is always `0+`, so override the following properties.
		// Note: minimumIntegerDigits would actually range from `0` to `000` based on the scale of
		// the value to be formatted, though we're always using 1 as a simplification, because the
		// number won't be zero-padded since we chose the right format based on the scale, i.e.,
		// we'd never see something like `003M` anyway.
		properties[ 2 ] = 1; // minimumIntegerDigits
		properties[ 3 ] = 0; // minimumFractionDigits
		properties[ 4 ] = 0; // maximumFractionDigits
		properties[ 5 ] = // minimumSignificantDigits &
			properties[ 6 ] = undefined ; // maximumSignificantDigits

		properties[20] = numberCompact( options.compact, cldr );
	}

	getOptions( "minimumIntegerDigits", 2 );
	getOptions( "minimumFractionDigits", 3 );
	getOptions( "maximumFractionDigits", 4 );
	getOptions( "minimumSignificantDigits", 5 );
	getOptions( "maximumSignificantDigits", 6 );

	// Grouping separators
	if ( options.useGrouping === false ) {
		properties[ 8 ] = null;
	}

	// Normalize number of digits if only one of either minimumFractionDigits or
	// maximumFractionDigits is passed in as an option
	if ( "minimumFractionDigits" in options && !( "maximumFractionDigits" in options ) ) {

		// maximumFractionDigits = Math.max( minimumFractionDigits, maximumFractionDigits );
		properties[ 4 ] = Math.max( properties[ 3 ], properties[ 4 ] );
	} else if ( !( "minimumFractionDigits" in options ) &&
			"maximumFractionDigits" in options ) {

		// minimumFractionDigits = Math.min( minimumFractionDigits, maximumFractionDigits );
		properties[ 3 ] = Math.min( properties[ 3 ], properties[ 4 ] );
	}

	// Return:
	// 0-10: see number/pattern-properties.
	// 11: @positivePattern [String] Positive pattern.
	// 12: @negativePattern [String] Negative pattern.
	// 13: @negativePrefix [String] Negative prefix.
	// 14: @negativeSuffix [String] Negative suffix.
	// 15: @round [Function] Round function.
	// 16: @infinitySymbol [String] Infinity symbol.
	// 17: @nanSymbol [String] NaN symbol.
	// 18: @symbolMap [Object] A bunch of other symbols.
	// 19: @nuDigitsMap [Array] Digits map if numbering system is different than `latn`.
	// 20: @compactMap [Object] Map of per-digit-count format patterns for specified compact mode.
	return properties;
};

});
