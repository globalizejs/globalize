define([
	"../parameter-type"
], function( validateParameterType ) {

return function( value, name ) {
	validateParameterType( value, name, value === undefined || Array.isArray( value ), "Array" );
};

});
