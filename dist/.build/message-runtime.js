

Globalize._messageFormatterFn = messageFormatterFn;
/* jshint ignore:start */
Globalize._messageFormat = (function() {
var number = function (value, offset) {
  if (isNaN(value)) throw new Error("'" + value + "' isn't a number.");
  return value - (offset || 0);
};
var plural = function (value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key]();
  return data.other();
};
var select = function (value, data) {
  if ({}.hasOwnProperty.call(data, value)) return data[value]();
  return data.other()
};

return {number: number, plural: plural, select: select};
}());
/* jshint ignore:end */
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

