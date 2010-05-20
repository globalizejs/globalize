(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["nso-ZA"] = $.extend(true, {}, invariant, {
        name: "nso-ZA",
        englishName: "Sesotho sa Leboa (South Africa)",
        nativeName: "Sesotho sa Leboa (Afrika Borwa)",
        language: "nso",
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
                days: [["Lamorena","Mošupologo","Labobedi","Laboraro","Labone","Labohlano","Mokibelo"],["Lam","Moš","Lbb","Lbr","Lbn","Lbh","Mok"],["L","M","L","L","L","L","M"]],
                months: [["Pherekgong","Hlakola","Mopitlo","Moranang","Mosegamanye","Ngoatobošego","Phuphu","Phato","Lewedi","Diphalana","Dibatsela","Manthole",""],["Pher","Hlak","Mop","Mor","Mos","Ngwat","Phup","Phat","Lew","Dip","Dib","Man",""]],
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
    }, cultures["nso-ZA"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);