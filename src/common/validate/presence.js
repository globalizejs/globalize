define([
	"../validate"
], function( validate ) {

return function( value, name ) {
	validate( "E_MISSING_PARAMETER", "Missing required parameter `{name}`.",
		typeof value !== "undefined", { name: name });
};

});
