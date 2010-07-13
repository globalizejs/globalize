(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-CA"] = $.extend(true, {}, en, {
        name: "en-CA",
        englishName: "English (Canada)",
        nativeName: "English (Canada)",
        numberFormat: {
            currency: {
                pattern: ["-$n","$n"]
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "MMMM-dd-yy",
                    f: "MMMM-dd-yy h:mm tt",
                    F: "MMMM-dd-yy h:mm:ss tt"
                }
            })
        }
    }, cultures["en-CA"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);