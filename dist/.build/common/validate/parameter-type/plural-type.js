

var validateParameterTypePluralType = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || value === "cardinal" || value === "ordinal",
		"String \"cardinal\" or \"ordinal\""
	);
};

