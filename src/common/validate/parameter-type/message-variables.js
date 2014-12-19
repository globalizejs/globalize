define([
	"../parameter-type",
	"../../../util/is-plain-object"
], function( validateParameterType, isPlainObject ) {

return function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || isPlainObject( value ) || Array.isArray( value ),
		"Array or Plain Object"
	);
};

});
