(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["zu-ZA"] = $.extend(true, {}, en, {
        name: "zu-ZA",
        englishName: "isiZulu (South Africa)",
        nativeName: "isiZulu (iNingizimu Afrika)",
        language: "zu",
        numberFormat: {
            percent: {
                pattern: ["-%n","%n"]
            },
            currency: {
                pattern: ["$-n","$ n"],
                symbol: "R"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["iSonto","uMsombuluko","uLwesibili","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
                    namesAbbr: ["Son.","Mso.","Bi.","Tha.","Ne.","Hla.","Mgq."]
                },
                months: {
                    names: ["uMasingana","uNhlolanja","uNdasa","uMbaso","uNhlaba","uNhlangulana","uNtulikazi","uNcwaba","uMandulo","uMfumfu","uLwezi","uZibandlela",""],
                    namesAbbr: ["Mas.","Nhlo.","Nda.","Mba.","Nhla.","Nhlang.","Ntu.","Ncwa.","Man.","Mfu.","Lwe.","Zib.",""]
                },
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dd MMMM yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dd MMMM yyyy hh:mm tt",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["zu-ZA"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);