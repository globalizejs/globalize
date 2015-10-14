define([
	"src/gdate/Gdate",
	"src/gdate/astronomy"
], function( Gdate) {
	function equalDate( assert, date1, date2 ){
		assert.ok( 
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate()
		);
	}

	function closeNumber ( assert, n1, n2 ){
		assert.ok( Math.abs( ( n1 - n2 ) / n1 ) < 0.0001 );
	}

	function realDate ( year, month, date ){
		var ret = new Date();
		ret.setUTCFullYear( year );
		ret.setUTCMonth ( month );
		ret.setUTCDate ( date );
		ret.setUTCHours ( 0 );
		ret.setUTCMinutes ( 0 );
		ret.setUTCSeconds ( 0 );
		return ret;
	}

	var date = realDate ( 2015, 1, 1 ),
		newMoon1_2015 = realDate ( 2015, 0, 20 ),
		newMoon2_2015 = realDate ( 2015, 1, 18 ),
		winterSolstice2015 = realDate ( 2015, 11, 22 ),
		winterSolstice2014 = realDate ( 2014, 11, 21 );
		winterSolstice1970 = realDate ( 1970, 11, 22 );

	QUnit.module( "Gdate astronomy package" );
	QUnit.test( "equalDate works", function( assert ) {
		equalDate( assert, date, date );
	});

	QUnit.test( "date2jd", function( assert ) {
		closeNumber( assert, Gdate.date2jd( date ), 2457054.5);
	});

	QUnit.test( "jd2date", function( assert ) {
		equalDate( assert, Gdate.jd2date( 2457054.5 ), date );
	});

	QUnit.test( "winterSolstice", function (assert) {
		equalDate( assert, new Date( Gdate.winterSolstice( date.getTime(), true ) ), winterSolstice2015 );
		equalDate( assert, new Date( Gdate.winterSolstice( date.getTime(), false ) ), winterSolstice2014 );
		// check for convergence if starting on the solstice
		equalDate( assert, new Date( Gdate.winterSolstice( winterSolstice2014.getTime(), true ) ), winterSolstice2014 );
		equalDate( assert, new Date( Gdate.winterSolstice( winterSolstice1970.getTime(), true ) ), winterSolstice1970 );
	});

	QUnit.test( "newMoon", function (assert) {
		equalDate( assert, new Date( Gdate.newMoon( date.getTime(), true ) ), newMoon2_2015 );
		equalDate( assert, new Date( Gdate.newMoon( date.getTime(), false ) ), newMoon1_2015 );
	});
});