(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["de-AT"] = $.extend(true, {}, invariant, {
        name: "de-AT",
        englishName: "German (Austria)",
        nativeName: "Deutsch (Österreich)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-$ n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],["So","Mo","Di","Mi","Do","Fr","Sa"],["So","Mo","Di","Mi","Do","Fr","Sa"]],
                months: [["Jänner","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember",""],["Jän","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez",""]],
                AM: null,
                PM: null,
                eras: [{"name":"n. Chr.","start":null,"offset":0}],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, dd. MMMM yyyy",
                    f: "dddd, dd. MMMM yyyy HH:mm",
                    F: "dddd, dd. MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);