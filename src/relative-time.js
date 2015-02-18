define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/string",
	"./common/validate/parameter-type/number",
	"./relative-time/format",
	"./relative-time/properties",

	"./number",
	"./plural",
	"cldr/event"
], function( Globalize, validateCldr, validateParameterPresence, validateParameterTypeString,
			 validateParameterTypeNumber, relativeTimeFormat, relativeTimeProperties ) {

/**
 * .formatRelativeTime( value, unit[, options] )
 *
 * @value [Number] The number of unit to format.
 *
 * @unit [String] eg. "day", "week", "month", etc.
 *
 * @options [Object]
 * - form: [String] eg. "short" or "narrow". Or falsy for default long form
 * - minWordOffset [Optional Number] The maximum offset when special offset words like
 *  yesterday and tomorrow will be looked for. Some languages provide several of these.
 *  default null -> use all available
 *  Set to 0 to not use any except today, now etc.
 *
 * Formats a relative time according to the given unit, options, and the default/instance locale.
 */
Globalize.formatRelativeTime =
Globalize.prototype.formatRelativeTime = function( value, unit, options ) {

	return this.relativeTimeFormatter( unit, options )( value );
};

/**
 * .relativeTimeFormatter( unit[, options ])
 *
 * @unit [String] eg. "day", "week", "month", etc.
 *
 * @options [Object]
 * - form: [String] eg. "short" or "narrow".
 * - maxWordOffset [Optional Number] The maximum offset for which special offset words like
 *  yesterday and tomorrow will be looked for. Some languages provide several of these.
 *  default 2
 *
 * Returns a function that formats a relative time according to the given unit, options, and the
 * default/instance locale.
 */
Globalize.relativeTimeFormatter =
Globalize.prototype.relativeTimeFormatter = function( unit, options ) {
	var cldr, numberFormatter, plural, properties;

	validateParameterPresence(unit, "unit");
	validateParameterTypeString(unit, "unit");

	cldr = this.cldr;
	options = options || {};

	cldr.on( "get", validateCldr );
	properties = relativeTimeProperties( unit, cldr, options );
	cldr.off( "get", validateCldr );

	numberFormatter = this.numberFormatter( options );
	plural = this.pluralGenerator();

	return function( value ) {
		// This validation is repeated in the numberFormatter, but the numberFormatter
		// isn't always called so we need to do it here as well
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return relativeTimeFormat( value, numberFormatter, plural, properties );
	};
};

return Globalize;

});
