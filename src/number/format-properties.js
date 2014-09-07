define([
	"./pattern-properties",
	"./symbol",
	"./symbol/map",
	"./symbol/name",
	"../util/number/round"
], function( numberPatternProperties, numberSymbol, numberSymbolMap,
	numberSymbolName, numberRound ) {

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
 * Return the formatted number. FIXME
 * ref: http://www.unicode.org/reports/tr35/tr35-numbers.html
 */
return function( pattern, cldr, options ) {
	var negativePattern, negativeProperties, properties;

	function getOptions( attribute ) {
		if ( attribute in options ) {
			properties[ attribute ] = options[ attribute ];
		}
	}

	options = options || {};
	pattern = pattern.split( ";" );

	negativePattern = pattern[ 1 ] || "-" + pattern[ 0 ];
	negativeProperties = numberPatternProperties( negativePattern );
	properties = numberPatternProperties( pattern[ 0 ] );

	// Extends numberPatternProperties with:
	// @infinitySymbol [String] Infinity symbol.
	// @nanSymbol [String] NaN symbol.
	// @negativePattern [String] Negative pattern.
	// @negativePrefix [String] Negative prefix.
	// @negativeSuffix [String] Negative suffix.
	// @positivePattern [String] Positive pattern.
	// @positivePrefix [String] Negative prefix.
	// @positiveSuffix [String] Negative suffix.
	// @round [Function] Round function.
	// @symbolMap [Object] A bunch of other symbols.
	properties.infinitySymbol = numberSymbol( "infinity", cldr );
	properties.nanSymbol = numberSymbol( "nan", cldr );
	properties.negativePattern = negativePattern;
	properties.negativePrefix = negativeProperties.prefix;
	properties.negativeSuffix = negativeProperties.suffix;
	properties.positivePattern = pattern[ 0 ];
	properties.positivePrefix = properties.prefix;
	properties.positiveSuffix = properties.suffix;
	properties.round = numberRound( options.round );
	properties.symbolMap = numberSymbolMap( cldr );

	getOptions( "minimumIntegerDigits" );
	getOptions( "minimumFractionDigits" );
	getOptions( "maximumFractionDigits" );

	getOptions( "minimumSignificantDigits" );
	getOptions( "maximumSignificantDigits" );

	// Grouping separators
	if ( options.useGrouping === false ) {
		properties.primaryGroupingSize = null;
	}

	// Normalize number of digits if only one of either minimumFractionDigits or
	// maximumFractionDigits is passed in as an option
	if ( "minimumFractionDigits" in options && !( "maximumFractionDigits" in options ) ) {
		properties.maximumFractionDigits = Math.max(
			properties.minimumFractionDigits,
			properties.maximumFractionDigits
		);
	} else if ( !( "minimumFractionDigits" in options ) &&
			"maximumFractionDigits" in options ) {
		properties.minimumFractionDigits = Math.min(
			properties.minimumFractionDigits,
			properties.maximumFractionDigits
		);
	}

	return properties;
};

});
