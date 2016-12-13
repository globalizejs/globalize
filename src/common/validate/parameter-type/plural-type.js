define([
	"../parameter-type"
], function( validateParameterType ) {

return function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || value === "cardinal" || value === "ordinal" || value === "both",
		"String \"cardinal\" or \"ordinal\" or \"both\""
	);
};

});
