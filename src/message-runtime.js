define([
	"./common/runtime-key",
	"./common/validate/parameter-type/message-variables",
	"./core-runtime",
	"./message/formatter-fn"
], function( runtimeKey, validateParameterTypeMessageVariables, Globalize, messageFormatterFn ) {

Globalize._messageFormatterFn = messageFormatterFn;
Globalize._messageFormat = {};
Globalize._validateParameterTypeMessageVariables = validateParameterTypeMessageVariables;

Globalize.messageFormatter =
Globalize.prototype.messageFormatter = function( path, options ) {
	options = options || {};
	return Globalize[
		runtimeKey( "messageFormatter", this._locale, [ path, options ] )
	];
};

Globalize.formatMessage =
Globalize.prototype.formatMessage = function( path, variables, options ) {
	return this.messageFormatter( path, options ).apply( {}, [ variables ] );
};

return Globalize;

});
