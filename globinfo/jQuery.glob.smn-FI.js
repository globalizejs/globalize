(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["smn-FI"] = $.extend(true, {}, invariant, {
        name: "smn-FI",
        englishName: "Sami, Inari (Finland)",
        nativeName: "sämikielâ (Suomâ)",
        language: "smn",
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
                '/': ".",
                firstDay: 1,
                days: [["pasepeivi","vuossargâ","majebargâ","koskokko","tuorâstâh","vástuppeivi","lávárdâh"],["pa","vu","ma","ko","tu","vá","lá"],["p","v","m","k","t","v","l"]],
                months: [["uđđâivemáánu","kuovâmáánu","njuhčâmáánu","cuáŋuimáánu","vyesimáánu","kesimáánu","syeinimáánu","porgemáánu","čohčâmáánu","roovvâdmáánu","skammâmáánu","juovlâmáánu",""],["uđiv","kuov","njuh","cuoŋ","vyes","kesi","syei","porg","čoh","roov","ska","juov",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "MMMM d\u0027. p. \u0027yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "MMMM d\u0027. p. \u0027yyyy H:mm",
                    F: "MMMM d\u0027. p. \u0027yyyy H:mm:ss",
                    M: "MMMM d\u0027. p. \u0027",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["smn-FI"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);