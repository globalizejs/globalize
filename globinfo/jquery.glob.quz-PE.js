(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["quz-PE"] = $.extend(true, {}, en, {
        name: "quz-PE",
        englishName: "Quechua (Peru)",
        nativeName: "runasimi (Piruw)",
        language: "quz",
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
                days: {
                    names: ["intichaw","killachaw","atipachaw","quyllurchaw","Ch' askachaw","Illapachaw","k'uychichaw"],
                    namesAbbr: ["int","kil","ati","quy","Ch'","Ill","k'u"],
                    namesShort: ["d","k","a","m","h","b","k"]
                },
                months: {
                    names: ["Qulla puquy","Hatun puquy","Pauqar waray","ayriwa","Aymuray","Inti raymi","Anta Sitwa","Qhapaq Sitwa","Uma raymi","Kantaray","Ayamarq'a","Kapaq Raymi",""],
                    namesAbbr: ["Qul","Hat","Pau","ayr","Aym","Int","Ant","Qha","Uma","Kan","Aya","Kap",""]
                },
                AM: ["a.m.","a.m.","A.M."],
                PM: ["p.m.","p.m.","P.M."],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd' de 'MMMM' de 'yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dddd, dd' de 'MMMM' de 'yyyy hh:mm tt",
                    F: "dddd, dd' de 'MMMM' de 'yyyy hh:mm:ss tt",
                    Y: "MMMM' de 'yyyy"
                }
            })
        }
    }, cultures["quz-PE"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);