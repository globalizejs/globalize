(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["quz-PE"] = $.extend(true, {}, invariant, {
        name: "quz-PE",
        englishName: "Quechua (Peru)",
        nativeName: "runasimi (Piruw)",
        numberFormat: {
            percent: {
                pattern: ["-%n","%n"]
            },
            currency: {
                pattern: ["$ -n","$ n"],
                symbol: "S/."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["intichaw","killachaw","atipachaw","quyllurchaw","Ch\u0027 askachaw","Illapachaw","k\u0027uychichaw"],["int","kil","ati","quy","Ch\u0027","Ill","k\u0027u"]],
                months: [["Qulla puquy","Hatun puquy","Pauqar waray","ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarq\u0027a","Kapaq Raymi",""],["Qul","Hat","Pau","ayr","Aym","Int","Ant","Qha","Uma","Kan","Aya","Kap",""]],
                AM: "a.m.",
                PM: "p.m.",
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy hh:mm tt",
                    F: "dddd, dd\u0027 de \u0027MMMM\u0027 de \u0027yyyy hh:mm:ss tt",
                    Y: "MMMM\u0027 de \u0027yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);