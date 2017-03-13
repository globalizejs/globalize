define([
	"src/date/expand-pattern/compare-formats"
], function( compareFormats ) {

QUnit.module( "Date Expand Pattern Compare Formats" );

// "Most symbols have a small distance from each other, e.g., M ≅ L; E ≅ c; a ≅ b ≅ B;
//  H ≅ k ≅ h ≅ K; ..."
QUnit.test( "should add a small distance on similar patterns", function( assert ) {
	assert.ok( compareFormats( "MM", "LL" ) > compareFormats( "MM", "MM" ) );
	assert.ok( compareFormats( "MM", "LLL" ) > compareFormats( "MM", "MMM" ) );
	assert.ok( compareFormats( "E", "c" ) > compareFormats( "E", "E" ) );
});

// Numeric (l<3) and text fields (l>=3) are given a larger distance from each other.
QUnit.test( "should add a larger distance comparing numeric vs text fields", function( assert ) {
	assert.ok( compareFormats( "MM", "MMM" ) > compareFormats( "MM", "M" ) );
	assert.ok( compareFormats( "MMM", "MM" ) > compareFormats( "MMM", "MMMMM" ) );
});

QUnit.test( "should mark not equal things", function( assert ) {
	assert.equal( compareFormats( "yMd", "d" ), -1 );
	assert.equal( compareFormats( "MM", "d" ), -1 );
	assert.equal( compareFormats( "yMMd", "MMM" ), -1 );
});

});
