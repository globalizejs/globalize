define(function() {

/**
 * pluralRules( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return all the plural rules of a language.
 */
return function( cldr ) {
	return cldr.supplemental( "plurals-type-cardinal/{language}" );
};

});
