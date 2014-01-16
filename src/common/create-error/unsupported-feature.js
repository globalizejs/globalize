define([
	"../create-error"
], function( createError ) {

return function( feature ) {
	return createError( "E_UNSUPPORTED", "Unsupported {feature}.", {
		feature: feature
	});
};

});
