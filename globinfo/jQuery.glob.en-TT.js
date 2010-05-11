(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["en-TT"] = $.extend(true, {}, invariant, {
        name: "en-TT",
        englishName: "English (Trinidad and Tobago)",
        nativeName: "English (Trinidad y Tobago)",
        numberFormat: {
            currency: {
                groupSizes: [3,0],
                symbol: "TT$"
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
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);