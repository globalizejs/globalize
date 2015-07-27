define( function() {

/**
 * monthNames( months, type, length, calendar, cldr )
 *
 * @months [Object]
 * Associative array of month indices to names. E.g. {"1": "January", "2": "February", etc.}
 * This may be null for numeric months (length <=2). In this case, if necessary, the array
 * will be synthesized.
 *
 * @type [String]
 * Either "M" for formatted month names or "L" for stand-alone month names
 *
 * @length [Number]
 * Size of the month field
 * ref: http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Format_Patterns
 *
 * @calendar [String]
 * Name of the calendar system (e.g. "Gregorian", "Islamic")
 *
 * @cldr [Cldr instance].
 *
 * Returns a modified months array to include leap months in a format that allows for easier parsing
 * and formatting, and works with GDate.
 *
 */
return function( months, type, length, calendar, cldr ) {
	var i, month, monthParts, monthPatterns, pattern;

	if ( months ) {
		// fastest (native) way to clone an object
		months = JSON.parse( JSON.stringify( months ) );
	}

	// change Chinese (and Hindu if it is ever implemented) leap months: look for monthPatterns
	monthPatterns = cldr.main([
		"dates/calendars",
		calendar,
		"monthPatterns",
		length < 3 ? "numeric" : type === "M" ? "format" : "stand-alone",
		[ null, "all", "all", "abbreviated", "wide", "narrow" ][ length ]
	]);

	if ( monthPatterns ) {
		// Only 12-month calendars use this type of formatting
		for ( i = 1; i <= 12; ++i ){
			// Predefine numeric months.
			if ( !months ){
					months[i] = "{0}";
			}
			for ( pattern in monthPatterns ){
				months[ i + "-" + pattern ] = monthPatterns[ pattern ].replace( "{0}", months[i] );
			}
		}
		// At this point, numeric leap months still have the "{0}" template notation.
		// The formatting code needs to use its number formatter to replace that.
	}

	if ( !months ) {
		return;
	}

	// change Hebrew leap months: 7-yeartype-leap to 7-leap
	for ( month in months ){
		monthParts = month.split( "-" );
		if ( monthParts[1] === "yeartype" ){
			months[ monthParts[0] + "-" + monthParts[2] ] = months[ month ];
			delete months[ month ];
		}
	}

	return months;
};

});
