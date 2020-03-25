define([
	"./common/runtime-key",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./core-runtime",
	"./currency/formatter-fn",
	"./currency/name-format",
	"./currency/to-parts-formatter-fn",

	"./number-runtime"
], function( runtimeKey, validateParameterPresence, validateParameterTypeNumber, Globalize,
	currencyFormatterFn, currencyNameFormat, currencyToPartsFormatterFn ) {

Globalize._currencyFormatterFn = currencyFormatterFn;
Globalize._currencyNameFormat = currencyNameFormat;
Globalize._currencyToPartsFormatterFn = currencyToPartsFormatterFn;

Globalize.currencyFormatter =
Globalize.prototype.currencyFormatter = function( currency, options ) {
	options = options || {};
	return Globalize[ runtimeKey( "currencyFormatter", this._locale, [ currency, options ] ) ];
};

Globalize.currencyToPartsFormatter =
Globalize.prototype.currencyToPartsFormatter = function( currency, options ) {
	options = options || {};
	return Globalize[
		runtimeKey( "currencyToPartsFormatter", this._locale, [ currency, options ] )
	];
};

Globalize.formatCurrency =
Globalize.prototype.formatCurrency = function( value, currency, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.currencyFormatter( currency, options )( value );
};

Globalize.formatCurrencyToParts =
Globalize.prototype.formatCurrencyToParts = function( value, currency, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.currencyToPartsFormatter( currency, options )( value );
};

return Globalize;

});
