define([
	"cldr",
	"./common/runtime-bind",
	"./common/validate",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/date",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/parameter-type/string",
	"./core",
	"./date/expand-pattern",
	"./date/to-parts-formatter-fn",
	"./date/format-properties",
	"./date/parser-fn",
	"./date/parse-properties",
	"./date/tokenizer-properties",

	"cldr/event",
	"cldr/supplemental",
	"./number"
], function( Cldr, runtimeBind, validate, validateCldr, validateDefaultLocale,
	validateParameterPresence, validateParameterTypeDate, validateParameterTypePlainObject,
	validateParameterTypeString, Globalize, dateExpandPattern, dateToPartsFormatterFn,
	dateFormatProperties, dateParserFn, dateParseProperties, dateTokenizerProperties ) {

function validateRequiredCldr( path, value ) {
	validateCldr( path, value, {
		skip: [
			/dates\/calendars\/gregorian\/dateTimeFormats\/availableFormats/,
			/dates\/calendars\/gregorian\/days\/.*\/short/,
			/supplemental\/timeData\/(?!001)/,
			/supplemental\/weekData\/(?!001)/
		]
	});
}

function validateOptionsPreset( options ) {
	validateOptionsPresetEach( "date", options );
	validateOptionsPresetEach( "time", options );
	validateOptionsPresetEach( "datetime", options );
}

function validateOptionsPresetEach( type, options ) {
	var value = options[ type ];
	validate(
		"E_INVALID_OPTIONS",
		"Invalid `{{type}: \"{value}\"}`.",
		value === undefined || [ "short", "medium", "long", "full" ].indexOf( value ) !== -1,
		{ type: type, value: value }
	);
}

function validateOptionsSkeleton( pattern, skeleton ) {
	validate(
		"E_INVALID_OPTIONS",
		"Invalid `{skeleton: \"{value}\"}` based on provided CLDR.",
		skeleton === undefined || ( typeof pattern === "string" && pattern ),
		{ type: "skeleton", value: skeleton }
	);
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
	var formatterFn = this.dateToPartsFormatter( options );
	return function() {
		var parts = formatterFn.apply( this, arguments );
		return parts.map( function( part ) {
			return part.value;
		}).join( "" );
	};
};

/**
 * .dateToPartsFormatter( options )
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
 * Return a function that formats a date to parts according to the given `format`
 * and the default/instance
 * locale.
 */
Globalize.dateToPartsFormatter =
Globalize.prototype.dateToPartsFormatter = function( options ) {
	var args, cldr, numberFormatters, pad, pattern, properties, returnFn;

	validateParameterTypePlainObject( options, "options" );

	cldr = this.cldr;
	options = options || { skeleton: "yMd" };

	validateOptionsPreset( options );
	validateDefaultLocale( cldr );

	args = [ options ];

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( options, cldr );
	validateOptionsSkeleton( pattern, options.skeleton );
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

	returnFn = dateToPartsFormatterFn( numberFormatters, properties );

	runtimeBind( args, cldr, returnFn, [ numberFormatters, properties ] );

	return returnFn;
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
	var args, cldr, numberParser, parseProperties, pattern, tokenizerProperties, returnFn;

	validateParameterTypePlainObject( options, "options" );

	cldr = this.cldr;
	options = options || { skeleton: "yMd" };

	validateOptionsPreset( options );
	validateDefaultLocale( cldr );

	args = [ options ];

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( options, cldr );
	validateOptionsSkeleton( pattern, options.skeleton );
	tokenizerProperties = dateTokenizerProperties( pattern, cldr );
	parseProperties = dateParseProperties( cldr );
	cldr.off( "get", validateRequiredCldr );

	numberParser = this.numberParser({ raw: "0" });

	returnFn = dateParserFn( numberParser, parseProperties, tokenizerProperties );

	runtimeBind( args, cldr, returnFn, [ numberParser, parseProperties, tokenizerProperties ] );

	return returnFn;
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
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateFormatter( options )( value );
};

/**
 * .formatDateToParts( value, options )
 *
 * @value [Date]
 *
 * @options [Object] see date/expand_pattern for more info.
 *
 * Formats a date or number to parts according to the given options and the default/instance locale.
 */
Globalize.formatDateToParts =
Globalize.prototype.formatDateToParts = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateToPartsFormatter( options )( value );
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
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.dateParser( options )( value );
};

return Globalize;

});
