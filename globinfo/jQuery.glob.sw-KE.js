(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["sw-KE"] = $.extend(true, {}, invariant, {
        name: "sw-KE",
        englishName: "Kiswahili (Kenya)",
        nativeName: "Kiswahili (Kenya)",
        language: "sw",
        numberFormat: {
            currency: {
                symbol: "S"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: {
                    names: ["Jumapili","Jumatatu","Jumanne","Jumatano","Alhamisi","Ijumaa","Jumamosi"],
                    namesAbbr: ["Jumap.","Jumat.","Juman.","Jumat.","Alh.","Iju.","Jumam."],
                    namesShort: ["P","T","N","T","A","I","M"]
                },
                months: {
                    names: ["Januari","Februari","Machi","Aprili","Mei","Juni","Julai","Agosti","Septemba","Oktoba","Novemba","Decemba",""],
                    namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ago","Sep","Okt","Nov","Dec",""]
                },
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    Y: "MMMM, yyyy"
                }
            })
        }
    }, cultures["sw-KE"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);