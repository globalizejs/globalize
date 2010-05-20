(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["en-ZA"] = $.extend(true, {}, invariant, {
        name: "en-ZA",
        englishName: "English (South Africa)",
        nativeName: "English (South Africa)",
        language: "en",
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
                name: "Gregorian_Localized",
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