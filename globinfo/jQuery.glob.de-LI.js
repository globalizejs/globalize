(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["de-LI"] = $.extend(true, {}, invariant, {
        name: "de-LI",
        englishName: "German (Liechtenstein)",
        nativeName: "Deutsch (Liechtenstein)",
        numberFormat: {
            ',': "\u0027",
            percent: {
                pattern: ["-n%","n%"],
                ',': "\u0027"
            },
            currency: {
                pattern: ["$-n","$ n"],
                ',': "\u0027",
                symbol: "CHF"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],["So","Mo","Di","Mi","Do","Fr","Sa"]],
                months: [["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],["Jan","Feb","Mrz","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]],
                AM: "",
                PM: "",
                eras: [{"name":"n. Chr.","start":null,"offset":0}],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, d. MMMM yyyy",
                    f: "dddd, d. MMMM yyyy HH:mm",
                    F: "dddd, d. MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);