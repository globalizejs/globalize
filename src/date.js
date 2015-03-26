define([
	"cldr",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/date",
	"./common/validate/parameter-type/date-pattern",
	"./common/validate/parameter-type/string",
	"./common/validate/parameter-type/number",
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
], function( Cldr, validateCldr, validateDefaultLocale, validateParameterPresence,
	validateParameterTypeDataType, validateParameterTypeDate, validateParameterTypeDatePattern,
	validateParameterTypeString, validateParameterTypeNumber, Globalize, dateExpandPattern,
	dateFormat, dateFormatProperties, dateParse, dateParseProperties, dateTokenizer,
	dateTokenizerProperties ) {

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
	var cldr, formatNumber, pad, properties;

	validateParameterPresence( pattern, "pattern" );
	validateParameterTypeDatePattern( pattern, "pattern" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( pattern, cldr );
	properties = dateFormatProperties( pattern, cldr );
	cldr.off( "get", validateRequiredCldr );

	// Create needed number formatters.
	formatNumber = properties.formatNumber;
	for ( pad in formatNumber ) {
		formatNumber[ pad ] = this.numberFormatter({
			pattern: formatNumber[ pad ]
		});
	}
	properties.formatNumber = formatNumber;

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeDate( value, "value" );
		return dateFormat( value, properties );
	};
};

/**
 * .dateParser( pattern )
 *
 * @pattern [String or Object] see date/expand_pattern for more info.
 *
 * Return a function that parses a string date according to the given `formats` and the
 * default/instance locale.
 */
Globalize.dateParser =
Globalize.prototype.dateParser = function( pattern ) {
	var cldr, parseProperties, tokenizerProperties;

	validateParameterPresence( pattern, "pattern" );
	validateParameterTypeDatePattern( pattern, "pattern" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateRequiredCldr );
	pattern = dateExpandPattern( pattern, cldr );
	tokenizerProperties = dateTokenizerProperties( pattern, cldr );
	parseProperties = dateParseProperties( cldr );
	cldr.off( "get", validateRequiredCldr );

	tokenizerProperties.parseNumber = this.numberParser({ pattern: "0" });

	return function( value ) {
		var tokens;

		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		tokens = dateTokenizer( value, tokenizerProperties );
		return dateParse( value, tokens, parseProperties ) || null;
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
 * .parseDate( value, pattern )
 *
 * @value [String]
 *
 * @pattern [String or Object] see date/expand_pattern for more info.
 *
 * Return a Date instance or null.
 */
Globalize.parseDate =
Globalize.prototype.parseDate = function( value, pattern ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.dateParser( pattern )( value );
};

/**
 * .getDay( day [, format] )
 *
 * Get the localised string for a day of the week.
 *
 * @value [String] a day key (mon, tue, etc.)
 *
 * @format [Optional String] a format for the day of the week wide, short or narrow
 *  defaults to narrow
 */
Globalize.getDay =
Globalize.prototype.getDay = function(day, format) {
	var rv,
		cldr = this.cldr;

	validateParameterPresence(day, "day");
	validateParameterTypeString(day, "day");
	validateParameterTypeString(format, "format");

	if (format === undefined) {
		format = "wide";
	}

	cldr.on( "get", validateRequiredCldr );
	rv = cldr.main([ "dates/calendars/gregorian/days/stand-alone", format, day ]);
	cldr.off( "get", validateRequiredCldr );

	return rv;
};

function relativeCountKey(count) {
	if (count === 1) {
		return "relativeTimePattern-count-one";
	} else {
		// TODO: should we look up correct pluralisms i.e. support more than one and other
		return "relativeTimePattern-count-other";
	}
}

/**
 * .formatRelativeCount(type, count)
 *
 * @type [String] The type of time (day, week, month, quarter, year)
 *  can optionally have -short or -narrow appended.
 *
 * @count [Number] The amount of time, negative for in the past;
 *  positive for in the future.
 *
 * @minWordOffset [Optional Number] The maximum offset when special offset words like
 *  yesterday and tomorrow will be looked for. Some languages proivide serveral of these.
 *  default 2
 */
Globalize.formatRelativeCount =
Globalize.prototype.formatRelativeCount = function(type, count, maxWordOffset) {
	var fmt, cldr, lookup;

	validateParameterPresence(type, "type");
	validateParameterTypeString(type, "type");
	validateParameterPresence(count, "count");
	validateParameterTypeNumber(count, "count");
	validateParameterTypeNumber(maxWordOffset, "maxWordOffset");

	if (maxWordOffset === undefined) {
		maxWordOffset = 3;
	}
	lookup = [ "dates", "fields", type ];
	cldr = this.cldr;

	if (Math.abs(count) <= maxWordOffset) {
		fmt = cldr.main(lookup.concat([ "relative-type-" + count ]));
		if (fmt !== undefined) {
			return fmt;
		}
	}

	if (count < 0) {
		count =  Math.abs(count);
		lookup.push("relativeTime-type-past");
	} else if (count > 0) {
		lookup.push("relativeTime-type-future");
	}
	lookup.push(relativeCountKey(count));

	cldr.on( "get", validateRequiredCldr );
	fmt = cldr.main(lookup);
	cldr.off( "get", validateRequiredCldr );
	return Globalize._cldrFormat(fmt, count);
};

return Globalize;

});
