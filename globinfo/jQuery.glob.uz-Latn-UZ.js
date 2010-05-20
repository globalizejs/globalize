(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["uz-Latn-UZ"] = $.extend(true, {}, invariant, {
        name: "uz-Latn-UZ",
        englishName: "Uzbek (Latin, Uzbekistan)",
        nativeName: "U\u0027zbek (U\u0027zbekiston Respublikasi)",
        language: "uz-Latn",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                decimals: 0,
                ',': " ",
                '.': ",",
                symbol: "so\u0027m"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["yakshanba","dushanba","seshanba","chorshanba","payshanba","juma","shanba"],["yak.","dsh.","sesh.","chr.","psh.","jm.","sh."],["ya","d","s","ch","p","j","sh"]],
                months: [["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd/MM yyyy",
                    D: "yyyy \u0027yil\u0027 d-MMMM",
                    f: "yyyy \u0027yil\u0027 d-MMMM HH:mm",
                    F: "yyyy \u0027yil\u0027 d-MMMM HH:mm:ss",
                    M: "d-MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["uz-Latn-UZ"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);