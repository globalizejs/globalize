define([
	"../type"
], function( validateType ) {

return function( value, name ) {
	validateType( value, name, typeof value === "undefined" || typeof value === "string" || typeof value === "number", "String or Number" );
};

});
