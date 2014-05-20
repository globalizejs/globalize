define([
], function( ) {

/**
 * format( value, unit, options )
 *
 * @value [Number]
 *
 * @unit [String]:
 *
 * @options [Object]
 * - form: [String] "long", "short" (default), or "narrow".
 *
 * Format units such as seconds, minutes, days, weeks, etc.
 *
 * OBS:
 *
 * Unit Sequences not implemented.
 * http://www.unicode.org/reports/tr35/tr35-35/tr35-general.html#Unit_Sequences
 *
 * Duration Unit (for composed time unit durations) not implemented.
 * http://www.unicode.org/reports/tr35/tr35-35/tr35-general.html#durationUnit
 */
return function( value, unit, options, cldr, globalizePlural ) {
	var form;
	options = options || {};
	form = options.form || "short";

	unitGet( unit, form, value, cldr, globalizePlural )

	If "/" in the unit:

	// The compoundUnitPattern for "per" is used to construct a pattern such as
	// "feet per second" or "ft/s". Some units already have 'precomputed' forms,
	// such as kilometer-per-hour; where such units exist, they should be used in
	// preference to composing with compoundUnitPattern.
	first try: kilometer-per-hour

	// For the divisor, the "one" plural category should be used, while for the
	// dividend the appropriate plural form according the placeholder number
	// should be used.
	second try: unit / unit (in the `one` plural form)

[There is a known problem with some languages in the long form in that the divisor should be inflected. This will probably require the future addition of a special 'divisor' form of units commonly used in the divisor.]
};

});
