module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../node_modules/cldr-data/supplemental/likelySubtags.json" ),
			// date
			require( "../../../node_modules/cldr-data/main/en/ca-gregorian.json" ),
			require( "../../../node_modules/cldr-data/main/en/timeZoneNames.json" ),
			require( "../../../node_modules/cldr-data/supplemental/metaZones.json" ),
			require( "../../../node_modules/cldr-data/supplemental/timeData.json" ),
			require( "../../../node_modules/cldr-data/supplemental/weekData.json" ),
			// number
			require( "../../../node_modules/cldr-data/main/en/numbers.json" ),
			require( "../../../node_modules/cldr-data/supplemental/numberingSystems.json" )
		);

		Globalize.loadTimeZone( require( "iana-tz-data" ) );

		return Globalize;
	},
	cases: function( Globalize ) {
		var date = new Date( 2010, 8, 15, 17, 35, 7, 369 );
		Globalize.locale( "en" );
		return [
			{ formatter: Globalize.dateFormatter({ datetime: "full", timeZone: "Europe/Berlin" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ datetime: "full", timeZone: "America/Los_Angeles" }), args: [ date ] },

			{ formatter: Globalize.dateFormatter({ skeleton: "GyMMMEd" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "dhms" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "GyMMMEdhms" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "GyMMMEdhmsSSS" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "Ems" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "yQQQhm" }), args: [ date ] },

			{ formatter: Globalize.dateFormatter({ skeleton: "yMMMMd" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "MMMMd" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "MMMM" }), args: [ date ] },
			{ formatter: Globalize.dateFormatter({ skeleton: "EEEE" }), args: [ date ] }
		];
	}
};
