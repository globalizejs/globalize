define([
	"./common/runtime-key",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./core-runtime",
	"./relative-time/formatter-fn",

	"./number-runtime",
	"./plural-runtime"
], function( runtimeKey, validateParameterPresence, validateParameterTypeNumber, Globalize,
	relativeTimeFormatterFn ) {

Globalize._relativeTimeFormatterFn = relativeTimeFormatterFn;

Globalize.formatRelativeTime =
Globalize.prototype.formatRelativeTime = function( value, unit, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.relativeTimeFormatter( unit, options )( value );
};

Globalize.relativeTimeFormatter =
Globalize.prototype.relativeTimeFormatter = function( unit, options ) {
	options = options || {};
	return Globalize[ runtimeKey( "relativeTimeFormatter", this._locale, [ unit, options ] ) ];
};

return Globalize;

});
