define([
	"./numbering-system-digits-map",
	"./pattern-properties",
	"./symbol",
	"./symbol/inverted-map",
	"./symbol/name",
	"../util/object/extend"
], function( numberNumberingSystemDigitsMap, numberPatternProperties, numberSymbol,
	numberSymbolInvertedMap, numberSymbolName, objectExtend ) {

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
	var invertedNuDigitsMap, invertedNuDigitsMapSanityCheck, negativePattern, negativeProperties,
		nuDigitsMap = numberNumberingSystemDigitsMap( cldr );

	pattern = pattern.split( ";" );
	negativePattern = pattern[ 1 ] || "-" + pattern[ 0 ];
	negativeProperties = numberPatternProperties( negativePattern );
	if ( nuDigitsMap ) {
		invertedNuDigitsMap = nuDigitsMap.split( "" ).reduce(function( object, localizedDigit, i ) {
			object[ localizedDigit ] = String( i );
			return object;
		}, {} );
		invertedNuDigitsMapSanityCheck = "0123456789".split( "" ).reduce(function( object, digit ) {
			object[ digit ] = "invalid";
			return object;
		}, {} );
		invertedNuDigitsMap = objectExtend(
			invertedNuDigitsMapSanityCheck,
			invertedNuDigitsMap
		);
	}

	// 0: @infinitySymbol [String] Infinity symbol.
	// 1: @invertedSymbolMap [Object] Inverted symbol map augmented with sanity check.
	//    The sanity check prevents permissive parsing, i.e., it prevents symbols that doesn't
	//    belong to the localized set to pass through. This is obtained with the result of the
	//    inverted map object overloading symbol name map object (the remaining symbol name
	//    mappings will invalidate parsing, working as the sanity check).
	// 2: @negativePrefix [String] Negative prefix.
	// 3: @negativeSuffix [String] Negative suffix with percent or per mille stripped out.
	// 4: @invertedNuDigitsMap [Object] Inverted digits map if numbering system is different than
	//    `latn` augmented with sanity check (similar to invertedSymbolMap).
	return [
		numberSymbol( "infinity", cldr ),
		objectExtend( {}, numberSymbolName, numberSymbolInvertedMap( cldr ) ),
		negativeProperties[ 0 ],
		negativeProperties[ 10 ].replace( "%", "" ).replace( "\u2030", "" ),
		invertedNuDigitsMap
	];
};

});
