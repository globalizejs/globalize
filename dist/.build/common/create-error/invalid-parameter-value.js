

var createErrorInvalidParameterValue = function( name, value ) {
	return createError( "E_INVALID_PAR_VALUE", "Invalid `{name}` value ({value}).", {
		name: name,
		value: value
	});
};

