define([
	"cldr",
	"./core",
	"./date/all-presets",
	"./date/expand-pattern",
	"./date/format",
	"./date/parse",
	"./util/always-array",
	"./util/array/some",
	"cldr/supplemental"
], function( Cldr, Globalize, dateAllPresets, dateExpandPattern, dateFormat, dateParse, alwaysArray, arraySome ) {

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

	if ( !( value instanceof Date ) ) {
		throw new Error( "Value is not date" );
	}

	if ( !pattern ) {
		throw new Error( "Missing pattern" );
	}

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

	if ( typeof value !== "string" ) {
		throw new Error( "invalid value (" + value + "), string expected" );
	}

	cldr = this.cldr;

	if ( !patterns ) {
		patterns = dateAllPresets( cldr );
	} else {
		patterns = alwaysArray( patterns );
	}

	arraySome( patterns, function( pattern ) {
		pattern = dateExpandPattern( pattern, cldr );
		date = dateParse( value, pattern, cldr );
		return !!date;
	});

	return date || null;
};

return Globalize;

});
