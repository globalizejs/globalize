define([
	"../number/numbering-system-digits-map"
], function( numberNumberingSystemDigitsMap ) {

/**
 * digitShaperProperties( cldr , options )
 *
 * @cldr [Cldr instance].
 *
 * @options [Object]:
 * - shaperType: [String] "National" (default), "Contextual" or "None".
 * - textDir [String] "ltr", "rtl", or "auto" (default).
 *
 * Return the processed properties that will be used in digit-shaper/shape.
 */
return function( cldr, options ) {
	var properties, nuDigitsMap, nationalDigits;

	nationalDigits = numberNumberingSystemDigitsMap( cldr );

	if ( cldr.locale === "en" ) {
		nationalDigits = "0123456789";
	}

	nuDigitsMap = nationalDigits.split( "" ).reduce(function( object, localizedDigit, i ) {
		object[ i ] = localizedDigit;
		object[ localizedDigit ] = String( i );
		return object;
	}, {} );

	properties = options;
	properties.locale = cldr.locale;
	properties.nuDigitsMap = nuDigitsMap;
	properties.nationalDigitsRegex = new RegExp ( "[" + nationalDigits + "]", "g" );

	// Return:
	// @shaperType [String] "National" (default), "Contextual" or "Latin".
	// @textDir [String] "ltr", "rtl", or "auto" (default).
	// @locale [String] The target locale to convert digits to.
	// @nuDigitsMap [Object] Digits map for both localized & Latin digits.
	// @nationalDigitsRegex [RegExp] Regular Expression for National digits.
	return properties;
};

});
