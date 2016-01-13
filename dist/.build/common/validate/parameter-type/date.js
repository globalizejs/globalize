

var validateParameterTypeDate = function( value, name ) {
	validateParameterType( value, name, value === undefined || value instanceof Date, "Date" );
};

