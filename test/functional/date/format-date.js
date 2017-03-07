define([
	"globalize",
	"json!cldr-data/main/ar/ca-gregorian.json",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/ar/timeZoneNames.json",
	"json!cldr-data/main/en/ca-gregorian.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en/timeZoneNames.json",
	"json!cldr-data/main/pt/ca-gregorian.json",
	"json!cldr-data/main/pt/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/metaZones.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/timeData.json",
	"json!cldr-data/supplemental/weekData.json",
	"json!iana-tz-data.json",
	"../../util",

	"globalize/date"
], function( Globalize, arCaGregorian, arNumbers, arTimeZoneNames, enCaGregorian, enNumbers,
	enTimeZoneNames, ptCaGregorian, ptNumbers, likelySubtags, metaZones, numberingSystems, timeData,
	weekData, ianaTimezoneData, util ) {

var ar,
	date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

function extraSetup() {
	Globalize.load(
		arCaGregorian,
		arNumbers,
		arTimeZoneNames,
		enCaGregorian,
		enNumbers,
		enTimeZoneNames,
		metaZones,
		numberingSystems,
		ptCaGregorian,
		ptNumbers,
		timeData,
		weekData
	);
	Globalize.loadIANATimezone( ianaTimezoneData );
}

QUnit.module( ".formatDate( value, options )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatDate();
	});

	util.assertDateParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatDate( invalidValue, "GyMMMEd" );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidPattern ) {
		return function() {
			Globalize.formatDate( date, invalidPattern );
		};
	});

	assert.throws(function() {
		Globalize.formatDate(date, { date: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*date.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.formatDate(date, { time: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*time.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.formatDate(date, { datetime: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*datetime.*invalid-stuff/ );

	assert.throws(function() {
		Globalize.formatDate(date, { skeleton: "invalid-stuff" });
	}, /E_INVALID_OPTIONS.*skeleton.*invalid-stuff/ );
});

QUnit.test( "should validate CLDR content", function( assert ) {
	Globalize.load({
		"main": {
			"en": {
				"dates": {
					"calendars": {
						"gregorian": {
							"dateTimeFormats": {
								"availableFormats": {
									"MMMd": "MMM d"
								}
							}
						}
					}
				}
			}
		}
	});
	util.assertCldrContent( assert, function() {
		Globalize.formatDate( date, { skeleton: "MMMd" });
	});
});

QUnit.test( "should format skeleton", function( assert ) {
	extraSetup();

	ar = Globalize( "ar" );

	assert.equal( Globalize.formatDate( date, { skeleton: "d" } ), "15" );
	assert.equal( Globalize.formatDate( date, { skeleton: "Ed" } ), "15 Wed" );
	assert.equal( Globalize.formatDate( date, { skeleton: "Ehms" } ), "Wed 5:35:07 PM" );
	assert.equal( Globalize.formatDate( date, { skeleton: "GyMMMEd" } ), "Wed, Sep 15, 2010 AD" );
	assert.equal( Globalize.formatDate( date, { skeleton: "yMd" } ), "9/15/2010" );
	assert.equal( Globalize.formatDate( date, { skeleton: "yQQQ" } ), "Q3 2010" );
	assert.equal( ar.formatDate( date, { skeleton: "yQQQ" } ), "الربع الثالث ٢٠١٠" );

	// Via instance .formatDate().
	assert.equal( Globalize( "pt" ).formatDate( date, { skeleton: "Ehms" } ), "qua, 5:35:07 PM" );
	assert.equal( Globalize( "pt" ).formatDate( date, { skeleton: "GyMMMEd" } ), "qua, 15 de set de 2010 d.C." );
});

QUnit.test( "should format time presets", function( assert ) {
	extraSetup();

	ar = Globalize( "ar" );

	assert.equal( Globalize.formatDate( date, { time: "medium" } ), "5:35:07 PM" );
	assert.equal( ar.formatDate( date, { time: "medium" } ), "٥:٣٥:٠٧ م" );

	assert.equal( Globalize.formatDate( date, { time: "short" } ), "5:35 PM" );
	assert.equal( ar.formatDate( date, { time: "short" } ), "٥:٣٥ م" );
});

QUnit.test( "should format date presets", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { date: "full" } ), "Wednesday, September 15, 2010" );
	assert.equal( Globalize.formatDate( date, { date: "long" } ), "September 15, 2010" );
	assert.equal( Globalize.formatDate( date, { date: "medium" } ), "Sep 15, 2010" );
	assert.equal( Globalize.formatDate( date, { date: "short" } ), "9/15/10" );
});

QUnit.test( "should format datetime presets", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { datetime: "medium" } ), "Sep 15, 2010, 5:35:07 PM" );
});

QUnit.test( "should format raw patterns", function( assert ) {
	extraSetup();

	assert.equal( Globalize.formatDate( date, { raw: "E, MMM d, y G" } ), "Wed, Sep 15, 2010 AD" );
});

QUnit.test( "should format date in various timezones", function( assert ) {
	var date = new Date( "2010-09-15T16:35:07.000Z" );
	extraSetup();

	assert.equal(
		Globalize.formatDate( date, { datetime: "long", timeZone: "Etc/UTC" } ),
		"September 15, 2010 at 4:35:07 PM GMT"
	);
	assert.equal(
		Globalize.formatDate( date, { datetime: "long", timeZone: "Europe/Berlin" } ),
		"September 15, 2010 at 6:35:07 PM GMT+2"
	);
	assert.equal(
		Globalize.formatDate( date, { datetime: "long", timeZone: "America/Sao_Paulo" } ),
		"September 15, 2010 at 1:35:07 PM GMT-3"
	);
	assert.equal(
		Globalize.formatDate( date, { datetime: "long", timeZone: "America/Los_Angeles" } ),
		"September 15, 2010 at 9:35:07 AM PDT"
	);
});

});
