(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["smn-FI"] = $.extend(true, {}, en, {
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
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["pasepeivi","vuossargâ","majebargâ","koskokko","tuorâstâh","vástuppeivi","lávárdâh"],
                    namesAbbr: ["pa","vu","ma","ko","tu","vá","lá"],
                    namesShort: ["p","v","m","k","t","v","l"]
                },
                months: {
                    names: ["uđđâivemáánu","kuovâmáánu","njuhčâmáánu","cuáŋuimáánu","vyesimáánu","kesimáánu","syeinimáánu","porgemáánu","čohčâmáánu","roovvâdmáánu","skammâmáánu","juovlâmáánu",""],
                    namesAbbr: ["uđiv","kuov","njuh","cuoŋ","vyes","kesi","syei","porg","čoh","roov","ska","juov",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "MMMM d'. p. 'yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "MMMM d'. p. 'yyyy H:mm",
                    F: "MMMM d'. p. 'yyyy H:mm:ss",
                    M: "MMMM d'. p. '",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["smn-FI"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);