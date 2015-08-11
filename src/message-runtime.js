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

});
