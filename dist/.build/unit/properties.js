

/**
 * properties( unit, form, cldr )
 *
 * @unit [String] The full type-unit name (eg. duration-second), or the short unit name
 * (eg. second).
 *
 * @form [String] A string describing the form of the unit representation (eg. long,
 * short, narrow).
 *
 * @cldr [Cldr instance].
 */
var unitProperties = function( unit, form, cldr ) {
	var compoundUnitPattern, unitProperties;

	compoundUnitPattern = cldr.main( [ "units", form, "per/compoundUnitPattern" ] );
	unitProperties = unitGet( unit, form, cldr );

	return {
		compoundUnitPattern: compoundUnitPattern,
		unitProperties: unitProperties
	};
};

