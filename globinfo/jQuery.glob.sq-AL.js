(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["sq-AL"] = $.extend(true, {}, invariant, {
        name: "sq-AL",
        englishName: "Albanian (Albania)",
        nativeName: "shqipe (Shqipëria)",
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
                days: [["e diel","e hënë","e martë","e mërkurë","e enjte","e premte","e shtunë"],["Die","Hën","Mar","Mër","Enj","Pre","Sht"]],
                months: [["janar","shkurt","mars","prill","maj","qershor","korrik","gusht","shtator","tetor","nëntor","dhjetor",""],["Jan","Shk","Mar","Pri","Maj","Qer","Kor","Gsh","Sht","Tet","Nën","Dhj",""]],
                AM: "PD",
                PM: "MD",
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
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);