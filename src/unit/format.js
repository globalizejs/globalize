define([
	"../common/format-message"
], function( formatMessage ) {

/**
 * format( value, unit, pluralGenerator )
 *
 * @value [Number]
 *
 * @unitProperies [Object]: localized unit data from cldr
 *
 * @pluralGenerator [Object]: A pluralGenerator from Globalize.pluralGenerator
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
return function( value, unitProperties, pluralGenerator ) {
	var message;

  message = unitProperties[ pluralGenerator( value ) ];

	return formatMessage( message, [ value ] );
};

});
