define([
	"./core",
	"./common/runtime-bind",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/parameter-type/string",
	"./unit/formatter-fn",
	"./unit/properties",

	"./number",
	"./plural"
], function( Globalize, runtimeBind, validateParameterPresence, validateParameterTypeNumber,
	validateParameterTypePlainObject, validateParameterTypeString, unitFormatterFn,
	unitProperties ) {

/**
 * Globalize.formatUnit( value, unit, options )
 *
 * @value [Number]
 *
 * @unit [String]: The unit (e.g "second", "day", "year")
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * Format units such as seconds, minutes, days, weeks, etc.
 */
Globalize.formatUnit =
Globalize.prototype.formatUnit = function( value, unit, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.unitFormatter( unit, options )( value );
};

/**
 * Globalize.unitFormatter( unit, options )
 *
 * @unit [String]: The unit (e.g "second", "day", "year")
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * - numberFormatter: [Object] Globalize.numberFormatter object. The default value is the
 *   default numberFormatter for the current locale.
 */
Globalize.unitFormatter =
Globalize.prototype.unitFormatter = function( unit, options ) {
	var args, form, numberFormatter, pluralGenerator, returnFn, properties;

	validateParameterPresence( unit, "unit" );
	validateParameterTypeString( unit, "unit" );

	validateParameterPresence( options, "options" );
	validateParameterTypePlainObject( options, "options" );

	args = [ unit, options ];
	form = options.form || "long";
	properties = unitProperties( unit, form, this.cldr );

	numberFormatter = options.numberFormatter || this.numberFormatter();
	pluralGenerator = this.pluralGenerator();
	returnFn = unitFormatterFn( properties, numberFormatter, pluralGenerator );

	runtimeBind( args, this.cldr, returnFn, [ numberFormatter, pluralGenerator, properties ] );

	return returnFn;
};

return Globalize;

});
