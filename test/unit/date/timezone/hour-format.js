define([
	"globalize/date/timezone/hour-format"
], function( hourFormat ) {

var BRT, FakeDate, HST, IST, UTC;

FakeDate = function( timezoneOffset ) {
	this.timezoneOffset = timezoneOffset;
};

FakeDate.prototype.getTimezoneOffset = function() {
	return this.timezoneOffset;
};

HST = new FakeDate( -600 );
IST = new FakeDate( -330 );
UTC = new FakeDate( 0 );
BRT = new FakeDate( 180 );

module( "Datetime Timezone Hour Format" );

test( "should format +H;-H", function() {
	equal( hourFormat( BRT, "+H;-H" ), "-3", "" );
	equal( hourFormat( UTC, "+H;-H" ), "+0", "" );
	equal( hourFormat( IST, "+H;-H" ), "+5", "" );
	equal( hourFormat( HST, "+H;-H" ), "+10", "" );
});

test( "should format +HHmm;-HHmm", function() {
	equal( hourFormat( BRT, "+HHmm;-HHmm" ), "-0300", "" );
	equal( hourFormat( UTC, "+HHmm;-HHmm" ), "+0000", "" );
	equal( hourFormat( IST, "+HHmm;-HHmm" ), "+0530", "" );
	equal( hourFormat( HST, "+HHmm;-HHmm" ), "+1000", "" );
});

test( "should format +HH:mm;-HH:mm", function() {
	equal( hourFormat( BRT, "+HH:mm;-HH:mm" ), "-03:00", "" );
	equal( hourFormat( UTC, "+HH:mm;-HH:mm" ), "+00:00", "" );
	equal( hourFormat( IST, "+HH:mm;-HH:mm" ), "+05:30", "" );
	equal( hourFormat( HST, "+HH:mm;-HH:mm" ), "+10:00", "" );
});

});
