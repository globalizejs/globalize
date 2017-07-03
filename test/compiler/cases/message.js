module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../external/cldr-data/supplemental/likelySubtags.json" ),
			// date
			require( "../../../external/cldr-data/main/en/ca-gregorian.json" ),
			require( "../../../external/cldr-data/main/en/timeZoneNames.json" ),
			require( "../../../external/cldr-data/supplemental/metaZones.json" ),
			require( "../../../external/cldr-data/supplemental/timeData.json" ),
			require( "../../../external/cldr-data/supplemental/weekData.json" ),
			// number
			require( "../../../external/cldr-data/main/en/numbers.json" ),
			require( "../../../external/cldr-data/supplemental/numberingSystems.json" ),
			// currency
			require( "../../../external/cldr-data/main/en/currencies.json" ),
			require( "../../../external/cldr-data/supplemental/currencyData.json" ),
			// plural
			require( "../../../external/cldr-data/supplemental/plurals.json" ),
			require( "../../../external/cldr-data/supplemental/ordinals.json" ),
			// relative time
			require( "../../../external/cldr-data/main/en/dateFields.json" ),
			// unit
			require( "../../../external/cldr-data/main/en/units.json" )
		);

		Globalize.loadMessages({
			en: {
				greetings: {
					hello: "Hello",
					helloArray: "Hello, {0}",
					helloArray2: "Hello, {0} and {1}",
					helloName: "Hello, {name}"
				},
				like: [
					"{count, plural, offset:1",
					"     =0 {Be the first to like this}",
					"     =1 {You liked this}",
					"    one {You and {someone} liked this}",
					"  other {You and # others liked this}",
					"}"
				],
				party: [
					"{hostGender, select,",
					"  female {{host} invites {guest} to her party}",
					"    male {{host} invites {guest} to his party}",
					"   other {{host} invites {guest} to their party}",
					"}"
				],
				task: [
					"You have {0, plural,",
					"    one {one task}",
					"  other {# tasks}",
					"} remaining"
				],
				ordinal: [
					"{cat, selectordinal, one{#st} two{#nd} few{#rd} other{#th} }",
					"category"
				],
				date: {
					date: "date: {x, date, long}",
					time: "time: {x, time, long}",
					datetime: "datetime: {x, datetime, long}",
					raw: "date raw: {x, date,  y-M-d HH:mm:ss zzzz  }",
					rawComma: "date raw comma: {x, date,  y-M-d, HH:mm:ss zzzz  }",
					skeleton: "date skeleton: {x, date, skeleton, GyMMMEdhms}",
					skeletonInvalid: "date skeleton: {x, date, skeleton}"
				},
				relativetime: {
					default: "relativetime: {x, relativetime, minute}",
					short: "relativetime short: {x, relativetime, minute, short}",
					narrow: "relativetime narrow: {x, relativetime, minute, narrow}"
				},
				number: {
					decimal: "number decimal: {x, number}",
					percent: "number percent: {x, number, percent}"
				},
				currency: {
					symbol: "currency symbol: {x, currency, USD}",
					accounting: "currency accounting: {x, currency, USD, accounting}",
					code: "currency code: {x, currency, USD, code}",
					name: "currency name: {x, currency, USD, name}"
				},
				unit: {
					long: "unit long: {x, unit, second, long}",
					short: "unit short: {x, unit, second, short}",
					narrow: "unit narrow: {x, unit, second, narrow}"
				}
			}
		});

		return Globalize;
	},
	cases: function( Globalize ) {
		var date = new Date( 2010, 8, 15, 17, 35, 7, 369 );

		Globalize.locale( "en" );
		return [
			{
				formatter: Globalize( "en" ).messageFormatter( "greetings/hello" ),
				args: []
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "greetings/helloArray" ),
				args: [ "Beethoven" ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "greetings/helloArray2" ),
				args: [ [ "Beethoven", "Mozart" ] ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "greetings/helloName" ),
				args: [ { name: "Beethoven" } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "task" ),
				args: [ 123 ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "party" ),
				args: [ {
					guest: "Mozart",
					host: "Beethoven",
					hostGender: "male"
				} ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "like" ),
				args: [ { count: 0 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "like" ),
				args: [ { count: 1 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "like" ),
				args: [ { count: 2, someone: "Beethoven" } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "like" ),
				args: [ { count: 3 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "ordinal" ),
				args: [ { cat: 1 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "ordinal" ),
				args: [ { cat: 2 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "ordinal" ),
				args: [ { cat: 3 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "ordinal" ),
				args: [ { cat: 4 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "date/date" ),
				args: [ { x: date } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "date/time" ),
				args: [ { x: date } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "date/datetime" ),
				args: [ { x: date } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "relativetime/default" ),
				args: [ { x: 2 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "relativetime/default" ),
				args: [ { x: -2 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "relativetime/short" ),
				args: [ { x: 2 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "relativetime/short" ),
				args: [ { x: -2 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "relativetime/narrow" ),
				args: [ { x: 2 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "relativetime/narrow" ),
				args: [ { x: -2 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "number/decimal" ),
				args: [ { x: 0.5 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "number/percent" ),
				args: [ { x: 0.5 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "currency/symbol" ),
				args: [ { x: 100 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "currency/accounting" ),
				args: [ { x: 100 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "currency/code" ),
				args: [ { x: 100 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "currency/name" ),
				args: [ { x: 100 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "unit/long" ),
				args: [ { x: 42 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "unit/short" ),
				args: [ { x: 42 } ]
			},
			{
				formatter: Globalize( "en" ).messageFormatter( "unit/narrow" ),
				args: [ { x: 42 } ]
			},
		];
	}
};
