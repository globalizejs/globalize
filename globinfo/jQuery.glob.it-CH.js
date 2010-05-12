(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["it-CH"] = $.extend(true, {}, invariant, {
        name: "it-CH",
        englishName: "Italian (Switzerland)",
        nativeName: "italiano (Svizzera)",
        numberFormat: {
            ',': "\u0027",
            percent: {
                pattern: ["-n%","n%"],
                ',': "\u0027"
            },
            currency: {
                pattern: ["$-n","$ n"],
                ',': "\u0027",
                symbol: "fr."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],["dom","lun","mar","mer","gio","ven","sab"],["do","lu","ma","me","gi","ve","sa"]],
                months: [["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre",""],["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic",""]],
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dddd, d. MMMM yyyy",
                    f: "dddd, d. MMMM yyyy HH:mm",
                    F: "dddd, d. MMMM yyyy HH:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);