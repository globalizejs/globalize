(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["ug-CN"] = $.extend(true, {}, invariant, {
        name: "ug-CN",
        englishName: "Uyghur (PRC)",
        nativeName: "ئۇيغۇرچە (جۇڭخۇا خەلق جۇمھۇرىيىتى)",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                pattern: ["$-n","$n"],
                symbol: "¥"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["يەكشەنبە","دۈشەنبە","سەيشەنبە","چارشەنبە","پەيشەنبە","جۈمە","شەنبە"],["يە","دۈ","سە","چا","پە","جۈ","شە"]],
                months: [["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""],["1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي",""]],
                AM: "چۈشتىن بۇرۇن",
                PM: "چۈشتىن كېيىن",
                eras: [{"name":"مىلادى","start":null,"offset":0}],
                patterns: {
                    d: "yyyy-M-d",
                    D: "yyyy-\u0027يىلى\u0027 MMMM d-\u0027كۈنى،\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy-\u0027يىلى\u0027 MMMM d-\u0027كۈنى،\u0027 H:mm",
                    F: "yyyy-\u0027يىلى\u0027 MMMM d-\u0027كۈنى،\u0027 H:mm:ss",
                    M: "MMMM d\u0027-كۈنى\u0027",
                    Y: "yyyy-\u0027يىلى\u0027 MMMM"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);