define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/string",
	"./relative-time/format",
	"./relative-time/properties",

	"./number",
	"./plural",
	"cldr/event"
], function( Globalize, validateCldr, validateDefaultLocale, validateParameterPresence,
	validateParameterTypeNumber, validateParameterTypeString, relativeTimeFormat,
	relativeTimeProperties ) {

/**
 * .formatRelativeTime( value, unit [, options] )
 *
 * @value [Number] The number of unit to format.
 *
 * @unit [String] see .relativeTimeFormatter() for details.
 *
 * @options [Object] see .relativeTimeFormatter() for details.
 *
 * Formats a relative time according to the given unit, options, and the default/instance locale.
 */
Globalize.formatRelativeTime =
Globalize.prototype.formatRelativeTime = function( value, unit, options ) {

	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.relativeTimeFormatter( unit, options )( value );
};

/**
 * .relativeTimeFormatter( unit [, options ])
 *
 * @unit [String] String value indicating the unit to be formatted. eg. "day", "week", "month", etc.
 *
 * @options [Object]
 * - form: [String] eg. "short" or "narrow". Or falsy for default long form.
 *
 * Returns a function that formats a relative time according to the given unit, options, and the
 * default/instance locale.
 */
Globalize.relativeTimeFormatter =
Globalize.prototype.relativeTimeFormatter = function( unit, options ) {
	var cldr, numberFormatter, pluralGenerator, properties;

	validateParameterPresence( unit, "unit" );
	validateParameterTypeString( unit, "unit" );

	cldr = this.cldr;
	options = options || {};

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );
	properties = relativeTimeProperties( unit, cldr, options );
	cldr.off( "get", validateCldr );

	numberFormatter = this.numberFormatter( options );
	pluralGenerator = this.pluralGenerator();

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return relativeTimeFormat( value, numberFormatter, pluralGenerator, properties );
	};
};

return Globalize;

});
