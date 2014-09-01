define([
	"../validate"
], function( validate ) {

return function( value, name ) {
	validate( "E_MISSING_PARAMETER", "Missing required parameter `{name}`.",
		value !== undefined, { name: name });
};

});
