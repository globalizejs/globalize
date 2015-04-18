define([
	"../create-error"
], function( createError ) {

return function() {
	return createError( "E_MISSING_PLURAL_MODULE", "Plural module not loaded." );
};

});
