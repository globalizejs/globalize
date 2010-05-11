(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["sms-FI"] = $.extend(true, {}, invariant, {
        name: "sms-FI",
        englishName: "Sami, Skolt (Finland)",
        nativeName: "sääm´ǩiõll (Lää´ddjânnam)",
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
                days: [["pâ´sspei´vv","vuõssargg","mââibargg","seärad","nelljdpei´vv","piâtnâc","sue´vet"],["pâ","vu","mâ","se","ne","pi","su"]],
                months: [["ođđee´jjmään","tä´lvvmään","pâ´zzlâšttammään","njuhččmään","vue´ssmään","ǩie´ssmään","suei´nnmään","på´rǧǧmään","čõhččmään","kålggmään","skamm´mään","rosttovmään",""],["ođjm","tä´lvv","pâzl","njuh","vue","ǩie","suei","på´r","čõh","kålg","ska","rost",""]],
                monthsGenitive: [["ođđee´jjmannu","tä´lvvmannu","pâ´zzlâšttammannu","njuhččmannu","vue´ssmannu","ǩie´ssmannu","suei´nnmannu","på´rǧǧmannu","čõhččmannu","kålggmannu","skamm´mannu","rosttovmannu",""],["ođjm","tä´lvv","pâzl","njuh","vue","ǩie","suei","på´r","čõh","kålg","ska","rost",""]],
                AM: "",
                PM: "",
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
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);