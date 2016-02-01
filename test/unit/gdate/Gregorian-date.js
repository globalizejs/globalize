define([
	"src/gdate/Gdate",
	"src/gdate/Gregorian-date"
], function( Gdate ) {

var date, gregorian, i;
date = new Date( 2015, 0, 1 );
gregorian = new Gdate.calendars.gregorian( date );

QUnit.module( "Gregorian GDate" );

QUnit.test( "Date created correctly", function( assert ) {
	assert.equal( gregorian.toDate().getTime(), date.getTime() );
});

QUnit.test( "Default parameters", function( assert) {
	var ctor = Gdate.calendars.gregorian;
	assert.equal( new ctor( null, 2014 ).getMonth(), 1 );
	assert.equal( new ctor( null, 2014, 1 ).getDate(), 1 );
	assert.equal( new ctor( null, null, 1 ).getYear(), new Date().getFullYear() );
});

QUnit.test( "getEra correct", function( assert ) {
	assert.equal( gregorian.getEra(), 1 );
});
QUnit.test( "getYear correct", function( assert ) {
	assert.equal( gregorian.getYear(), 2015 );
});
QUnit.test( "getMonth correct", function( assert ) {
	assert.equal( gregorian.getMonth(), 1 );
});
QUnit.test( "getDate correct", function( assert ) {
	assert.equal( gregorian.getDate(), 1 );
});

/* jshint loopfunc:true */
/* we need to tell jshint about the IIFE */
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextYear " + i, function( assert ) {
			assert.equal( gregorian.nextYear(j).getYear(), 2015 + j );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextMonth " + i, function( assert ) {
			assert.equal( gregorian.nextMonth(j).getMonth(), 1 + ( j + 12 ) % 12 );
			assert.equal( gregorian.nextMonth(j).getDate(), 1 );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextDate " + i, function( assert ) {
			assert.equal( gregorian.nextDate(j).getDate(), 1 + ( j + 31 ) % 31 );
		});
	})(i);
}

QUnit.test( "startOfYear", function( assert ) {
	assert.equal( gregorian.nextMonth(-1).startOfYear().getMonth(), 1 );
	assert.equal( gregorian.nextMonth(-1).startOfYear().getYear(), 2014 );
});
QUnit.test( "startOfMonth", function( assert ) {
	assert.equal( gregorian.nextMonth().nextDate().startOfMonth().getMonth(), 2 );
});

});
