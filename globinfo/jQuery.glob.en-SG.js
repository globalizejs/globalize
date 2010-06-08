(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-SG"] = $.extend(true, {}, en, {
        name: "en-SG",
        englishName: "English (Singapore)",
        nativeName: "English (Singapore)",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    namesShort: ["S","M","T","W","T","F","S"]
                },
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d MMMM, yyyy",
                    f: "dddd, d MMMM, yyyy h:mm tt",
                    F: "dddd, d MMMM, yyyy h:mm:ss tt",
                    M: "d MMMM"
                }
            })
        }
    }, cultures["en-SG"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);