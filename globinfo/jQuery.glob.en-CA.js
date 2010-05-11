(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["en-CA"] = $.extend(true, {}, invariant, {
        name: "en-CA",
        englishName: "English (Canada)",
        nativeName: "English (Canada)",
        numberFormat: {
            currency: {
                pattern: ["-$n","$n"],
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "MMMM-dd-yy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "MMMM-dd-yy h:mm tt",
                    F: "MMMM-dd-yy h:mm:ss tt",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);