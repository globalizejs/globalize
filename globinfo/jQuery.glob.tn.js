(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["tn"] = $.extend(true, {}, invariant, {
        name: "tn",
        englishName: "Setswana",
        nativeName: "Setswana",
        language: "tn",
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
                name: "Gregorian_Localized",
                days: {
                    names: ["Latshipi","Mosupologo","Labobedi","Laboraro","Labone","Labotlhano","Lamatlhatso"],
                    namesAbbr: ["Ltp.","Mos.","Lbd.","Lbr.","Lbn.","Lbt.","Lmt."],
                    namesShort: ["Lp","Ms","Lb","Lr","Ln","Lt","Lm"]
                },
                months: {
                    names: ["Ferikgong","Tlhakole","Mopitloe","Moranang","Motsheganong","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimothole",""],
                    namesAbbr: ["Fer.","Tlhak.","Mop.","Mor.","Motsh.","Seet.","Phukw.","Phatw.","Lwets.","Diph.","Ngwan.","Sed.",""]
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
    }, cultures["tn"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);