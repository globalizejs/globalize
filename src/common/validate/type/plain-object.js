define([
	"../type",
	"../../../util/is-plain-object"
], function( validateType, isPlainObject ) {

return function( value, name ) {
	validateType( value, name, value === undefined ||
		isPlainObject( value ), "Plain Object" );
};

});
