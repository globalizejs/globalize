(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["yo-NG"] = $.extend(true, {}, en, {
        name: "yo-NG",
        englishName: "Yoruba (Nigeria)",
        nativeName: "Yoruba (Nigeria)",
        language: "yo",
        numberFormat: {
            currency: {
                pattern: ["$-n","$ n"],
                symbol: "N"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Aiku","Aje","Isegun","Ojo'ru","Ojo'bo","Eti","Abameta"],
                    namesAbbr: ["Aik","Aje","Ise","Ojo","Ojo","Eti","Aba"],
                    namesShort: ["A","A","I","O","O","E","A"]
                },
                months: {
                    names: ["Osu kinni","Osu keji","Osu keta","Osu kerin","Osu karun","Osu kefa","Osu keje","Osu kejo","Osu kesan","Osu kewa","Osu kokanla","Osu keresi",""],
                    namesAbbr: ["kin.","kej.","ket.","ker.","kar.","kef.","kej.","kej.","kes.","kew.","kok.","ker.",""]
                },
                AM: ["Owuro","owuro","OWURO"],
                PM: ["Ale","ale","ALE"],
                eras: [{"name":"AD","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy"
                }
            })
        }
    }, cultures["yo-NG"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);