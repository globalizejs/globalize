define([
	"cldr",
	"./common/validate/cldr",
	"./common/validate/default-locale",
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
	"cldr/event",
	"cldr/supplemental"
], function( Cldr, validateCldr, validateDefaultLocale, validatePresence, validateTypeDataType,
	validateTypeDate, validateTypeDatePattern, validateTypeString, Globalize, dateAllPresets,
	dateExpandPattern, dateFormat, dateParse, alwaysArray ) {

function validateRequiredCldr( path, value ) {
	validateCldr( path, value, {
		skip: [
			/dates\/calendars\/gregorian\/days\/.*\/short/,
			/supplemental\/timeData\/(?!001)/,
			/supplemental\/weekData\/(?!001)/
		]
	});
}

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
	var cldr, ret;

	validatePresence( value, "value" );
	validatePresence( pattern, "pattern" );
	validateTypeDate( value, "value" );
	validateTypeDatePattern( pattern, "pattern" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( pattern, cldr );
	ret = dateFormat( value, pattern, cldr );
	cldr.off( "get", validateRequiredCldr );

	return ret;
};

/**
 * .parseDate( value, patterns )
 *
 * @value [String]
 *
 * @patterns [Array] Optional. See date/expand_pattern for more info about each pattern. Defaults
 * to the list of all presets defined in the locale (see date/all_presets for more info).
 *
 * Return a Date instance or null.
 */
Globalize.parseDate =
Globalize.prototype.parseDate = function( value, patterns ) {
	var cldr, date;

	validatePresence( value, "value" );
	validateTypeString( value, "value" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );

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

	cldr.off( "get", validateRequiredCldr );

	return date || null;
};

return Globalize;

});
