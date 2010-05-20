(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["en-BZ"] = $.extend(true, {}, invariant, {
        name: "en-BZ",
        englishName: "English (Belize)",
        nativeName: "English (Belize)",
        language: "en",
        numberFormat: {
            currency: {
                groupSizes: [3,0],
                symbol: "BZ$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                patterns: {
                    d: "dd/MM/yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, dd MMMM yyyy hh:mm tt",
                    F: "dddd, dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["en-BZ"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);