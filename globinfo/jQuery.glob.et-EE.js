(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["et-EE"] = $.extend(true, {}, invariant, {
        name: "et-EE",
        englishName: "Estonian (Estonia)",
        nativeName: "eesti (Eesti)",
        language: "et",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["pühapäev","esmaspäev","teisipäev","kolmapäev","neljapäev","reede","laupäev"],["P","E","T","K","N","R","L"],["P","E","T","K","N","R","L"]],
                months: [["jaanuar","veebruar","märts","aprill","mai","juuni","juuli","august","september","oktoober","november","detsember",""],["jaan","veebr","märts","apr","mai","juuni","juuli","aug","sept","okt","nov","dets",""]],
                AM: ["EL","el","EL"],
                PM: ["PL","pl","PL"],
                patterns: {
                    d: "d.MM.yyyy",
                    D: "d. MMMM yyyy\u0027. a.\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy\u0027. a.\u0027 H:mm",
                    F: "d. MMMM yyyy\u0027. a.\u0027 H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy\u0027. a.\u0027"
                }
            })
        }
    }, cultures["et-EE"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);