define( [ "./shape/contextual-ar" ], function( numberShapeContextualAr ) {
/**
 * shape( value, properties )
 *
 * @value [String].
 *
 * @properties [Object] Output of number/shape-properties.
 *
 * Return the shaped number.
 */
return function( value, properties ) {
	var shaperType, textDir, locale, nuDigitsMap, shapeFromLatinToNational;

	shaperType = properties.shaperType;
	textDir =  properties.textDir;
	locale = properties.locale;
	nuDigitsMap = properties.nuDigitsMap;

	shapeFromLatinToNational = function( text ) {
		return text.replace( /[0-9]/g, function( c ) {
			return nuDigitsMap[ +c ];
		});
	};

	switch ( shaperType ) {
		case "National":
			return shapeFromLatinToNational( value );
		case "Contextual":
			return numberShapeContextualAr( value, nuDigitsMap, textDir === "rtl" ? 2 : 1 );
		default: return value;
	}

};

});
