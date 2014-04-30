define([
	"cldr",
	"../core"
], function( Cldr, Globalize ) {

/**
 * getCldr( [locale|cldr] )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Get Cldr instance given locale or cldr.
 *
 * Get default Cldr instance if neither locale or cldr are defined.
 */
return function( locale ) {
	return locale ? ( locale instanceof Cldr ? locale : new Cldr( locale ) ) : Globalize.locale();
};

});
