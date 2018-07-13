define([
	"./common/runtime-key",
	"./common/create-error/unsupported-feature",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/string",
	"./core-runtime",
	"./number/format",
	"./number/formatter-fn",
	"./number/parse",
	"./number/parser-fn",
	"./util/loose-matching",
	"./util/number/round",
	"./util/remove-literal-quotes"
], function( runtimeKey, createErrorUnsupportedFeature, validateParameterPresence,
	validateParameterTypeNumber, validateParameterTypeString, Globalize, numberFormat,
	numberFormatterFn, numberParse, numberParserFn, looseMatching, numberRound,
	removeLiteralQuotes ) {

Globalize._createErrorUnsupportedFeature = createErrorUnsupportedFeature;
Globalize._looseMatching = looseMatching;
Globalize._numberFormat = numberFormat;
Globalize._numberFormatterFn = numberFormatterFn;
Globalize._numberParse = numberParse;
Globalize._numberParserFn = numberParserFn;
Globalize._numberRound = numberRound;
Globalize._removeLiteralQuotes = removeLiteralQuotes;
Globalize._validateParameterPresence = validateParameterPresence;
Globalize._validateParameterTypeNumber = validateParameterTypeNumber;
Globalize._validateParameterTypeString = validateParameterTypeString;

// Stamp runtimeKey and return cached fn.
// Note, this function isn't made common to all formatters and parsers, because in practice this is
// only used (at the moment) for numberFormatter used by unitFormatter.
// TODO: Move this function into a common place when this is used by different formatters.
function cached( runtimeKey ) {
	Globalize[ runtimeKey ].runtimeKey = runtimeKey;
	return Globalize[ runtimeKey ];
}

Globalize.numberFormatter =
Globalize.prototype.numberFormatter = function( options ) {
	options = options || {};
	return cached( runtimeKey( "numberFormatter", this._locale, [ options ] ) );
};

Globalize.numberParser =
Globalize.prototype.numberParser = function( options ) {
	options = options || {};
	return Globalize[ runtimeKey( "numberParser", this._locale, [ options ] ) ];
};

Globalize.formatNumber =
Globalize.prototype.formatNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.numberFormatter( options )( value );
};

Globalize.parseNumber =
Globalize.prototype.parseNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.numberParser( options )( value );
};

return Globalize;

});
