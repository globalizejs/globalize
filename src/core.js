define([
	"cldr"
], function( Cldr ) {

var defaultCldr,
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
 * Globalize.locale( [locale|cldr] )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Set default Cldr instance if locale or cldr argument is passed.
 *
 * Return the default Cldr instance.
 */
Globalize.locale = function( locale ) {
	if ( arguments.length ) {
		defaultCldr = locale instanceof Cldr ? locale : new Cldr( locale );
	}
	return defaultCldr;
};

return Globalize;

});
