define([
	"cldr",
	"./common/get-locale",
	"./core",
	"./date/all-presets",
	"./date/expand-pattern",
	"./date/format",
	"./date/parse",
	"./util/always-array",
	"./util/array/some",
	"cldr/supplemental"
], function( Cldr, commonGetLocale, Globalize, dateAllPresets, dateExpandPattern, dateFormat, dateParse, alwaysArray, arraySome ) {

/**
 * Globalize.formatDate( value, pattern, locale )
 *
 * @value [Date]
 *
 * @pattern [String or Object] see date/expand_pattern for more info.
 *
 * @locale [String]
 *
 * Formats a date or number according to the given pattern string and the given locale (or the default locale if not specified).
 */
Globalize.formatDate = function( value, pattern, locale ) {
	if ( !( value instanceof Date ) ) {
		throw new Error( "Value is not date" );
	}

	if ( !pattern ) {
		throw new Error( "Missing pattern" );
	}

	locale = commonGetLocale( locale );
	pattern = dateExpandPattern( pattern, locale );
	return dateFormat( value, pattern, locale );
};

/**
 * Globalize.parseDate( value, patterns, locale )
 *
 * @value [String]
 *
 * @patterns [Array] Optional. See date/expand_pattern for more info about each pattern. Defaults to the list of all presets defined in the locale (see date/all_presets for more info).
 *
 * @locale [String]
 *
 * Return a Date instance or null.
 */
Globalize.parseDate = function( value, patterns, locale ) {
	var date;
	locale = commonGetLocale( locale );

	if ( typeof value !== "string" ) {
		throw new Error( "invalid value (" + value + "), string expected" );
	}

	if ( !patterns ) {
		patterns = dateAllPresets( locale );
	} else {
		patterns = alwaysArray( patterns );
	}

	arraySome( patterns, function( pattern ) {
		pattern = dateExpandPattern( pattern, locale );
		date = dateParse( value, pattern, locale );
		return !!date;
	});

	return date || null;
};

return Globalize;

});
