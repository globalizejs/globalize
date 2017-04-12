/**
 * Globalize Runtime v@VERSION
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
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
			"../globalize-runtime"
		], factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory( require( "../globalize-runtime" ) );
	} else {

		// Extend global
		factory( root.Globalize );
	}
}(this, function( Globalize ) {

"use strict";

var createError = Globalize._createError,
	regexpEscape = Globalize._regexpEscape,
	runtimeKey = Globalize._runtimeKey,
	stringPad = Globalize._stringPad,
	validateParameterType = Globalize._validateParameterType,
	validateParameterPresence = Globalize._validateParameterPresence,
	validateParameterTypeString = Globalize._validateParameterTypeString;
