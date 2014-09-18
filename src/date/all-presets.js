define([
	"../common/format-message",
	"../util/object/values"
], function( formatMessage, objectValues ) {

/**
 * allPreset()
 *
 * @cldr [Cldr instance].
 *
 * Return an Array with all (skeleton, date, time, datetime) presets.
 */
return function( cldr ) {
	var datetimeFormats = cldr.main( "dates/calendars/gregorian/dateTimeFormats" ),
		result = [];

	// Skeleton
	result = objectValues(
		cldr.main( "dates/calendars/gregorian/dateTimeFormats/availableFormats")
	);

	// Time
	result = result.concat( objectValues( cldr.main( "dates/calendars/gregorian/timeFormats" ) ) );

	// Date
	result = result.concat( objectValues( cldr.main( "dates/calendars/gregorian/dateFormats" ) ) );

	// Datetime
	result = result.concat(
		Object.keys( datetimeFormats ).filter(function( key ) {
			return typeof datetimeFormats[ key ] === "string";
		}).map(function( key ) {
			return formatMessage( datetimeFormats[ key ], [
				cldr.main([
					"dates/calendars/gregorian/timeFormats",
					key
				]),
				cldr.main([
					"dates/calendars/gregorian/dateFormats",
					key
				])
			]);
		})
	);

	return result.map(function( pattern ) {
		return { pattern: pattern };
	});
};

});
