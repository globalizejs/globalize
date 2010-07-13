(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-ZA"] = $.extend(true, {}, en, {
        name: "en-ZA",
        englishName: "English (South Africa)",
        nativeName: "English (South Africa)",
        numberFormat: {
            ',': " ",
            percent: {
                pattern: ["-n%","n%"],
                ',': " "
            },
            currency: {
                pattern: ["$-n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "R"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dd MMMM yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dd MMMM yyyy hh:mm tt",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["en-ZA"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);