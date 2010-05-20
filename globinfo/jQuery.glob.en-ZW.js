(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["en-ZW"] = $.extend(true, {}, invariant, {
        name: "en-ZW",
        englishName: "English (Zimbabwe)",
        nativeName: "English (Zimbabwe)",
        language: "en",
        numberFormat: {
            currency: {
                symbol: "Z$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
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
    }, cultures["en-ZW"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);