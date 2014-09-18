define([
	"cldr",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/date",
	"./common/validate/parameter-type/date-pattern",
	"./common/validate/parameter-type/string",
	"./core",
	"./date/all-presets",
	"./date/expand-pattern",
	"./date/format",
	"./date/format-properties",
	"./date/parse",
	"./date/parse-properties",
	"./date/tokenizer",
	"./date/tokenizer-properties",
	"./util/always-array",
	"cldr/event",
	"cldr/supplemental"
], function( Cldr, validateCldr, validateDefaultLocale, validateParameterPresence,
	validateParameterTypeDataType, validateParameterTypeDate, validateParameterTypeDatePattern,
	validateParameterTypeString, Globalize, dateAllPresets, dateExpandPattern, dateFormat,
	dateFormatProperties, dateParse, dateParseProperties, dateTokenizer, dateTokenizerProperties,
	alwaysArray ) {

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
 * .dateFormatter( pattern )
 *
 * @pattern [String or Object] see date/expand_pattern for more info.
 *
 * Return a date formatter function (of the form below) according to the given pattern and the
 * default/instance locale.
 *
 * fn( value )
 *
 * @value [Date]
 *
 * Return a function that formats a date according to the given `format` and the default/instance
 * locale.
 */
Globalize.dateFormatter =
Globalize.prototype.dateFormatter = function( pattern ) {
	var cldr, properties;

	validateParameterPresence( pattern, "pattern" );
	validateParameterTypeDatePattern( pattern, "pattern" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( pattern, cldr );
	properties = dateFormatProperties( pattern, cldr );
	cldr.off( "get", validateRequiredCldr );

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeDate( value, "value" );
		return dateFormat( value, properties );
	};
};

/**
 * .dateParser( [patterns] )
 *
 * @patterns [Array] Optional. See date/expand_pattern for more info about each pattern. Defaults
 * to the list of all presets defined in the locale (see date/all_presets for more info).
 *
 * Return a function that parses a string date according to the given `formats` and the
 * default/instance locale.
 */
Globalize.dateParser =
Globalize.prototype.dateParser = function( patterns ) {
	var cldr, parseProperties,
		expandedPattern = {},
		tokenizerProperties = {};

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );

	if ( !patterns ) {
		patterns = dateAllPresets( cldr );
	} else {
		patterns = alwaysArray( patterns );
	}

	patterns.forEach(function( pattern ) {
		validateParameterTypeDatePattern( pattern, "patterns" );
		pattern = expandedPattern[ pattern ] = dateExpandPattern( pattern, cldr );
		tokenizerProperties[ pattern ] = dateTokenizerProperties( pattern, cldr );
	});

	parseProperties = dateParseProperties( cldr );

	cldr.off( "get", validateRequiredCldr );

	return function( value ) {
		var date, tokens;

		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		patterns.some(function( pattern ) {
			pattern = expandedPattern[ pattern ];
			tokens = dateTokenizer( value, pattern, null, tokenizerProperties[ pattern ] );
			date = dateParse( value, tokens, null, parseProperties );
			return !!date;
		});

		return date || null;
	};
};

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
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateFormatter( pattern )( value );
};

/**
 * .parseDate( value [, patterns] )
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
	var cldr, date, tokens;

	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );

	if ( !patterns ) {
		patterns = dateAllPresets( cldr );
	} else {
		patterns = alwaysArray( patterns );
	}

	patterns.some(function( pattern ) {
		validateParameterTypeDatePattern( pattern, "patterns" );
		pattern = dateExpandPattern( pattern, cldr );
		tokens = dateTokenizer( value, pattern, cldr );
		date = dateParse( value, tokens, cldr );
		return !!date;
	});

	cldr.off( "get", validateRequiredCldr );

	return date || null;
};

return Globalize;

});
