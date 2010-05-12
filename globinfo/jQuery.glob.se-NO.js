(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["se-NO"] = $.extend(true, {}, invariant, {
        name: "se-NO",
        englishName: "Sami, Northern (Norway)",
        nativeName: "davvisámegiella (Norga)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-%n","%n"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "kr"
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
                    d: "dd.MM.yyyy",
                    D: "MMMM d\u0027. b. \u0027yyyy",
                    f: "MMMM d\u0027. b. \u0027yyyy HH:mm",
                    F: "MMMM d\u0027. b. \u0027yyyy HH:mm:ss",
                    M: "MMMM d\u0027. b. \u0027",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);