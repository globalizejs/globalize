define([
	"cldr",
	"./datetime/format"
], function( Cldr, datetimeFormat ) {

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
	 * @pattern [String] For more info see datetime/format.js
	 * @locale [String]
	 *
	 * Formats a date or number according to the given pattern string and the given locale (or the default locale if not specified).
	 */
	Globalize.format = function( value, pattern, locale ) {
		locale = getLocale( locale );

		if ( value instanceof Date ) {
			value = datetimeFormat( value, pattern, locale );
		} else if ( typeof value === "number" ) {
			// TODO value = numberFormat( value, pattern, locale );
			throw new Error( "Number Format not implemented yet" );
		}

		return value;
	};

	return Globalize;

});
