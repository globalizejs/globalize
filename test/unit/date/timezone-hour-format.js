define([
	"src/date/timezone-hour-format"
], function( hourFormat ) {

var BRT, FakeDate, HST, IST, UTC;

FakeDate = function( timezoneOffset ) {
	this.timezoneOffset = timezoneOffset;
};

function foo() {
	return "foo";
}

FakeDate.prototype.getTimezoneOffset = function() {
	return this.timezoneOffset;
};

HST = new FakeDate( -600 );
IST = new FakeDate( -330 );
UTC = new FakeDate( 0 );
BRT = new FakeDate( 180 );

QUnit.module( "Datetime Timezone Hour Format" );

QUnit.test( "should format +H;-H", function( assert ) {
	assert.equal( hourFormat( BRT, "+H;-H", ":" ), "-3", "" );
	assert.equal( hourFormat( UTC, "+H;-H", ":" ), "+0", "" );
	assert.equal( hourFormat( IST, "+H;-H", ":" ), "+5", "" );
	assert.equal( hourFormat( HST, "+H;-H", ":" ), "+10", "" );
	assert.equal( hourFormat( IST, "+H;-H", "،", { 1: foo } ), "+foo", "" );
});

QUnit.test( "should format +HHmm;-HHmm", function( assert ) {
	assert.equal( hourFormat( BRT, "+HHmm;-HHmm", ":" ), "-0300", "" );
	assert.equal( hourFormat( UTC, "+HHmm;-HHmm", ":" ), "+0000", "" );
	assert.equal( hourFormat( IST, "+HHmm;-HHmm", ":" ), "+0530", "" );
	assert.equal( hourFormat( HST, "+HHmm;-HHmm", ":" ), "+1000", "" );
	assert.equal( hourFormat( IST, "+HHmm;-HHmm", "،", { 2: foo } ), "+foofoo", "" );
});

QUnit.test( "should format +HH:mm;-HH:mm", function( assert ) {
	assert.equal( hourFormat( BRT, "+HH:mm;-HH:mm", ":" ), "-03:00", "" );
	assert.equal( hourFormat( UTC, "+HH:mm;-HH:mm", ":" ), "+00:00", "" );
	assert.equal( hourFormat( IST, "+HH:mm;-HH:mm", ":" ), "+05:30", "" );
	assert.equal( hourFormat( HST, "+HH:mm;-HH:mm", ":" ), "+10:00", "" );
	assert.equal( hourFormat( IST, "+HH:mm;-HH:mm", "،", { 2: foo } ), "+foo،foo", "" );
});

});
