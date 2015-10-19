define([
	"src/gdate/Gdate",
	"src/gdate/Hebrew-date",
], function( GDate ) {

var date, hebrew, i;
date = new Date( 2016, 1, 11 ); // 2 Adar I 5776, to test leap years
hebrew = new GDate.calendars.hebrew( date );

QUnit.module( "Hebrew GDate" );

QUnit.test( "Date created correctly", function( assert ) {
	assert.equal( hebrew.toDate().getTime(), date.getTime() );
});

QUnit.test( "getEra correct", function( assert ) {
	assert.equal( hebrew.getEra(), 0 );
});
QUnit.test( "getYear correct", function( assert ) {
	assert.equal( hebrew.getYear(), 5776 );
});
QUnit.test( "getMonth correct", function( assert ) {
	assert.equal( hebrew.getMonth(), 6 );
});
QUnit.test( "getDate correct", function( assert ) {
	assert.equal( hebrew.getDate(), 2 );
});

/* jshint loopfunc:true */
/* we need to tell jshint about the IIFE */
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextYear " + i, function( assert ) {
			assert.equal( hebrew.nextYear(j).getYear(), 5776 + j );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextMonth " + i, function( assert ) {
			var expected = 1 + ( j + 17 ) % 12, expectedType = ( expected === 7 ? "leap" : undefined );
			assert.equal( hebrew.nextMonth(j).getMonth(), expected );
			assert.equal( hebrew.nextMonth(j).getMonthType(), expectedType );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextMonth in nonleap year " + i, function( assert ) {
			var expected = 1 + ( j + 17 ) % 12;
			if (expected >= 6 ) {
				++expected;
			}
			assert.equal( hebrew.nextYear().nextMonth(j).getMonth(), expected );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextDate " + i, function( assert ) {
			assert.equal( hebrew.nextDate(j).getDate(), 1 + ( j + 31 ) % 30 );
		});
	})(i);
}

QUnit.test( "startOfYear", function( assert ) {
	assert.equal( hebrew.nextMonth(-1).startOfYear().getMonth(), 1 );
	assert.equal( hebrew.nextMonth(-1).startOfYear().getYear(), 5776 );
});
QUnit.test( "startOfMonth", function( assert ) {
	assert.equal( hebrew.nextMonth().nextDate().startOfMonth().getMonth(), 7 );
});
});
