(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["en-JM"] = $.extend(true, {}, invariant, {
        name: "en-JM",
        englishName: "English (Jamaica)",
        nativeName: "English (Jamaica)",
        numberFormat: {
            currency: {
                pattern: ["-$n","$n"],
                symbol: "J$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy hh:mm tt",
                    F: "dddd, MMMM dd, yyyy hh:mm:ss tt",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);