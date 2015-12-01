define([
	"./hebrew-rules-fn"
], function( numberHebrewRulesFn ) {
/**
 * NumberinSystemRules( fnName )
 *
 * Return function implementing number conversion algorithmic rule
 * Parameter:
 * fnName - algorithmic rule name for which conversion function is to be returned, like
 * ja/SpelloutRules/spellout-cardinal for Japan.
 * Re: https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/numberingSystems.json
 */
return function( fnName ) {
		switch ( fnName ) {
			case "hebrew":
				return numberHebrewRulesFn;
			default:
				return null;
		}
};
});
