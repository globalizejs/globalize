define([
	"./pattern-properties",
	"./symbol",
	"./symbol/inverted-map"
], function( numberPatternProperties, numberSymbol, numberSymbolInvertedMap ) {

/**
 * parseProperties( pattern, cldr )
 *
 * @pattern [String] raw pattern for numbers.
 *
 * @cldr [Cldr instance].
 *
 * Return parser properties, used to feed parser function.
 */
return function( pattern, cldr ) {
	var negativePattern, negativeProperties;

	pattern = pattern.split( ";" );
	negativePattern = pattern[ 1 ] || "-" + pattern[ 0 ];
	negativeProperties = numberPatternProperties( negativePattern );

	// 0: @infinitySymbol [String] Infinity symbol.
	// 1: @invertedSymbolMap [Object] Inverted symbol map.
	// 2: @negativePrefix [String] Negative prefix.
	// 3: @negativeSuffix [String] Negative suffix with percent or per mille stripped out.
	return [
		numberSymbol( "infinity", cldr ),
		numberSymbolInvertedMap( cldr ),
		negativeProperties[ 0 ],
		negativeProperties[ 10 ].replace( "%", "" ).replace( "\u2030", "" )
	];
};

});
