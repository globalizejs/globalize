define([
	"globalize/number/format/grouping-separator"
], function( groupingSeparator ) {

module( "Number Format Grouping Separator" );

test( "should format primary grouping separator", function() {
	equal( groupingSeparator( 1, 2 ), "1", "" );
	equal( groupingSeparator( 11, 2 ), "11", "" );
	equal( groupingSeparator( 111, 2 ), "1,11", "" );
	equal( groupingSeparator( 1111, 2 ), "11,11", "" );
	equal( groupingSeparator( 11111, 2 ), "1,11,11", "" );
	equal( groupingSeparator( 1111111, 3 ), "1,111,111", "" );
	equal( groupingSeparator( 1111111.1111, 3 ), "1,111,111.1111", "" );
});

test( "should format primary and second grouping separator", function() {
	equal( groupingSeparator( 111111, 3, 2 ), "1,11,111", "" );
	equal( groupingSeparator( 1111111, 3, 2 ), "11,11,111", "" );
	equal( groupingSeparator( 11111111, 3, 2 ), "1,11,11,111", "" );
	equal( groupingSeparator( 11111111, 2, 1 ), "1,1,1,1,1,1,11", "" );
	equal( groupingSeparator( 11111111.1111, 2, 1 ), "1,1,1,1,1,1,11.1111", "" );
});

});
