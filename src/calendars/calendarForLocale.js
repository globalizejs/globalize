define(function() {

/**
 * calendarForLocale( cldr )
 *
 * - http://www.unicode.org/reports/tr35/#Key_Type_Definitions

 * - http://www.unicode.org/reports/tr35/#u_Extension
 */
var definedCalendars = [ // http://www.unicode.org/repos/cldr/trunk/common/bcp47/calendar.xml
	// part of this data is available in cldr-data/supplemental/calendarData.json, but not all of it
	"buddhist",
	"chinese",
	"coptic",
	"dangi",
	"ethioaa",
	"ethiopic",
	"gregorian",
	"gregory",
	"hebrew",
	"indian",
	"islamic",
	"islamicc",
	"islamic-civil",
	"islamic-rgsa",
	"islamic-tbla",
	"islamic-umalqura",
	"iso8601",
	"japanese",
	"persian",
	"roc"
];

return function( cldr ) {
	var cal = cldr.attributes[ "u-ca" ];

	if ( cal && definedCalendars.indexOf( cal ) !== -1) {
		if ( cal === "gregory" ) {
			cal = "gregorian";
		}else if (cal === "islamicc") {
			cal = "islamic-civil";
		}
		return cal;
	}

	cal = cldr.get( [ "supplemental/calendarPreferenceData", cldr.attributes.region ] );
	// It might be worth passing in a list of available calendars and returning
	// the first one on both lists.
	// But for now, just return the most preferred
	if (cal) {
		return cal.split( " " )[0];
	}
	// Return the default calendar
	return "gregorian";
};

});
