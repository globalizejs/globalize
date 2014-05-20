define([
	"./core",
	"./unit/format"
], function( Globalize, unitFormat ) {

/**
 * Globalize.formatUnit( value, unit, options )
 *
 * @value [Number]
 *
 * @unit [String]:
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * Format units such as seconds, minutes, days, weeks, etc.
 */
Globalize.formatUnit = function( value, unit, options ) {
	if ( typeof value !== "number" ) {
		throw new Error( "Value is not a number" );
	}

	if ( !unit ) {
		throw new Error( "Missing unit" );
	}

	return unitFormat( value, unit, options, this.cldr, this );
};

return Globalize;

});
