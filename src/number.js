define([
	"./core",
	"./common/create-error/unsupported-feature",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-range",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/parameter-type/string",
	"./number/format",
	"./number/format-properties",
	"./number/numbering-system",
	"./number/parse",
	"./number/parse-properties",
	"./number/pattern",
	"./number/symbol",
	"./util/string/pad",

	"cldr/event",
	"cldr/supplemental"
], function( Globalize, createErrorUnsupportedFeature, validateCldr, validateDefaultLocale,
	validateParameterPresence, validateParameterRange, validateParameterTypeNumber,
	validateParameterTypePlainObject, validateParameterTypeString, numberFormat,
	numberFormatProperties, numberNumberingSystem, numberParse, numberParseProperties,
	numberPattern, numberSymbol, stringPad ) {

/**
 * .numberFormatter( [options] )
 *
 * @options [Object]:
 * - style: [String] "decimal" (default) or "percent".
 * - see also number/format options.
 *
 * Return a function that formats a number according to the given options and default/instance
 * locale.
 */
Globalize.numberFormatter =
Globalize.prototype.numberFormatter = function( options ) {
	var cldr, maximumFractionDigits, maximumSignificantDigits, minimumFractionDigits,
		minimumIntegerDigits, minimumSignificantDigits, pattern, properties;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	if ( options.pattern ) {
		pattern = options.pattern;
	} else {
		pattern = numberPattern( options.style || "decimal", cldr );
	}

	properties = numberFormatProperties( pattern, cldr, options );

	cldr.off( "get", validateCldr );

	minimumIntegerDigits = properties[ 2 ];
	minimumFractionDigits = properties[ 3 ];
	maximumFractionDigits = properties[ 4 ];

	minimumSignificantDigits = properties[ 5 ];
	maximumSignificantDigits = properties[ 6 ];

	// Validate significant digit format properties
	if ( !isNaN( minimumSignificantDigits * maximumSignificantDigits ) ) {
		validateParameterRange( minimumSignificantDigits, "minimumSignificantDigits", 1, 21 );
		validateParameterRange( maximumSignificantDigits, "maximumSignificantDigits",
			minimumSignificantDigits, 21 );

	} else if ( !isNaN( minimumSignificantDigits ) || !isNaN( maximumSignificantDigits ) ) {
		throw new Error( "Neither or both the minimum and maximum significant digits must be " +
			"present" );

	// Validate integer and fractional format
	} else {
		validateParameterRange( minimumIntegerDigits, "minimumIntegerDigits", 1, 21 );
		validateParameterRange( minimumFractionDigits, "minimumFractionDigits", 0, 20 );
		validateParameterRange( maximumFractionDigits, "maximumFractionDigits",
			minimumFractionDigits, 20 );
	}

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );
		return numberFormat( value, properties );
	};
};

/**
 * .numberParser( [options] )
 *
 * @options [Object]:
 * - style: [String] "decimal" (default) or "percent".
 *
 * Return the number parser according to the default/instance locale.
 */
Globalize.numberParser =
Globalize.prototype.numberParser = function( options ) {
	var cldr, pattern, properties;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	if ( options.pattern ) {
		pattern = options.pattern;
	} else {
		pattern = numberPattern( options.style || "decimal", cldr );
	}

	properties = numberParseProperties( pattern, cldr );

	cldr.off( "get", validateCldr );

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );
		return numberParse( value, properties );
	};
};

/**
 * .formatNumber( value [, options] )
 *
 * @value [Number] number to be formatted.
 *
 * @options [Object]: see number/format-properties.
 *
 * Format a number according to the given options and default/instance locale.
 */
Globalize.formatNumber =
Globalize.prototype.formatNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.numberFormatter( options )( value );
};

/**
 * .parseNumber( value [, options] )
 *
 * @value [String]
 *
 * @options [Object]: See numberParser().
 *
 * Return the parsed Number (including Infinity) or NaN when value is invalid.
 */
Globalize.parseNumber =
Globalize.prototype.parseNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.numberParser( options )( value );
};

/**
 * Optimization to avoid duplicating some internal functions across modules.
 */
Globalize._createErrorUnsupportedFeature = createErrorUnsupportedFeature;
Globalize._numberNumberingSystem = numberNumberingSystem;
Globalize._numberPattern = numberPattern;
Globalize._numberSymbol = numberSymbol;
Globalize._stringPad = stringPad;
Globalize._validateParameterTypeNumber = validateParameterTypeNumber;
Globalize._validateParameterTypeString = validateParameterTypeString;

return Globalize;

});
