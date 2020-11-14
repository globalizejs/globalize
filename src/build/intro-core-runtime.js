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
		define( factory );
	} else if ( typeof exports === "object" ) {

		// Node, CommonJS
		module.exports = factory();
	} else {

		// Globalize
		root.Globalize = factory();
	}
}( this, function() {

"use strict";
