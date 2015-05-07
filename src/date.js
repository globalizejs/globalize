define([
	"cldr",
	"./common/validate",
	"./core",
	"./date/expand-pattern",
	"./date/format",
	"./date/format-properties",
	"./date/parse",
	"./date/parse-properties",
	"./date/tokenizer",
	"./date/tokenizer-properties",

	"cldr/event",
	"cldr/supplemental",
	"./number"
], function( Cldr, validate, Globalize, dateExpandPattern, dateFormat, dateFormatProperties,
	dateParse, dateParseProperties, dateTokenizer, dateTokenizerProperties ) {

function validateRequiredCldr( path, value ) {
	validate.cldr( path, value, {
		skip: [
			/dates\/calendars\/gregorian\/dateTimeFormats\/availableFormats/,
			/dates\/calendars\/gregorian\/days\/.*\/short/,
			/supplemental\/timeData\/(?!001)/,
			/supplemental\/weekData\/(?!001)/
		]
	});
}

/**
 * .dateFormatter( options )
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Return a date formatter function (of the form below) according to the given options and the
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
Globalize.prototype.dateFormatter = function( options ) {
	var cldr, numberFormatters, pad, pattern, properties;

	validate.parameterTypePlainObject( options, "options" );

	cldr = this.cldr;
	options = options || { skeleton: "yMd" };

	validate.defaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( options, cldr );
	properties = dateFormatProperties( pattern, cldr );
	cldr.off( "get", validateRequiredCldr );

	// Create needed number formatters.
	numberFormatters = properties.numberFormatters;
	delete properties.numberFormatters;
	for ( pad in numberFormatters ) {
		numberFormatters[ pad ] = this.numberFormatter({
			raw: numberFormatters[ pad ]
		});
	}

	return function( value ) {
		validate.parameterPresence( value, "value" );
		validate.parameterTypeDate( value, "value" );
		return dateFormat( value, numberFormatters, properties );
	};
};

/**
 * .dateParser( options )
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Return a function that parses a string date according to the given `formats` and the
 * default/instance locale.
 */
Globalize.dateParser =
Globalize.prototype.dateParser = function( options ) {
	var cldr, numberParser, parseProperties, pattern, tokenizerProperties;

	validate.parameterTypePlainObject( options, "options" );

	cldr = this.cldr;
	options = options || { skeleton: "yMd" };

	validate.defaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( options, cldr );
	tokenizerProperties = dateTokenizerProperties( pattern, cldr );
	parseProperties = dateParseProperties( cldr );
	cldr.off( "get", validateRequiredCldr );

	numberParser = this.numberParser({ raw: "0" });

	return function( value ) {
		var tokens;

		validate.parameterPresence( value, "value" );
		validate.parameterTypeString( value, "value" );

		tokens = dateTokenizer( value, numberParser, tokenizerProperties );
		return dateParse( value, tokens, parseProperties ) || null;
	};
};

/**
 * .formatDate( value, options )
 *
 * @value [Date]
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Formats a date or number according to the given options string and the default/instance locale.
 */
Globalize.formatDate =
Globalize.prototype.formatDate = function( value, options ) {
	validate.parameterPresence( value, "value" );
	validate.parameterTypeDate( value, "value" );

	return this.dateFormatter( options )( value );
};

/**
 * .parseDate( value, options )
 *
 * @value [String]
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Return a Date instance or null.
 */
Globalize.parseDate =
Globalize.prototype.parseDate = function( value, options ) {
	validate.parameterPresence( value, "value" );
	validate.parameterTypeString( value, "value" );

	return this.dateParser( options )( value );
};

return Globalize;

});
