

var validateParameterTypeString = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "string",
		"a string"
	);
};

