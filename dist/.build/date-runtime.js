

Globalize._dateFormatterFn = dateFormatterFn;
Globalize._dateParserFn = dateParserFn;
Globalize._dateFormat = dateFormat;
Globalize._dateParser = dateParse;
Globalize._dateTokenizer = dateTokenizer;
Globalize._validateParameterTypeDate = validateParameterTypeDate;

Globalize.dateFormatter =
Globalize.prototype.dateFormatter = function( options ) {
	options = options || { skeleton: "yMd" };
	return Globalize[ runtimeKey( "dateFormatter", this._locale, [ options ] ) ];
};

Globalize.dateParser =
Globalize.prototype.dateParser = function( options ) {
	options = options || { skeleton: "yMd" };
	return Globalize[ runtimeKey( "dateParser", this._locale, [ options ] ) ];
};

Globalize.formatDate =
Globalize.prototype.formatDate = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeDate( value, "value" );

	return this.dateFormatter( options )( value );
};

Globalize.parseDate =
Globalize.prototype.parseDate = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.dateParser( options )( value );
};

return Globalize;

