define([
	"./get",
	"../common/format-message"
], function( unitGet, formatMessage ) {

/**
 * format( value, unit, options, cldr )
 *
 * @value [Number]
 *
 * @unit [String]:
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * TODO pass along numberFormatter
 *
 * Format units such as seconds, minutes, days, weeks, etc.
 *
 * OBS:
 *
 * Unit Sequences are not implemented.
 * http://www.unicode.org/reports/tr35/tr35-35/tr35-general.html#Unit_Sequences
 *
 * Duration Unit (for composed time unit durations) is not implemented.
 * http://www.unicode.org/reports/tr35/tr35-35/tr35-general.html#durationUnit
 */
return function( value, unit, options, pluralGenerator, cldr ) {
	var form, message, ret;
	options = options || {};
	form = options.form || "long";

	ret = unitGet( unit, form, cldr );

	if ( !ret ) {
		return;
	}

  message = ret[ pluralGenerator( value ) ];

	return formatMessage( message, [ value ] );
};

});
