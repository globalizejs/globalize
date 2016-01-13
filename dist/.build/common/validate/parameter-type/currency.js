

var validateParameterTypeCurrency = function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "string" && ( /^[A-Za-z]{3}$/ ).test( value ),
		"3-letter currency code string as defined by ISO 4217"
	);
};

