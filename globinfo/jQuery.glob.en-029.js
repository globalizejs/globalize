(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["en-029"] = $.extend(true, {}, en, {
        name: "en-029",
        englishName: "English (Caribbean)",
        nativeName: "English (Caribbean)",
        numberFormat: {
            currency: {
                pattern: ["-$n","$n"]
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                patterns: {
                    d: "MM/dd/yyyy"
                }
            })
        }
    }, cultures["en-029"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);