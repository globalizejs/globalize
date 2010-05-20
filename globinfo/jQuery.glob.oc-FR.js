(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["oc-FR"] = $.extend(true, {}, invariant, {
        name: "oc-FR",
        englishName: "Occitan (France)",
        nativeName: "Occitan (França)",
        language: "oc",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["dimenge","diluns","dimars","dimècres","dijòus","divendres","dissabte"],["dim.","lun.","mar.","mèc.","jòu.","ven.","sab."],["di","lu","ma","mè","jò","ve","sa"]],
                months: [["genier","febrier","març","abril","mai","junh","julh","agost","setembre","octobre","novembre","desembre",""],["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]],
                monthsGenitive: [["de genier","de febrier","de març","d\u0027abril","de mai","de junh","de julh","d\u0027agost","de setembre","d\u0027octobre","de novembre","de desembre",""],["gen.","feb.","mar.","abr.","mai.","jun.","jul.","ag.","set.","oct.","nov.","des.",""]],
                AM: null,
                PM: null,
                eras: [{"name":"après Jèsus-Crist","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd,\u0027 lo \u0027d MMMM\u0027 de \u0027yyyy",
                    f: "dddd,\u0027 lo \u0027d MMMM\u0027 de \u0027yyyy HH:mm",
                    F: "dddd,\u0027 lo \u0027d MMMM\u0027 de \u0027yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["oc-FR"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);