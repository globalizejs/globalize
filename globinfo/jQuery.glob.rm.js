(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["rm"] = $.extend(true, {}, en, {
        name: "rm",
        englishName: "Romansh",
        nativeName: "Rumantsch",
        language: "rm",
        numberFormat: {
            ',': "'",
            percent: {
                pattern: ["-n%","n%"],
                ',': "'"
            },
            currency: {
                pattern: ["$-n","$ n"],
                ',': "'",
                symbol: "fr."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["dumengia","glindesdi","mardi","mesemna","gievgia","venderdi","sonda"],
                    namesAbbr: ["du","gli","ma","me","gie","ve","so"],
                    namesShort: ["du","gli","ma","me","gie","ve","so"]
                },
                months: {
                    names: ["schaner","favrer","mars","avrigl","matg","zercladur","fanadur","avust","settember","october","november","december",""],
                    namesAbbr: ["schan","favr","mars","avr","matg","zercl","fan","avust","sett","oct","nov","dec",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"s. Cr.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dddd, d MMMM yyyy HH:mm",
                    F: "dddd, d MMMM yyyy HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["rm"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);