define([
	"./regexp/cf-g",
	"./regexp/dash-g",
	"./regexp/zs-g"
], function( regexpCfG, regexpDashG, regexpZsG ) {

/**
 * Loose Matching:
 * - Ignore all format characters, which includes RLM, LRM or ALM used to control BIDI
 *   formatting.
 * - Map all characters in [:Zs:] to U+0020 SPACE;
 * - Map all characters in [:Dash:] to U+002D HYPHEN-MINUS;
 */
return function( value ) {
	return value
		.replace( regexpCfG, "" )
		.replace( regexpDashG, "-" )
		.replace( regexpZsG, " " );
};

});
