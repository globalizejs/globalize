define([
	"./core",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./unit/format",

  "./plural"
], function( Globalize, validateParameterPresence, validateParameterTypeNumber, unitFormat ) {

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
Globalize.formatUnit =
Globalize.prototype.formatUnit = function( value, unit, options ) {
  var pluralGenerator;

  validateParameterTypeNumber( value );
  validateParameterPresence( unit );

	pluralGenerator = this.pluralGenerator();

	return unitFormat( value, unit, options, pluralGenerator, this.cldr, this );
};

return Globalize;

});
