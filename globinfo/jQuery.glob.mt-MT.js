(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["mt-MT"] = $.extend(true, {}, invariant, {
        name: "mt-MT",
        englishName: "Maltese (Malta)",
        nativeName: "Malti (Malta)",
        language: "mt",
        numberFormat: {
            percent: {
                pattern: ["-%n","%n"]
            },
            currency: {
                pattern: ["-$n","$n"],
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["Il-Ħadd","It-Tnejn","It-Tlieta","L-Erbgħa","Il-Ħamis","Il-Ġimgħa","Is-Sibt"],["Ħad","Tne","Tli","Erb","Ħam","Ġim","Sib"],["I","I","I","L","I","I","I"]],
                months: [["Jannar","Frar","Marzu","April","Mejju","Ġunju","Lulju","Awissu","Settembru","Ottubru","Novembru","Diċembru",""],["Jan","Fra","Mar","Apr","Mej","Ġun","Lul","Awi","Set","Ott","Nov","Diċ",""]],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd, d\u0027 ta\\\u0027 \u0027MMMM yyyy",
                    f: "dddd, d\u0027 ta\\\u0027 \u0027MMMM yyyy HH:mm",
                    F: "dddd, d\u0027 ta\\\u0027 \u0027MMMM yyyy HH:mm:ss",
                    M: "d\u0027 ta\\\u0027 \u0027MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["mt-MT"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);