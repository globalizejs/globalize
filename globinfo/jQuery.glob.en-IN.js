(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-IN"] = $.extend(true, {}, en, {
        name: "en-IN",
        englishName: "English (India)",
        nativeName: "English (India)",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currency: {
                pattern: ["$ -n","$ n"],
                groupSizes: [3,2],
                symbol: "Rs."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy HH:mm",
                    F: "dd MMMM yyyy HH:mm:ss",
                    M: "dd MMMM"
                }
            })
        }
    }, cultures["en-IN"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);