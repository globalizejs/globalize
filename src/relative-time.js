define([
	"./core",
	"./common/validate",
	"./relative-time/format",
	"./relative-time/properties",

	"./number",
	"./plural",
	"cldr/event"
], function( Globalize, validate, relativeTimeFormat, relativeTimeProperties ) {

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

	validate.parameterPresence( value, "value" );
	validate.parameterTypeNumber( value, "value" );

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

	validate.parameterPresence( unit, "unit" );
	validate.parameterTypeString( unit, "unit" );

	cldr = this.cldr;
	options = options || {};

	validate.defaultLocale( cldr );

	cldr.on( "get", validate.cldr );
	properties = relativeTimeProperties( unit, cldr, options );
	cldr.off( "get", validate.cldr );

	numberFormatter = this.numberFormatter( options );
	pluralGenerator = this.pluralGenerator();

	return function( value ) {
		validate.parameterPresence( value, "value" );
		validate.parameterTypeNumber( value, "value" );

		return relativeTimeFormat( value, numberFormatter, pluralGenerator, properties );
	};
};

return Globalize;

});
