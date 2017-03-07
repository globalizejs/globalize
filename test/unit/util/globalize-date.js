define([
	"src/util/globalize-date",
	"json!iana-tz-data.json"
], function( GlobalizeDate, ianaTzData ) {

var zoneData = ianaTzData.zoneData;

QUnit.module( "Util GlobalizeDate" );

QUnit.assert.globalizeDate = function( actual, tzdata, expected, expectedExtra ) {
	var globalizeDate = new GlobalizeDate( actual, tzdata );
	this.equal( globalizeDate.getFullYear(), expected[ 0 ] );
	this.equal( globalizeDate.getMonth(), expected[ 1 ] - 1 );
	this.equal( globalizeDate.getDate(), expected[ 2 ] );
	this.equal( globalizeDate.getHours(), expected[ 3 ] );
	this.equal( globalizeDate.getMinutes(), expected[ 4 ] );
	this.equal( globalizeDate.getSeconds(), expected[ 5 ] );
	this.equal( globalizeDate.isDST(), expectedExtra.isDST );
};

QUnit.test( "should correctly calculate trasitions and DST", function( assert ) {
	assert.globalizeDate(
		new Date( "2015-06-13T01:02:03Z" ),
		zoneData.America.Sao_Paulo,
		[ 2015, 6, 12, 22, 2, 3 ],
		{ isDST: false }
	);

	// Testing standard time only case. Dubai has local time and then standard time, no daylight
	// savings as most of Asia countries/cities.
	assert.globalizeDate(
		new Date( "2015-06-13T01:02:03Z" ),
		zoneData.Asia.Dubai,
		[ 2015, 6, 13, 5, 2, 3 ],
		{ isDST: false }
	);

	// Testing DST edge cases...
	// BRST (daylight savings)
	assert.globalizeDate(
		new Date( "2017-02-19T01:00:00Z" ),
		zoneData.America.Sao_Paulo,
		[ 2017, 2, 18, 23, 0, 0 ],
		{ isDST: true }
	);

	// BRT
	assert.globalizeDate(
		new Date( "2017-02-19T02:00:00Z" ),
		zoneData.America.Sao_Paulo,
		[ 2017, 2, 18, 23, 0, 0 ],
		{ isDST: false }
	);

	// PST
	assert.globalizeDate(
		new Date( "2017-03-12T09:00:00Z" ),
		zoneData.America.Los_Angeles,
		[ 2017, 3, 12, 1, 0, 0 ],
		{ isDST: false }
	);

	// PDT (daylight savings)
	assert.globalizeDate(
		new Date( "2017-03-12T10:00:00Z" ),
		zoneData.America.Los_Angeles,
		[ 2017, 3, 12, 3, 0, 0 ],
		{ isDST: true }
	);

	// ARST (it's an adhoc daylight savings using -03 offset)
	assert.globalizeDate(
		new Date( 938919600000 ),
		zoneData.America.Argentina.Buenos_Aires,
		[ 1999, 10, 3, 0, 0, 0 ],
		{ isDST: true }
	);

	// ART
	assert.globalizeDate(
		new Date( 952052400000 ),
		zoneData.America.Argentina.Buenos_Aires,
		[ 2000, 3, 3, 0, 0, 0 ],
		{ isDST: false }
	);

});

});
