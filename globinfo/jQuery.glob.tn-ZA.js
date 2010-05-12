(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["tn-ZA"] = $.extend(true, {}, invariant, {
        name: "tn-ZA",
        englishName: "Setswana (South Africa)",
        nativeName: "Setswana (Aforika Borwa)",
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
                days: [["Latshipi","Mosupologo","Labobedi","Laboraro","Labone","Labotlhano","Lamatlhatso"],["Ltp.","Mos.","Lbd.","Lbr.","Lbn.","Lbt.","Lmt."],["Lp","Ms","Lb","Lr","Ln","Lt","Lm"]],
                months: [["Ferikgong","Tlhakole","Mopitloe","Moranang","Motsheganong","Seetebosigo","Phukwi","Phatwe","Lwetse","Diphalane","Ngwanatsele","Sedimothole",""],["Fer.","Tlhak.","Mop.","Mor.","Motsh.","Seet.","Phukw.","Phatw.","Lwets.","Diph.","Ngwan.","Sed.",""]],
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
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);