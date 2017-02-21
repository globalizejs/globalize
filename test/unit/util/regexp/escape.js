define([
	"src/util/regexp/escape",
], function( regexpEscape ) {

QUnit.module( "Util regexp escape" );

QUnit.test( "it shouldn't escape not-reserved characters", function( assert ) {
	assert.equal( regexpEscape( "foo" ), "foo" );
});

QUnit.test( "it should escape reserved characters", function( assert ) {
	assert.equal(
		regexpEscape( ".*+?^=!:${}()|\[\]\/\\" ),
		"\\.\\*\\+\\?\\^\\=\\!\\:\\$\\{\\}\\(\\)\\|\\[\\]\\/\\\\"
	);
});

});
