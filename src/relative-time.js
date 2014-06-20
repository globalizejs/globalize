define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/parameter-presence",
	"./relative-time/format",
	"./relative-time/properties",

	"./number",
	"./plural",
	"cldr/event"
], function( Globalize, validateCldr, validateParameterPresence, relativeTimeFormat,
	relativeTimeProperties ) {

/**
 * .formatRelativeTime( value, unit[, options] )
 *
 * @value [Date|Object]
 *
 * @unit [String] eg. "day", "week", "month", etc.
 *
 * @options [Object]
 * - form: [String] eg. "short" or "narrow".
 *
 * Formats a relative time according to the given unit, options, and the default/instance locale.
 */
Globalize.formatRelativeTime =
Globalize.prototype.formatRelativeTime = function( value, unit, options ) {

	// TODO validations

	return this.relativeTimeFormatter( unit, options )( value );
};

/**
 * .relativeTimeFormatter( unit[, options ])
 *
 * @unit [String] eg. "day", "week", "month", etc.
 *
 * @options [Object]
 * - form: [String] eg. "short" or "narrow".
 *
 * Returns a function that formats a relative time according to the given unit, options, and the
 * default/instance locale.
 */
Globalize.relativeTimeFormatter =
Globalize.prototype.relativeTimeFormatter = function( unit, options ) {
	var cldr, numberFormatter, plural, properties;

	// TODO validations

	cldr = this.cldr;
	options = options || {};

	cldr.on( "get", validateCldr );
	properties = relativeTimeProperties( unit, cldr, options );
	cldr.off( "get", validateCldr );

	numberFormatter = this.numberFormatter( options );
	plural = this.pluralGenerator();

	return function( value ) {
		validateParameterPresence( value, "value" );
		return relativeTimeFormat( numberFormatter( value ), plural( value ), properties );
	};
};

return Globalize;

});
