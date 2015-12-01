define([
	"./numbering-system",
	"../common/create-error/unsupported-feature",
	"./numbering-system-rules-fn"
], function( numberNumberingSystem, createErrorUnsupportedFeature,
				numberNumberingSystemRulesFn ) {

/**
 * nuMap( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return digits map if numbering system is different than `latn`.
 */
return function( cldr ) {
	var aux,
		nu = numberNumberingSystem( cldr );

	if ( nu === "latn" ) {
		return;
	}

	aux = cldr.supplemental([ "numberingSystems", nu ]);

	if ( aux._type !== "numeric" ) {
		if ( aux._type === "algorithmic" ) {
			return numberNumberingSystemRulesFn( aux._rules );
		} else {
			throw createErrorUnsupportedFeature( "`" + aux._type + "` numbering system" );
		}
	}

	return aux._digits;
};

});
