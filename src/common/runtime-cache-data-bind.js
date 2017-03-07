define(function() {

return function( key, data ) {
	var fn = function() {
		return data;
	};
	fn.dataCacheKey = key;
	return fn;
};

});

