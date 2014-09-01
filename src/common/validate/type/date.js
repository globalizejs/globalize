define([
	"../type"
], function( validateType ) {

return function( value, name ) {
	validateType( value, name, value === undefined || value instanceof Date, "Date" );
};

});
