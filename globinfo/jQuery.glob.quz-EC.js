(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["quz-EC"] = $.extend(true, {}, en, {
        name: "quz-EC",
        englishName: "Quechua (Ecuador)",
        nativeName: "runasimi (Ecuador)",
        language: "quz",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-%n","%n"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["($ n)","$ n"],
                ',': ".",
                '.': ","
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
                AM: null,
                PM: null,
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd' de 'MMMM' de 'yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
                    F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
                    Y: "MMMM' de 'yyyy"
                }
            })
        }
    }, cultures["quz-EC"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);