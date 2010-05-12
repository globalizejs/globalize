(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["pa-IN"] = $.extend(true, {}, invariant, {
        name: "pa-IN",
        englishName: "Punjabi (India)",
        nativeName: "ਪੰਜਾਬੀ (ਭਾਰਤ)",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currency: {
                pattern: ["$ -n","$ n"],
                groupSizes: [3,2],
                symbol: "ਰੁ"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["ਐਤਵਾਰ","ਸੋਮਵਾਰ","ਮੰਗਲਵਾਰ","ਬੁੱਧਵਾਰ","ਵੀਰਵਾਰ","ਸ਼ੁੱਕਰਵਾਰ","ਸ਼ਨਿੱਚਰਵਾਰ"],["ਐਤ.","ਸੋਮ.","ਮੰਗਲ.","ਬੁੱਧ.","ਵੀਰ.","ਸ਼ੁਕਰ.","ਸ਼ਨਿੱਚਰ."],["ਐ","ਸ","ਮ","ਬ","ਵ","ਸ਼","ਸ਼"]],
                months: [["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""],["ਜਨਵਰੀ","ਫ਼ਰਵਰੀ","ਮਾਰਚ","ਅਪ੍ਰੈਲ","ਮਈ","ਜੂਨ","ਜੁਲਾਈ","ਅਗਸਤ","ਸਤੰਬਰ","ਅਕਤੂਬਰ","ਨਵੰਬਰ","ਦਸੰਬਰ",""]],
                AM: ["ਸਵੇਰ","ਸਵੇਰ","ਸਵੇਰ"],
                PM: ["ਸ਼ਾਮ","ਸ਼ਾਮ","ਸ਼ਾਮ"],
                patterns: {
                    d: "dd-MM-yy",
                    D: "dd MMMM yyyy dddd",
                    t: "tt hh:mm",
                    T: "tt hh:mm:ss",
                    f: "dd MMMM yyyy dddd tt hh:mm",
                    F: "dd MMMM yyyy dddd tt hh:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);