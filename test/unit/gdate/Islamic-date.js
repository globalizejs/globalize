define([
	"src/gdate/Gdate",
	"src/gdate/Islamic-date",
], function( GDate ) {

var date, islamic, i;
date = new Date( 2015, 0, 1 ); // 10 Rabiʻ I 1436
islamic = new GDate.calendars.islamic( date );

QUnit.module( "Islamic GDate" );

QUnit.test( "Date created correctly", function( assert ) {
	assert.equal( islamic.toDate().getTime(), date.getTime() );
});

QUnit.test( "getEra correct", function( assert ) {
	assert.equal( islamic.getEra(), 0 );
});
QUnit.test( "getYear correct", function( assert ) {
	assert.equal( islamic.getYear(), 1436 );
});
QUnit.test( "getMonth correct", function( assert ) {
	assert.equal( islamic.getMonth(), 3 );
});
QUnit.test( "getDate correct", function( assert ) {
	assert.equal( islamic.getDate(), 10 );
});

/* jshint loopfunc:true */
/* we need to tell jshint about the IIFE */
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextYear " + i, function( assert ) {
			assert.equal( islamic.nextYear(j).getYear(), 1436 + j );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextMonth " + i, function( assert ) {
			var expected = 1 + ( j + 14 ) % 12;
			assert.equal( islamic.nextMonth(j).getMonth(), expected );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextDate " + i, function( assert ) {
			assert.equal( islamic.nextDate(j).getDate(), 1 + ( j + 39 ) % 30 );
		});
	})(i);
}

QUnit.test( "startOfYear", function( assert ) {
	assert.equal( islamic.nextMonth(-1).startOfYear().getMonth(), 1 );
	assert.equal( islamic.nextMonth(-1).startOfYear().getYear(), 1436 );
});
QUnit.test( "startOfMonth", function( assert ) {
	assert.equal( islamic.nextMonth().nextDate().startOfMonth().getMonth(), 4 );
	assert.equal( islamic.nextMonth().nextDate().startOfMonth().getDate(), 1 );
});
});
