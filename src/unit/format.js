define([
	"./get",
	"../common/format-message"
], function( unitGet, formatMessage ) {

/**
 * format( value, unit, options, cldr, globalize )
 *
 * @value [Number]
 *
 * @unit [String]:
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * FIXME
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
return function( value, unit, options, pluralGenerator, cldr, globalize ) {
	var dividend, divisor, form, message, ret;
	options = options || {};
	form = options.form || "long";

	ret = unitGet( unit, form, cldr );

	if ( !ret ) {
		return;
	}

	// Compound Unit, eg. "foot-per-second" or "foot/second".
	if ( ( /-per-|\// ).test( unit ) ) {

		// "For the divisor, the 'one' plural category should be used, while for the
		// dividend the appropriate plural form according the placeholder number
		// should be used" UTS#35
		//
		// "There is a known problem with some languages in the long form in that
		// the divisor should be inflected. This will probably require the future
		// addition of a special 'divisor' form of units commonly used in the
		// divisor." UTS#35
		dividend = globalize.formatPlural( value, ret[ 0 ] );
		divisor = globalize.formatPlural( 1, ret[ 1 ], "" ).trim();
		return formatMessage( cldr.main( [ "units", form, "per/compoundUnitPattern" ] ),
        [ dividend, divisor ] );
	}

  message = ret[ pluralGenerator( value ) ];

	return formatMessage( message, [ value ] );
};

});
