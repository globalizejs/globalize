(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["sq"] = $.extend(true, {}, invariant, {
        name: "sq",
        englishName: "Albanian",
        nativeName: "shqipe",
        language: "sq",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n$","n$"],
                ',': ".",
                '.': ",",
                symbol: "Lek"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: [["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"],["Die","Hën","Mar","Mër","Enj","Pre","Sht"],["Di","Hë","Ma","Më","En","Pr","Sh"]],
                months: [["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor",""],["Jan","Shk","Mar","Pri","Maj","Qer","Kor","Gsh","Sht","Tet","Nën","Dhj",""]],
                AM: ["PD","pd","PD"],
                PM: ["MD","md","MD"],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy-MM-dd",
                    t: "h:mm.tt",
                    T: "h:mm:ss.tt",
                    f: "yyyy-MM-dd h:mm.tt",
                    F: "yyyy-MM-dd h:mm:ss.tt",
                    Y: "yyyy-MM"
                }
            })
        }
    }, cultures["sq"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);