(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["se-SE"] = $.extend(true, {}, en, {
        name: "se-SE",
        englishName: "Sami, Northern (Sweden)",
        nativeName: "davvisámegiella (Ruoŧŧa)",
        language: "se",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["sotnabeaivi","mánnodat","disdat","gaskavahkku","duorastat","bearjadat","lávvardat"],
                    namesAbbr: ["sotn","mán","dis","gask","duor","bear","láv"],
                    namesShort: ["s","m","d","g","d","b","l"]
                },
                months: {
                    names: ["ođđajagemánnu","guovvamánnu","njukčamánnu","cuoŋománnu","miessemánnu","geassemánnu","suoidnemánnu","borgemánnu","čakčamánnu","golggotmánnu","skábmamánnu","juovlamánnu",""],
                    namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
                },
                monthsGenitive: {
                    names: ["ođđajagimánu","guovvamánu","njukčamánu","cuoŋománu","miessemánu","geassemánu","suoidnemánu","borgemánu","čakčamánu","golggotmánu","skábmamánu","juovlamánu",""],
                    namesAbbr: ["ođđj","guov","njuk","cuo","mies","geas","suoi","borg","čakč","golg","skáb","juov",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "MMMM d'. b. 'yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "MMMM d'. b. 'yyyy HH:mm",
                    F: "MMMM d'. b. 'yyyy HH:mm:ss",
                    M: "MMMM d'. b. '",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["se-SE"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);