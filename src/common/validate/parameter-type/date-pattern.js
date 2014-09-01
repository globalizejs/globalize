define([
	"../parameter-type",
	"../../../util/is-plain-object"
], function( validateParameterType, isPlainObject ) {

return function( value, name ) {
	validateParameterType(
		value,
		name,
		value === undefined || typeof value === "string" || isPlainObject( value ),
		"String or plain Object"
	);
};

});
