define([
	"../type",
	"../../../util/is-plain-object"
], function( validateType, isPlainObject ) {

return function( value, name ) {
	validateType( value, name, typeof value === "undefined" || typeof value === "string" || isPlainObject( value ), "String or plain Object" );
};

});
