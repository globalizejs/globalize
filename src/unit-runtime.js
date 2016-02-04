define([
	"./common/runtime-key",
	"./core-runtime",
	"./unit/formatter-fn",

	"./number-runtime",
	"./plural-runtime"
], function( runtimeKey, Globalize, unitFormatterFn ) {

Globalize._unitFormatterFn = unitFormatterFn;

Globalize.formatUnit =
Globalize.prototype.formatUnit = function( value, unit, options ) {
	return this.unitFormatter( unit, options )( value );
};

Globalize.unitFormatter =
Globalize.prototype.unitFormatter = function( unit, options ) {
	options = options || {};
	return Globalize[ runtimeKey( "unitFormatter", this._locale, [ unit, options ] ) ];
};

return Globalize;

});
