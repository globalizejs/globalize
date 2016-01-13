

var validateParameterTypeMessageVariables = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || isPlainObject( value ) || Array.isArray( value ),
		"Array or Plain Object"
	);
};

