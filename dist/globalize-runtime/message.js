/**
 * Globalize Runtime v1.7.0
 *
 * https://github.com/globalizejs/globalize
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-08-02T11:53Z
 */
/*!
 * Globalize Runtime v1.7.0 2021-08-02T11:53Z Released under the MIT license
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



var runtimeKey = Globalize._runtimeKey,
	validateParameterType = Globalize._validateParameterType;


/**
 * Function inspired by jQuery Core, but reduced to our use case.
 */
var isPlainObject = function( obj ) {
	return obj !== null && "" + obj === "[object Object]";
};




var validateParameterTypeMessageVariables = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || isPlainObject( value ) || Array.isArray( value ),
		"Array or Plain Object"
	);
};




var messageFormatterFn = function( formatter ) {
	return function messageFormatter( variables ) {
		if ( typeof variables === "number" || typeof variables === "string" ) {
			variables = [].slice.call( arguments, 0 );
		}
		validateParameterTypeMessageVariables( variables, "variables" );
		return formatter( variables );
	};
};




Globalize._messageFormatterFn = messageFormatterFn;
/* eslint-disable */
Globalize._messageFormat = (function() {
var number = function(value, offset) {
  if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
  return value - (offset || 0);
};
var plural = function(value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key]();
  return data.other();
};
var select = function(value, data) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  return data.other()
};

return {number: number, plural: plural, select: select};
}());
/* eslint-enable */
Globalize._validateParameterTypeMessageVariables = validateParameterTypeMessageVariables;

Globalize.messageFormatter =
Globalize.prototype.messageFormatter = function( /* path */ ) {
	return Globalize[
		runtimeKey( "messageFormatter", this._locale, [].slice.call( arguments, 0 ) )
	];
};

Globalize.formatMessage =
Globalize.prototype.formatMessage = function( path /* , variables */ ) {
	return this.messageFormatter( path ).apply( {}, [].slice.call( arguments, 1 ) );
};

return Globalize;




}));
