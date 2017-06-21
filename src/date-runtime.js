define([
	"./common/runtime-key",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/date",
	"./common/validate/parameter-type/string",
	"./core-runtime",
	"./date/format",
	"./date/formatter-fn",
	"./date/parse",
	"./date/parser-fn",
	"./date/tokenizer",
	"./date/to-parts-formatter-fn",

	"./number-runtime"
], function( runtimeKey, validateParameterPresence, validateParameterTypeDate,
	validateParameterTypeString, Globalize, dateFormat, dateFormatterFn, dateParse, dateParserFn,
	dateToPartsFormatterFn, dateTokenizer ) {

Globalize._dateFormat = dateFormat;
Globalize._dateFormatterFn = dateFormatterFn;
Globalize._dateParser = dateParse;
Globalize._dateParserFn = dateParserFn;
Globalize._dateTokenizer = dateTokenizer;
Globalize._dateToPartsFormatterFn = dateToPartsFormatterFn;
Globalize._validateParameterTypeDate = validateParameterTypeDate;

function optionsHasStyle( options ) {
	return options.skeleton !== undefined ||
		options.date !== undefined ||
		options.time !== undefined ||
		options.datetime !== undefined ||
		options.raw !== undefined;
}

Globalize.dateFormatter =
Globalize.prototype.dateFormatter = function( options ) {
	options = options || {};
	if ( !optionsHasStyle( options ) ) {
		options.skeleton = "yMd";
	}
	return Globalize[ runtimeKey( "dateFormatter", this._locale, [ options ] ) ];
};

Globalize.dateToPartsFormatter =
Globalize.prototype.dateToPartsFormatter = function( options ) {
	options = options || {};
	if ( !optionsHasStyle( options ) ) {
		options.skeleton = "yMd";
	}
	return Globalize[ runtimeKey( "dateToPartsFormatter", this._locale, [ options ] ) ];
};

Globalize.dateParser =
Globalize.prototype.dateParser = function( options ) {
	options = options || {};
	if ( !optionsHasStyle( options ) ) {
		options.skeleton = "yMd";
	}
	return Globalize[ runtimeKey( "dateParser", this._locale, [ options ] ) ];
};

Globalize.formatDate =
Globalize.prototype.formatDate = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateFormatter( options )( value );
};

Globalize.formatDateToParts =
Globalize.prototype.formatDateToParts = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateToPartsFormatter( options )( value );
};

Globalize.parseDate =
Globalize.prototype.parseDate = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.dateParser( options )( value );
};

return Globalize;

});
