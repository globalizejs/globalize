/**
 * Globalize Runtime v@VERSION
 *
 * https://github.com/globalizejs/globalize
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: @DATE
 */
/*!
 * Globalize Runtime v@VERSION @DATE Released under the MIT license
 * http://git.io/TrdQbw
 */
(function( root, factory ) {

	"use strict";

	// UMD returnExports
	if ( typeof define === "function" && define.amd ) {

		// AMD
		define([
			"../globalize-runtime",
			"./number"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory(
			require( "../globalize-runtime" ),
			require( "./number" )
		);
	} else {

		// Extend global
		factory( root.Globalize );
	}
}(this, function( Globalize ) {

"use strict";

var createErrorUnsupportedFeature = Globalize._createErrorUnsupportedFeature,
	looseMatching = Globalize._looseMatching,
	partsJoin = Globalize._partsJoin,
	partsPush = Globalize._partsPush,
	regexpEscape = Globalize._regexpEscape,
	removeLiteralQuotes = Globalize._removeLiteralQuotes,
	runtimeKey = Globalize._runtimeKey,
	stringPad = Globalize._stringPad,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterType = Globalize._validateParameterType,
	validateParameterTypeString = Globalize._validateParameterTypeString;
