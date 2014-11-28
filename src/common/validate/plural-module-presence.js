define([
	"../validate",
	"../../core"
], function( validate, Globalize ) {

return function() {
	validate( "E_MISSING_PLURAL_MODULE", "Plural module not loaded.",
		Globalize.plural !== undefined, {} );
};

});
