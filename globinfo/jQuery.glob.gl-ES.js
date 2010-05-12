(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["gl-ES"] = $.extend(true, {}, invariant, {
        name: "gl-ES",
        englishName: "Galician (Galician)",
        nativeName: "galego (galego)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["domingo","luns","martes","mércores","xoves","venres","sábado"],["dom","luns","mar","mér","xov","ven","sáb"],["do","lu","ma","mé","xo","ve","sá"]],
                months: [["xaneiro","febreiro","marzo","abril","maio","xuño","xullo","agosto","setembro","outubro","novembro","decembro",""],["xan","feb","mar","abr","maio","xuñ","xull","ago","set","out","nov","dec",""]],
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy H:mm",
                    F: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM\u0027 de \u0027yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);