

var validateParameterType = function( value, name, check, expected ) {
	validate(
		"E_INVALID_PAR_TYPE",
		"Invalid `{name}` parameter ({value}). {expected} expected.",
		check,
		{
			expected: expected,
			name: name,
			value: value
		}
	);
};

