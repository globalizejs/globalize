define([
	"./common/runtime-key",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./core-runtime",
	"./plural/generator-fn"
], function( runtimeKey, validateParameterPresence, validateParameterTypeNumber, Globalize,
	pluralGeneratorFn ) {

Globalize._pluralGeneratorFn = pluralGeneratorFn;
Globalize._validateParameterTypeNumber = validateParameterTypeNumber;

Globalize.plural =
Globalize.prototype.plural = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );
	return this.pluralGenerator( options )( value );
};

Globalize.pluralGenerator =
Globalize.prototype.pluralGenerator = function( options ) {
	options = options || {};
	return Globalize[ runtimeKey( "pluralGenerator", this._locale, [ options ] ) ];
};

return Globalize;

});
