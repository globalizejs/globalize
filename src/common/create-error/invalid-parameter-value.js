define([
	"../create-error"
], function( createError ) {

return function( name, value ) {
	return createError( "E_INVALID_PAR_VALUE", "Invalid `{name}` value ({value}).", {
		name: name,
		value: value
	});
};

});
