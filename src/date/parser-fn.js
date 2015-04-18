define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/string",
	"./parse",
	"./tokenizer"
], function( validateParameterPresence, validateParameterTypeString, dateParse, dateTokenizer ) {

return function( numberParser, parseProperties, tokenizerProperties ) {
	return function dateParser( value ) {
		var tokens;

		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		tokens = dateTokenizer( value, numberParser, tokenizerProperties );
		return dateParse( value, tokens, parseProperties ) || null;
	};
};

});
