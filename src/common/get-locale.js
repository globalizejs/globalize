define([
	"cldr",
	"../core"
], function( Cldr, Globalize ) {

/**
 * getLocale( [locale] )
 *
 * @locale [String]
 *
 * Get locale instance given locale string.
 * Get default locale if locale argument is undefined.
 */
return function( locale ) {
	return locale ? new Cldr( locale ) : Globalize.locale();
};

});
