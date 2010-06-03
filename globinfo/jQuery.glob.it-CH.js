(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["it-CH"] = $.extend(true, {}, invariant, {
        name: "it-CH",
        englishName: "Italian (Switzerland)",
        nativeName: "italiano (Svizzera)",
        language: "it",
        numberFormat: {
            ',': "'",
            percent: {
                pattern: ["-n%","n%"],
                ',': "'"
            },
            currency: {
                pattern: ["$-n","$ n"],
                ',': "'",
                symbol: "fr."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["domenica","lunedì","martedì","mercoledì","giovedì","venerdì","sabato"],
                    namesAbbr: ["dom","lun","mar","mer","gio","ven","sab"],
                    namesShort: ["do","lu","ma","me","gi","ve","sa"]
                },
                months: {
                    names: ["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre",""],
                    namesAbbr: ["gen","feb","mar","apr","mag","giu","lug","ago","set","ott","nov","dic",""]
                },
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
    }, cultures["it-CH"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);