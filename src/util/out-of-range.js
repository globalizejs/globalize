define(function() {

return function( value, low, high ) {
	return value < low || value > high;
};

});
