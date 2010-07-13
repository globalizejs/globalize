(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-MY"] = $.extend(true, {}, en, {
        name: "en-MY",
        englishName: "English (Malaysia)",
        nativeName: "English (Malaysia)",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                symbol: "RM"
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
    }, cultures["en-MY"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);