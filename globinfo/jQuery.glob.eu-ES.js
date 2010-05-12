(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["eu-ES"] = $.extend(true, {}, invariant, {
        name: "eu-ES",
        englishName: "Basque (Basque)",
        nativeName: "euskara (euskara)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["igandea","astelehena","asteartea","asteazkena","osteguna","ostirala","larunbata"],["ig.","al.","as.","az.","og.","or.","lr."],["ig","al","as","az","og","or","lr"]],
                months: [["urtarrila","otsaila","martxoa","apirila","maiatza","ekaina","uztaila","abuztua","iraila","urria","azaroa","abendua",""],["urt.","ots.","mar.","api.","mai.","eka.","uzt.","abu.","ira.","urr.","aza.","abe.",""]],
                AM: null,
                PM: null,
                eras: [{"name":"d.C.","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dddd, yyyy.\u0027eko\u0027 MMMM\u0027k \u0027d",
                    T: "H:mm:ss",
                    f: "dddd, yyyy.\u0027eko\u0027 MMMM\u0027k \u0027d HH:mm",
                    F: "dddd, yyyy.\u0027eko\u0027 MMMM\u0027k \u0027d H:mm:ss",
                    Y: "yyyy.\u0027eko\u0027 MMMM"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);