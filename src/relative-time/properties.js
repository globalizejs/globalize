define(function() {

/**
 * properties( unit, cldr, options )
 *
 * @unit [String] eg. "day", "week", "month", etc.
 *
 * @cldr [Cldr instance].
 *
 * @options [Object]
 * - form: [String] eg. "short" or "narrow".
 *
 * Return relative time properties.
 */
return function( /*unit, cldr, options*/ ) {

	// FIXME REMOVEME Impementation based on:
	// http://www.unicode.org/reports/tr35/tr35-dates.html#Calendar_Fields
	//
	// Feel free to create any helper function you judge necessary. They must all
	// live inside src/relative-time/. Ideally, each file must hold one single
  // function for easy unit testing.

	return {
		"relative-type--1": "last month",
		"relative-type-0": "this month",
		"relative-type-1": "next month",
		"relativeTime-type-future": {
			"relativeTimePattern-count-one": "in {0} month",
			"relativeTimePattern-count-other": "in {0} months"
		},
		"relativeTime-type-past": {
			"relativeTimePattern-count-one": "{0} month ago",
			"relativeTimePattern-count-other": "{0} months ago"
		}
	};
};

});
