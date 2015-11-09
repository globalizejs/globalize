define([
	"./numbering-system-digits-map"
], function( numberNumberingSystemDigitsMap ) {

/**
 * shapeProperties( cldr , options )
 *
 * @cldr [Cldr instance].
 *
 * @options [Object]:
 * - shaperType: [String] "National" (default), "Contextual" or "None".
 * - textDir [String] "ltr", "rtl", or "auto" (default).
 *
 * Return the processed properties that will be used in number/shape.
 */
return function( cldr, options ) {
	var properties, nuDigitsMap, nationalDigits;

	nationalDigits = numberNumberingSystemDigitsMap( cldr );

	nuDigitsMap = nationalDigits.split( "" ).reduce(function( object, localizedDigit, i ) {
		object[ i ] = localizedDigit;
		return object;
	}, {} );

	properties = options;
	properties.locale = cldr.locale;
	properties.nuDigitsMap = nuDigitsMap;

	// Return:
	// @shaperType [String] "National" (default), "Contextual" or "Latin".
	// @textDir [String] "ltr", "rtl", or "auto" (default).
	// @locale [String] The target locale to convert digits to.
	// @nuDigitsMap [Object] Digits map for both localized & Latin digits.
	return properties;
};

});
