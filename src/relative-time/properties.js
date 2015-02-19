define(function() {

/**
 * properties( unit, cldr, options )
 *
 * @unit [String] eg. "day", "week", "month", etc.
 *
 * @cldr [Cldr instance].
 *
 * @options [Object]
 * - form: [String] eg. "short" or "narrow". Or falsy for default long form
 * - maximumWordOffset [Optional Number] The maximum offset when special offset words like
 *  yesterday and tomorrow will be looked for. Some languages provide several of these.
 *  default null -> use all available
 *  Set to 0 to not use any except today, now etc.
 *
 * Return relative time properties.
 */
return function( unit, cldr, options ) {

	var maximumWordOffset = options.maximumWordOffset,
		form = options.form,
		raw, properties, key, match;

	if ( form ) {
		unit = unit + "-" + form;
	}

	raw = cldr.main( [ "dates", "fields", unit ] );
	properties = {
		"relativeTime-type-future": raw[ "relativeTime-type-future" ],
		"relativeTime-type-past": raw[ "relativeTime-type-past" ]
	};
	for (key in raw) {
		if (raw.hasOwnProperty(key)) {
			match = /relative-type-(-?[0-9]+)/.exec(key);
			if ( match && (
				maximumWordOffset == null || // (null or undefined)
				maximumWordOffset >= Math.abs( parseInt( match[1], 10 ) )
				) ) {
				properties[key] = raw[key];
			}
		}
	}

	return properties;
};

});
