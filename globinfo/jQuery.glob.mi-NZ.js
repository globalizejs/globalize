(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["mi-NZ"] = $.extend(true, {}, invariant, {
        name: "mi-NZ",
        englishName: "Maori (New Zealand)",
        nativeName: "Reo Māori (Aotearoa)",
        numberFormat: {
            percent: {
                pattern: ["-%n","%n"]
            },
            currency: {
                pattern: ["-$n","$n"],
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["Rātapu","Rāhina","Rātū","Rāapa","Rāpare","Rāmere","Rāhoroi"],["Ta","Hi","Tū","Apa","Pa","Me","Ho"]],
                months: [["Kohi-tātea","Hui-tanguru","Poutū-te-rangi","Paenga-whāwhā","Haratua","Pipiri","Hōngongoi","Here-turi-kōkā","Mahuru","Whiringa-ā-nuku","Whiringa-ā-rangi","Hakihea",""],["Kohi","Hui","Pou","Pae","Hara","Pipi","Hōngo","Here","Mahu","Nuku","Rangi","Haki",""]],
                AM: "a.m.",
                PM: "p.m.",
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, dd MMMM, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, dd MMMM, yyyy h:mm tt",
                    F: "dddd, dd MMMM, yyyy h:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM, yy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);