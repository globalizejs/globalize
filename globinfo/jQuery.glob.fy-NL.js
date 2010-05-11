(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["fy-NL"] = $.extend(true, {}, invariant, {
        name: "fy-NL",
        englishName: "Frisian (Netherlands)",
        nativeName: "Frysk (Nederlân)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["Snein","Moandei","Tiisdei","Woansdei","Tongersdei","Freed","Sneon"],["Sn","Mo","Ti","Wo","To","Fr","Sn"]],
                months: [["jannewaris","febrewaris","maart","april","maaie","juny","july","augustus","septimber","oktober","novimber","desimber",""],["jann","febr","mrt","apr","maaie","jun","jul","aug","sept","okt","nov","des",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "d-M-yyyy",
                    D: "dddd d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd d MMMM yyyy H:mm",
                    F: "dddd d MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);