define([
	"../type",
	"../../../util/array/is-array"
], function( validateType, arrayIsArray ) {

return function( value, name ) {
	validateType( value, name, typeof value === "undefined" || arrayIsArray( value ), "Array" );
};

});
