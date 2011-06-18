/*!
 * Globalize Cultures @VERSION
 *
 * http://github.com/jquery/jquery-global
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */

(function( window, undefined ){

var Globalize;

if ( typeof require !== "undefined"
	|| typeof exports !== "undefined"
	|| typeof module !== "undefined" ) {
	// Assume CommonJS
	Globalize = require( "globalize" );
} else {
	// Access as global variable
	Globalize = window.Globalize;
}

Globalize.addCultureInfo("de", "default", {
	name: "de",
	englishName: "German",
	nativeName: "Deutsch",
	language: "de",
	numberFormat: {
	    ',': ".",
	    '.': ",",
	    percent: {
	        pattern: ["-n%","n%"],
	        ',': ".",
	        '.': ","
	    },
	    currency: {
	        pattern: ["-n $","n $"],
	        ',': ".",
	        '.': ",",
	        symbol: "€"
	    }
	},
	calendars: {
	    standard: {
	        '/': ".",
	        firstDay: 1,
	        days: {
	            names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
	            namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
	            namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
	        },
	        months: {
	            names: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
	            namesAbbr: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
	        },
	        AM: null,
	        PM: null,
	        eras: [{"name":"n. Chr.","start":null,"offset":0}],
	        patterns: {
	            d: "dd.MM.yyyy",
	            D: "dddd, d. MMMM yyyy",
	            t: "HH:mm",
	            T: "HH:mm:ss",
	            f: "dddd, d. MMMM yyyy HH:mm",
	            F: "dddd, d. MMMM yyyy HH:mm:ss",
	            M: "dd MMMM",
	            Y: "MMMM yyyy"
	        }
	    }
	}
});

Globalize.addCultureInfo("de-DE", "default", {
	name: "de-DE",
	englishName: "German (Germany)",
	nativeName: "Deutsch (Deutschland)",
	language: "de",
	numberFormat: {
	    ',': ".",
	    '.': ",",
	    percent: {
	        pattern: ["-n%","n%"],
	        ',': ".",
	        '.': ","
	    },
	    currency: {
	        pattern: ["-n $","n $"],
	        ',': ".",
	        '.': ",",
	        symbol: "€"
	    }
	},
	calendars: {
	    standard: {
	        '/': ".",
	        firstDay: 1,
	        days: {
	            names: ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
	            namesAbbr: ["So","Mo","Di","Mi","Do","Fr","Sa"],
	            namesShort: ["So","Mo","Di","Mi","Do","Fr","Sa"]
	        },
	        months: {
	            names: ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],
	            namesAbbr: ["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]
	        },
	        AM: null,
	        PM: null,
	        eras: [{"name":"n. Chr.","start":null,"offset":0}],
	        patterns: {
	            d: "dd.MM.yyyy",
	            D: "dddd, d. MMMM yyyy",
	            t: "HH:mm",
	            T: "HH:mm:ss",
	            f: "dddd, d. MMMM yyyy HH:mm",
	            F: "dddd, d. MMMM yyyy HH:mm:ss",
	            M: "dd MMMM",
	            Y: "MMMM yyyy"
	        }
	    }
	}
});

Globalize.addCultureInfo("fr", "default", {
	name: "fr",
	englishName: "French",
	nativeName: "français",
	language: "fr",
	numberFormat: {
	    ',': " ",
	    '.': ",",
	    percent: {
	        ',': " ",
	        '.': ","
	    },
	    currency: {
	        pattern: ["-n $","n $"],
	        ',': " ",
	        '.': ",",
	        symbol: "€"
	    }
	},
	calendars: {
	    standard: {
	        firstDay: 1,
	        days: {
	            names: ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"],
	            namesAbbr: ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."],
	            namesShort: ["di","lu","ma","me","je","ve","sa"]
	        },
	        months: {
	            names: ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre",""],
	            namesAbbr: ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc.",""]
	        },
	        AM: null,
	        PM: null,
	        eras: [{"name":"ap. J.-C.","start":null,"offset":0}],
	        patterns: {
	            d: "dd/MM/yyyy",
	            D: "dddd d MMMM yyyy",
	            t: "HH:mm",
	            T: "HH:mm:ss",
	            f: "dddd d MMMM yyyy HH:mm",
	            F: "dddd d MMMM yyyy HH:mm:ss",
	            M: "d MMMM",
	            Y: "MMMM yyyy"
	        }
	    }
	}
});

}( this ));
