

var createErrorUnsupportedFeature = function( feature ) {
	return createError( "E_UNSUPPORTED", "Unsupported {feature}.", {
		feature: feature
	});
};

