(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["se-FI"] = $.extend(true, {}, invariant, {
        name: "se-FI",
        englishName: "Sami, Northern (Finland)",
        nativeName: "davvisámegiella (Suopma)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["sotnabeaivi","vuossárga","maŋŋebárga","gaskavahkku","duorastat","bearjadat","lávvardat"],["sotn","vuos","maŋ","gask","duor","bear","láv"],["s","m","d","g","d","b","l"]],
                months: [["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu",""],["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]],
                monthsGenitive: [["ođđajagimánu","guovvamánu","njukčamánu","cuoŋománu","miessemánu","geassemánu","suoidnemánu","borgemánu","čakčamánu","golggotmánu","skábmamánu","juovlamánu",""],["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "MMMM d\u0027. b. \u0027yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "MMMM d\u0027. b. \u0027yyyy H:mm",
                    F: "MMMM d\u0027. b. \u0027yyyy H:mm:ss",
                    M: "MMMM d\u0027. b. \u0027",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);