define([
	"./categories"
], function( unitCategories ) {

function stripPluralGarbage( data ) {
	var aux, pluralCount;

	if ( data ) {
		aux = {};
		for ( pluralCount in data ) {
			aux[ pluralCount.replace( /unitPattern-count-/, "" ) ] = data[ pluralCount ];
		}
	}

	return aux;
}

/**
 * get( unit, form, cldr )
 *
 * @unit [String] The full type-unit name (eg. duration-second), or the short unit name (eg. second).
 *
 * FIXME
 *
 * Return the plural map of a unit, eg: "second"
 * { "one": "{0} second",
 *   "other": "{0} seconds" }
 * }
 *
 * Or the Array of plural maps of a compound-unit, eg: "foot-per-second"
 * [ { "one": "{0} foot",
 *     "other": "{0} feet" },
 *   { "one": "{0} second",
 *     "other": "{0} seconds" } ]
 *
 * Or undefined in case the unit (or a unit of the compound-unit) doesn't exist.
 */
var get = function( unit, form, cldr ) {
	var ret;

	// Get unit or <type>-unit (eg. "duration-second").
	[ "" ].concat( unitCategories ).some(function( category ) {
		return ret = cldr.main([
			"units",
			form,
			category.length ? category + "-" + unit : unit
		]);
	});

	// Rename keys s/unitPattern-count-//g.
	ret = stripPluralGarbage( ret );

	// Compound Unit, eg. "foot-per-second" or "foot/second".
	if ( !ret && (/-per-|\//).test( unit ) ) {

		// "Some units already have 'precomputed' forms, such as kilometer-per-hour;
		// where such units exist, they should be used in preference" UTS#35.
		// Note that precomputed form has already been handled above (!ret).

		// Get both recursively.
		unit = unit.split( /-per-|\// );
		ret = unit.map(function( unit ) {
			return get( unit, form, cldr );
		});
		if ( !ret[ 0 ] || !ret[ 1 ] ) {
			return;
		}
	}

	return ret;
};

return get;

});
