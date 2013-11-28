define(function() {

	return Array.isArray || function( obj ) {
		return Object.prototype.toString.call( obj ) === "[object Array]";
	};

});
