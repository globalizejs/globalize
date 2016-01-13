

var validateParameterTypeArray = function( value, name ) {
	validateParameterType( value, name, value === undefined || Array.isArray( value ), "Array" );
};

