define([
	"src/util/globalize-date",
	"json!iana-tz-data.json"
], function( GlobalizeDate, ianaTzData ) {

var zoneData = ianaTzData.zoneData;

QUnit.module( "Util GlobalizeDate" );

QUnit.assert.globalizeDate = function( actual, expected, expectedExtra ) {
	this.equal( actual.getFullYear(), expected[ 0 ] );
	this.equal( actual.getMonth(), expected[ 1 ] - 1 );
	this.equal( actual.getDate(), expected[ 2 ] );
	this.equal( actual.getHours(), expected[ 3 ] );
	this.equal( actual.getMinutes(), expected[ 4 ] );
	this.equal( actual.getSeconds(), expected[ 5 ] );
	this.equal( actual.isDST(), expectedExtra.isDST );
};

QUnit.test( "should correctly calculate trasitions and DST", function( assert ) {
	assert.globalizeDate(
		new GlobalizeDate( new Date( "2015-06-13T01:02:03Z" ), zoneData.America.Sao_Paulo ),
		[ 2015, 6, 12, 22, 2, 3 ],
		{ isDST: false }
	);

	// Testing standard time only case. Dubai has local time and then standard time, no daylight
	// savings as most of Asia countries/cities.
	assert.globalizeDate(
		new GlobalizeDate( new Date( "2015-06-13T01:02:03Z" ), zoneData.Asia.Dubai ),
		[ 2015, 6, 13, 5, 2, 3 ],
		{ isDST: false }
	);

	// Testing DST edge cases...
	// BRST (daylight savings)
	assert.globalizeDate(
		new GlobalizeDate( new Date( "2017-02-19T01:00:00Z" ), zoneData.America.Sao_Paulo ),
		[ 2017, 2, 18, 23, 0, 0 ],
		{ isDST: true }
	);

	// BRT
	assert.globalizeDate(
		new GlobalizeDate( new Date( "2017-02-19T02:00:00Z" ), zoneData.America.Sao_Paulo ),
		[ 2017, 2, 18, 23, 0, 0 ],
		{ isDST: false }
	);

	// PST
	assert.globalizeDate(
		new GlobalizeDate( new Date( "2017-03-12T09:00:00Z" ), zoneData.America.Los_Angeles ),
		[ 2017, 3, 12, 1, 0, 0 ],
		{ isDST: false }
	);

	// PDT (daylight savings)
	assert.globalizeDate(
		new GlobalizeDate( new Date( "2017-03-12T10:00:00Z" ), zoneData.America.Los_Angeles ),
		[ 2017, 3, 12, 3, 0, 0 ],
		{ isDST: true }
	);

	// ARST (it's an adhoc daylight savings using -03 offset)
	assert.globalizeDate(
		new GlobalizeDate( new Date( 938919600000 ), zoneData.America.Argentina.Buenos_Aires ),
		[ 1999, 10, 3, 0, 0, 0 ],
		{ isDST: true }
	);

	// ART
	assert.globalizeDate(
		new GlobalizeDate( new Date( 952052400000 ), zoneData.America.Argentina.Buenos_Aires ),
		[ 2000, 3, 3, 0, 0, 0 ],
		{ isDST: false }
	);

});

QUnit.test( "should set datetime according to timezone", function( assert ) {
	var date;

	// From a BRT time.
	date = new GlobalizeDate(new Date( "2017-03-15T17:00:00Z" ), zoneData.America.Sao_Paulo );
	
	// Set it to 1/1/2017 12:00 PM BRST
	date.setMonth( 0 );
	date.setDate( 1 );
	date.setFullYear( 2017 );
	date.setHours( 12 );
	date.setMinutes( 0 );
	date.setSeconds( 0 );
	date.setMilliseconds( 0 );

	assert.globalizeDate(
		date,
		[ 2017, 1, 1, 12, 0, 0 ],
		{ isDST: true }
	);

	// From a BRST time.
	date = new GlobalizeDate(new Date( "2017-03-15T17:00:00Z" ), zoneData.America.Sao_Paulo );
	
	// Set it to 3/1/2017 12:00 PM BRT
	date.setMonth( 2 );
	date.setDate( 1 );
	date.setFullYear( 2017 );
	date.setHours( 12 );
	date.setMinutes( 0 );
	date.setSeconds( 0 );
	date.setMilliseconds( 0 );

	assert.globalizeDate(
		date,
		[ 2017, 3, 1, 12, 0, 0 ],
		{ isDST: false }
	);

});

});
