// Test suite helper methods
(function( window, undefined ) {
	var cultures = Globalize.cultures;

	window.lifecycle = {
		setup: function() {
			cultures = Globalize.cultures;
			Globalize.culture( "default" );
		},
		teardown: function() {
			Globalize.cultures = cultures;
		}
	};

	window.originalCultures = function( culture ) {
		return culture ? cultures[ culture ] : cultures;
	};

})( this );
