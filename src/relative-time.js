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

	// FIXME remove this comment.
	// This method is an alias for `.relativeTimeFormatter( unit, options )( value )`, therefore, it
	// should act as an alias. No duplicate implementation needs to take place in here.

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

	// FIXME remove this comment.
	// Every cldr processing must happen here. The idea is to split the formatting into setup and
	// execution phases. This is the setup phase. The properties variable will keep all the necessary
	// information for the formatting-execution that happens below.
	properties = relativeTimeProperties( unit, cldr, options );
	cldr.off( "get", validateCldr );

	numberFormatter = this.numberFormatter( options );
	plural = this.pluralGenerator();

	return function( value ) {
		validateParameterPresence( value, "value" );

	// FIXME remove this comment.
	// This is the formatting-execution. The idea is having this method not dependent on cldr and as
	// light as possible due to:
	// "For improved performance on iterations, first create the formatter. Then, reuse it on each
	// loop."
		return relativeTimeFormat( numberFormatter( value ), plural( value ), properties );
	};
};

return Globalize;

});
