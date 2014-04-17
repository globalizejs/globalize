define([
	"CLDRPluralRuleParser"
], function( CLDRPluralRuleParser ) {

/**
 * pluralForm( value, cldr )
 *
 * @value [Number]
 *
 * @cldr [Cldr instance].
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a
 * value given locale @cldr.
 */
return function( value, cldr ) {
	var form,
		rules = cldr.supplemental( "plurals-type-cardinal/{language}" );

	for ( form in rules ) {
		if ( CLDRPluralRuleParser( rules[ form ], value ) ) {
			return form.replace( /pluralRule-count-/, "" );
		}
	}

	return null;
};

});
