define([
	"cldr",
	"./common/validate/presence",
	"./common/validate/type",
	"./common/validate/type/date",
	"./common/validate/type/date-pattern",
	"./common/validate/type/string",
	"./core",
	"./date/all-presets",
	"./date/expand-pattern",
	"./date/format",
	"./date/parse",
	"./util/always-array",
	"cldr/supplemental"
], function( Cldr, validatePresence, validateTypeDataType, validateTypeDate, validateTypeDatePattern, validateTypeString, Globalize, dateAllPresets, dateExpandPattern, dateFormat, dateParse, alwaysArray ) {

/**
 * .formatDate( value, pattern )
 *
 * @value [Date]
 *
 * @pattern [String or Object] see date/expand_pattern for more info.
 *
 * Formats a date or number according to the given pattern string and the default/instance locale.
 */
Globalize.formatDate =
Globalize.prototype.formatDate = function( value, pattern ) {
	var cldr;

	validatePresence( value, "value" );
	validatePresence( pattern, "pattern" );
	validateTypeDate( value, "value" );
	validateTypeDatePattern( pattern, "pattern" );

	cldr = this.cldr;

	pattern = dateExpandPattern( pattern, cldr );
	return dateFormat( value, pattern, cldr );
};

/**
 * .parseDate( value, patterns )
 *
 * @value [String]
 *
 * @patterns [Array] Optional. See date/expand_pattern for more info about each pattern. Defaults to the list of all presets defined in the locale (see date/all_presets for more info).
 *
 * Return a Date instance or null.
 */
Globalize.parseDate =
Globalize.prototype.parseDate = function( value, patterns ) {
	var cldr, date;

	validatePresence( value, "value" );
	validateTypeString( value, "value" );

	cldr = this.cldr;

	if ( !patterns ) {
		patterns = dateAllPresets( cldr );
	} else {
		patterns = alwaysArray( patterns );
	}

	patterns.some(function( pattern ) {
		validateTypeDatePattern( pattern, "patterns" );
		pattern = dateExpandPattern( pattern, cldr );
		date = dateParse( value, pattern, cldr );
		return !!date;
	});

	return date || null;
};

return Globalize;

});
