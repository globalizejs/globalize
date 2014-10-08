define([
	"./pattern-properties",
	"./symbol",
	"./symbol/inverted-map",
	"./symbol/name",
	"../util/object/flat-extend"
], function( numberPatternProperties, numberSymbol, numberSymbolInvertedMap, numberSymbolName,
	objectFlatExtend ) {

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
	// 1: @invertedSymbolMap [Object] Inverted symbol map augmented with sanity check.
	//    The sanity check prevents permissive parsing, i.e., it prevents symbols that doesn't
	//    belong to the localized set to pass through. This is obtained with the result of the
	//    inverted map object overloading symbol name map object (the remaining symbol name
	//    mappings will invalidate parsing, working as the sanity check).
	// 2: @negativePrefix [String] Negative prefix.
	// 3: @negativeSuffix [String] Negative suffix with percent or per mille stripped out.
	return [
		numberSymbol( "infinity", cldr ),
		objectFlatExtend( {}, numberSymbolName, numberSymbolInvertedMap( cldr ) ),
		negativeProperties[ 0 ],
		negativeProperties[ 10 ].replace( "%", "" ).replace( "\u2030", "" )
	];
};

});
