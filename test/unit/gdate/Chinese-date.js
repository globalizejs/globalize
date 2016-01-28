define([
	"src/gdate/Gdate",
	"src/gdate/Chinese-date",
], function( GDate ) {

var date, chinese, i, newyear;
date = new Date( 2017, 6, 24 ); // 2 month6bis, to test leap years
chinese = new GDate.calendars.chinese( date );
newyear = new GDate.calendars.chinese( new Date( 2015, 1, 19 ) );

QUnit.module( "Chinese GDate" );

QUnit.test( "Date created correctly", function( assert ) {
	assert.equal( chinese.toDate().getTime(), date.getTime() );
});

QUnit.test( "New Years correct", function( assert ) {
	assert.equal( newyear.getYear(), 32 );
	assert.equal( newyear.getMonth(), 1 );
	assert.equal( newyear.getDate(), 1 );
});

QUnit.test( "getEra correct", function( assert ) {
	assert.equal( chinese.getEra(), 78 );
});
QUnit.test( "getYear correct", function( assert ) {
	assert.equal( chinese.getYear(), 34 );
});
QUnit.test( "getMonth correct", function( assert ) {
	assert.equal( chinese.getMonth(), 6 );
});
QUnit.test( "getMonthType correct", function( assert ) {
	assert.equal( chinese.getMonthType(), "leap" );
});
QUnit.test( "getDate correct", function( assert ) {
	assert.equal( chinese.getDate(), 2 );
});

/* jshint loopfunc:true */
/* we need to tell jshint about the IIFE */
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextYear " + i, function( assert ) {
			assert.equal( chinese.nextYear(j).getYear(), 34 + j );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextMonth " + i, function( assert ) {
			var expected = 1 + ( j + 17 ) % 12, expectedType = ( j === 0 ? "leap" : undefined );
			if ( expected < 6 ){
				++expected; // this month is 6-leap, so last month is not 5 but 6-regular
			}
			assert.equal( chinese.nextMonth(j).getMonth(), expected );
			assert.equal( chinese.nextMonth(j).getMonthType(), expectedType );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextMonth in nonleap year " + i, function( assert ) {
			var expected = 1 + ( j + 17 ) % 12;
			assert.equal( chinese.nextYear().nextMonth(j).getMonth(), expected );
			assert.equal( chinese.nextYear().nextMonth(j).getMonthType(), undefined );
		});
	})(i);
}
for (i = -2; i < 3; ++i){
	(function (j){
		QUnit.test( "nextDate " + i, function( assert ) {
			assert.equal( chinese.nextDate(j).getDate(), 1 + ( j + 30 ) % 29 );
		});
	})(i);
}

QUnit.test( "startOfYear", function( assert ) {
	assert.equal( chinese.nextMonth(-1).startOfYear().getMonth(), 1 );
	assert.equal( chinese.nextMonth(-1).startOfYear().getYear(), 34 );
});
QUnit.test( "startOfMonth", function( assert ) {
	assert.equal( chinese.nextMonth().nextDate().startOfMonth().getMonth(), 7 );
});
});
