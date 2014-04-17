define([
	"CLDRPluralRuleParser",
	"./rules"
], function( CLDRPluralRuleParser, pluralRules ) {

/**
 * pluralForm( value, cldr )
 *
 * @value [Number]
 *
 * @cldr [Cldr instance].
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a value given locale @cldr.
 */
return function( value, cldr ) {
	var form,
		rules = pluralRules( cldr );

	for( form in rules ) {
		if( CLDRPluralRuleParser( rules[ form ], value ) ) {
			return form.replace( /pluralRule-count-/, "" );
		}
	}

	return null;
};

});
