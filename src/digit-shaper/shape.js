define( [ "./shape/contextual-ar" ], function( digitShaperShapeContextualAr ) {
/**
 * shape( value, properties )
 *
 * @value [String].
 *
 * @properties [Object] Output of digit-shaper/properties.
 *
 *  Return string with shaped digits according to the context.
 */
return function( value, properties ) {
	var shaperType, textDir, locale, nuDigitsMap, shapeFromLatinToNational,
	shapeFromNationalToLatin, nationalDigitsRegex;

	shaperType = properties.shaperType;
	textDir =  properties.textDir;
	locale = properties.locale;
	nuDigitsMap = properties.nuDigitsMap;
	nationalDigitsRegex = properties.nationalDigitsRegex;

	shapeFromLatinToNational = function( text ) {
		return text.replace( /[0-9]/g, function( c ) {
			return nuDigitsMap[ +c ];
		});
	};

	shapeFromNationalToLatin = function( text ) {
		return text.replace( nationalDigitsRegex, function( c ) {
			return nuDigitsMap[ +c ];
		});
	};

	switch ( shaperType ) {
		case "National":
			return shapeFromLatinToNational( value );
		case "Contextual":
			if ( locale.indexOf( "ar" ) === 0 ) {
				return digitShaperShapeContextualAr( value, nuDigitsMap,
						textDir === "rtl" ? 2 : 1 );
			}
			/* falls through */
		default: return value;
	}

};

});
