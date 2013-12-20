define(function() {

/**
 * NumberingSystem( cldr )
 *
 * TODO support ( native | traditional | finance ).
 */
return function( cldr ) {
	return cldr.main( "numbers/defaultNumberingSystem" );
};

});
