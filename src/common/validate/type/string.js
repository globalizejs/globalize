define([
	"../type"
], function( validateType ) {

return function( value, name ) {
	validateType( value, name, value === undefined ||
		typeof value === "string", "a string" );
};

});
