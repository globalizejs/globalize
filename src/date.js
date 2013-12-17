define([
	"cldr",
	"./common/get-locale",
	"./core",
	"./date/all-presets",
	"./date/expand-pattern",
	"./date/format",
	"./date/parse",
	"./util/always-array",
	"./util/array/some"
], function( Cldr, commonGetLocale, Globalize, dateAllPresets, dateExpandPattern, dateFormat, dateParse, alwaysArray, arraySome ) {

/**
 * Globalize.format( value, pattern, locale )
 *
 * @value [Date or Number]
 *
 * @pattern [String or Object] see date/expand_pattern for more info.
 *
 * @locale [String]
 *
 * Formats a date or number according to the given pattern string and the given locale (or the default locale if not specified).
 */
Globalize.format = function( value, pattern, locale ) {
	locale = commonGetLocale( locale );

	if ( value instanceof Date ) {

		if ( !pattern ) {
			throw new Error( "Missing pattern" );
		}
		pattern = dateExpandPattern( pattern, locale );

		value = dateFormat( value, pattern, locale );

	} else if ( typeof value === "number" ) {
		// TODO value = numberFormat( value, pattern, locale );
		throw new Error( "Number Format not implemented yet" );
	}

	return value;
};

/**
 * Globalize.parseDate( value, patterns, locale )
 *
 * @value [Date]
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
