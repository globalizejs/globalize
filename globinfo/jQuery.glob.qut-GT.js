(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["qut-GT"] = $.extend(true, {}, invariant, {
        name: "qut-GT",
        englishName: "K\u0027iche (Guatemala)",
        nativeName: "K\u0027iche (Guatemala)",
        language: "qut",
        numberFormat: {
            currency: {
                symbol: "Q"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["juq\u0027ij","kaq\u0027ij","oxq\u0027ij","kajq\u0027ij","joq\u0027ij","waqq\u0027ij","wuqq\u0027ij"],["juq","kaq","oxq","kajq","joq","waqq","wuqq"],["ju","ka","ox","ka","jo","wa","wu"]],
                months: [["nab\u0027e ik\u0027","ukab\u0027 ik\u0027","rox ik\u0027","ukaj ik\u0027","uro\u0027 ik\u0027","uwaq ik\u0027","uwuq ik\u0027","uwajxaq ik\u0027","ub\u0027elej ik\u0027","ulaj ik\u0027","ujulaj ik\u0027","ukab\u0027laj ik\u0027",""],["nab\u0027e","ukab","rox","ukaj","uro","uwaq","uwuq","uwajxaq","ub\u0027elej","ulaj","ujulaj","ukab\u0027laj",""]],
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy hh:mm tt",
                    F: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM\u0027 de \u0027yyyy"
                }
            })
        }
    }, cultures["qut-GT"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);