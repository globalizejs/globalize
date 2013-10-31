define([
	"cldr",
	"./datetime/all_presets",
	"./datetime/expand_pattern",
	"./datetime/format",
	"./datetime/parse",
	"./util/always_array",
	"./util/array/some"
], function( Cldr, datetimeAllPresets, datetimeExpandPattern, datetimeFormat, datetimeParse, alwaysArray, arraySome ) {

	var defaultLocale;

	function getLocale( locale ) {
		return locale ? new Cldr( locale ) : defaultLocale;
	}

	var Globalize = {};

	/**
	 * Globalize.load( json )
	 *
	 * @json [JSON]
	 *
	 * Load resolved or unresolved cldr data.
	 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
	 */
	Globalize.load = function( json ) {
		Cldr.load( json );
	};

	/**
	 * Globalize.locale( locale )
	 *
	 * @locale [String]
	 *
	 * Set default locale.
	 * Somewhat equivalent to previous culture( selector ).
	 */
	Globalize.locale = function( locale ) {
		defaultLocale = new Cldr( locale );
	};

	/**
	 * Globalize.format( value, pattern, locale )
	 *
	 * @value [Date or Number]
	 *
	 * @pattern [String or Object] see datetime/expand_pattern for more info.
	 *
	 * @locale [String]
	 *
	 * Formats a date or number according to the given pattern string and the given locale (or the default locale if not specified).
	 */
	Globalize.format = function( value, pattern, locale ) {
		locale = getLocale( locale );

		if ( value instanceof Date ) {

			if ( !pattern ) {
				throw new Error( "Missing pattern" );
			}
			pattern = datetimeExpandPattern( pattern, locale );

			value = datetimeFormat( value, pattern, locale );

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
	 * @patterns [Array] Optional. See datetime/expand_pattern for more info about each pattern. Defaults to the list of all presets defined in the locale (see datetime/all_presets for more info).
	 *
	 * @locale [String]
	 *
	 * Return a Date instance or null.
	 */
	Globalize.parseDate = function( value, patterns, locale ) {
		var date;
		locale = getLocale( locale );

		if ( typeof value !== "string" ) {
			throw new Error( "invalid value (" + value + "), string expected" );
		}

		if ( !patterns ) {
			patterns = datetimeAllPresets( locale );
		} else {
			patterns = alwaysArray( patterns );
		}

		arraySome( patterns, function( pattern ) {
			pattern = datetimeExpandPattern( pattern, locale );
			date = datetimeParse( value, pattern, locale );
			return !!date;
		});

		return date || null;
	};

	return Globalize;

});
