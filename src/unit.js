define([
	"./core",
	"./unit/format",

  "./plural"
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
Globalize.prototype.formatUnit = function( value, unit, options ) {
  var pluralGenerator;

	if ( typeof value !== "number" ) {
		throw new Error( "Value is not a number" );
	}

	if ( !unit ) {
		throw new Error( "Missing unit" );
	}

	pluralGenerator = this.pluralGenerator();

	return unitFormat( value, unit, options, pluralGenerator, this.cldr, this );
};

return Globalize;

});
