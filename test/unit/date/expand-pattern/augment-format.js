define([
	"src/date/expand-pattern/augment-format"
], function( augmentFormat ) {

QUnit.module( "Date Expand Pattern Augment Format" );

QUnit.test( "should augment date skeletons", function( assert ) {
	assert.equal( augmentFormat( "yy", "y" ), "yy" );
	assert.equal( augmentFormat( "yMMdd", "M/d/y" ), "MM/dd/y" );

	assert.equal( augmentFormat( "MMMMd", "MMM d" ), "MMMM d" );
	assert.equal( augmentFormat( "MMMMd", "M d" ), "MMMM d" );
	assert.equal( augmentFormat( "MMMMd", "'M' M d" ), "'M' MMMM d" );

	assert.equal( augmentFormat( "LLLL", "LLL" ), "LLLL" );
	assert.equal( augmentFormat( "LLLLd", "MMM d" ), "MMMM d" );

	assert.equal( augmentFormat( "EEEE", "ccc" ), "cccc" );
	assert.equal( augmentFormat( "EEEEd", "d E" ), "d EEEE" );

	assert.equal( augmentFormat( "cccc", "ccc" ), "cccc" );
	assert.equal( augmentFormat( "ccccd", "d E" ), "d EEEE" );
});

QUnit.test( "should augment time skeletons", function( assert ) {
	assert.equal( augmentFormat( "hhmm", "h:mm a" ), "hh:mm a" );
});

QUnit.test( "should augment datetime skeletons", function( assert ) {
	assert.equal( augmentFormat( "EEEhhmmss", "E h:mm:ss a" ), "EEE hh:mm:ss a" );
});

});
