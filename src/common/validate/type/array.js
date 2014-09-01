define([
	"../type"
], function( validateType ) {

return function( value, name ) {
	validateType( value, name, value === undefined || Array.isArray( value ), "Array" );
};

});
