define([
	"src/number/format/grouping-separator"
], function( groupingSeparator ) {

QUnit.module( "Number Format Grouping Separator" );

QUnit.test( "should format primary grouping separator", function( assert ) {
	assert.equal( groupingSeparator( 1, 2 ), "1" );
	assert.equal( groupingSeparator( 11, 2 ), "11" );
	assert.equal( groupingSeparator( 111, 2 ), "1,11" );
	assert.equal( groupingSeparator( 1111, 2 ), "11,11" );
	assert.equal( groupingSeparator( 11111, 2 ), "1,11,11" );
	assert.equal( groupingSeparator( 1111111, 3 ), "1,111,111" );
	assert.equal( groupingSeparator( 1111111.1111, 3 ), "1,111,111.1111" );
});

QUnit.test( "should format primary and second grouping separator", function( assert ) {
	assert.equal( groupingSeparator( 111111, 3, 2 ), "1,11,111" );
	assert.equal( groupingSeparator( 1111111, 3, 2 ), "11,11,111" );
	assert.equal( groupingSeparator( 11111111, 3, 2 ), "1,11,11,111" );
	assert.equal( groupingSeparator( 11111111, 2, 1 ), "1,1,1,1,1,1,11" );
	assert.equal( groupingSeparator( 11111111.1111, 2, 1 ), "1,1,1,1,1,1,11.1111" );
});

});
