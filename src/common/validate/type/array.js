define([
	"../type"
], function( validateType ) {

return function( value, name ) {
	validateType( value, name, typeof value === "undefined" || Array.isArray( value ), "Array" );
};

});
