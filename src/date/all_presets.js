define([
	"../util/array/map",
	"../util/object/values"
], function( arrayMap, objectValues ) {

/**
 * allPreset()
 *
 * @cldr [Cldr instance].
 *
 * Return an Array with all (skeleton, date, time, datetime) presets.
 */
return function( cldr ) {
	var result = [];

	// Skeleton
	result = objectValues( cldr.main( "dates/calendars/gregorian/dateTimeFormats/availableFormats" ) );

	// Time
	result = result.concat( objectValues( cldr.main( "dates/calendars/gregorian/timeFormats" ) ) );

	// Date
	result = result.concat( objectValues( cldr.main( "dates/calendars/gregorian/dateFormats" ) ) );

	// Datetime
	result = result.concat( arrayMap( objectValues( cldr.main( "dates/calendars/gregorian/dateTimeFormats" ) ), function( datetimeFormat, key ) {
		if ( typeof datetimeFormat !== "string" ) {
			return datetimeFormat;
		}
		return datetimeFormat
			.replace( /\{0\}/, cldr.main([
				"dates/calendars/gregorian/timeFormats",
				key
			]))
			.replace( /\{1\}/, cldr.main([
				"dates/calendars/gregorian/dateFormats",
				key
			]));
	}));

	return arrayMap( result, function( pattern ) {
		return { pattern: pattern };
	});
};

});
