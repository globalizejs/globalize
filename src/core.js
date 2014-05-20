define([
	"cldr",
	"./util/always-cldr"
], function( Cldr, alwaysCldr ) {

/**
 * [new] Globalize( locale )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Create a Globalize instance.
 */
function Globalize( locale ) {
	if ( !( this instanceof Globalize ) ) {
		return new Globalize( locale );
	}

	if ( !locale ) {
		throw new Error( "Missing locale" );
	}

	this.cldr = alwaysCldr( locale );
}

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
		this.cldr = alwaysCldr( locale );
	}
	return this.cldr;
};

return Globalize;

});
