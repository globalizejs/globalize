define([
	"./categories",
	"../util/array/some"
], function( unitCategories, arraySome ) {

/**
 * get(...)
 *
 * Return the unit...
 */
return function( unit, form, value, cldr, globalize ) {
	var pluralCount, ret;

	// Get unit or <type>-unit (eg. duration-second).
	arraySome( [ "" ].concat( unitCategories ), function( category ) {
		return ret = cldr.main([
			"units",
			form,
			category.length ? category + "-" + unit : unit
		]);
	});

	// Rename ret keys s/unitPattern-count-//g.
	for ( pluralCount in ret ) {
		ret[ pluralCount.replace( /unitPattern-count-/, "" ) ] = ret[ pluralCount ];
	}

	return globalize.formatPlural( value, ret );
};

});
