define([
	"cldr",
	"../parameter-type"
], function( Cldr, validateParameterType ) {

return function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "string" || value instanceof Cldr,
		"String or Cldr instance"
	);
};

});
