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
 * - minWordOffset [Optional Number] The maximum offset when special offset words like
 *  yesterday and tomorrow will be looked for. Some languages provide several of these.
 *  default null -> use all available
 *  Set to 0 to not use any except today, now etc.
 *
 * Return relative time properties.
 */
return function( unit, cldr, options ) {

	options = options || {};

	var maxWordOffset = options.maxWordOffset,
		form = options.form,
		raw, rv, k, m;

	if ( form ) {
		unit = unit + "-" + form;
	}

	raw = cldr.main( [ "dates", "fields", unit ] );
	rv = {
		"relativeTime-type-future": raw[ "relativeTime-type-future" ],
		"relativeTime-type-past": raw[ "relativeTime-type-past" ]
	};
	for (k in raw) {
		if (raw.hasOwnProperty(k)) {
			m = /relative-type-(-?[0-9]+)/.exec(k);
			if (m && (
				maxWordOffset == null || // (null or undefined)
				maxWordOffset >= Math.abs(parseInt(m[1], 10))
				)) {
				rv[k] = raw[k];
			}
		}
	}

	return rv;
};

});
