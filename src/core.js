define([
	"cldr"
], function( Cldr ) {

var defaultLocale,
	Globalize = {};

/**
 * Globalize.load( json )
 *
 * @json [JSON]
 *
 * Load resolved or unresolved cldr data.
 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
 */
Globalize.load = function( json ) {
	Cldr.load( json );
};

/**
 * Globalize.locale( [locale] )
 *
 * @locale [String]
 *
 * Set default locale.
 * Get default locale if locale argument is undefined.
 * Somewhat equivalent to previous culture( selector ).
 */
Globalize.locale = function( locale ) {
	if ( arguments.length ) {
		defaultLocale = new Cldr( locale );
	}
	return defaultLocale;
};

return Globalize;

});
