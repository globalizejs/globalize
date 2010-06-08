(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-AU"] = $.extend(true, {}, en, {
        name: "en-AU",
        englishName: "English (Australia)",
        nativeName: "English (Australia)",
        numberFormat: {
            currency: {
                pattern: ["-$n","$n"]
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                patterns: {
                    d: "d/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    f: "dddd, d MMMM yyyy h:mm tt",
                    F: "dddd, d MMMM yyyy h:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["en-AU"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);