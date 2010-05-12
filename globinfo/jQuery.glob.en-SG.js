(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["en-SG"] = $.extend(true, {}, invariant, {
        name: "en-SG",
        englishName: "English (Singapore)",
        nativeName: "English (Singapore)",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["S","M","T","W","T","F","S"]],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, d MMMM, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, d MMMM, yyyy h:mm tt",
                    F: "dddd, d MMMM, yyyy h:mm:ss tt",
                    M: "d MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);