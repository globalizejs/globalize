(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["tk"] = $.extend(true, {}, invariant, {
        name: "tk",
        englishName: "Turkmen",
        nativeName: "türkmençe",
        language: "tk",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n$","n$"],
                ',': " ",
                '.': ",",
                symbol: "m."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["Duşenbe","Sişenbe","Çarşenbe","Penşenbe","Anna","Şenbe","Ýekşenbe"],
                    namesAbbr: ["Db","Sb","Çb","Pb","An","Şb","Ýb"],
                    namesShort: ["D","S","Ç","P","A","Ş","Ý"]
                },
                months: {
                    names: ["Ýanwar","Fewral","Mart","Aprel","Maý","lýun","lýul","Awgust","Sentýabr","Oktýabr","Noýabr","Dekabr",""],
                    namesAbbr: ["Ýan","Few","Mart","Apr","Maý","lýun","lýul","Awg","Sen","Okt","Not","Dek",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yy",
                    D: "yyyy 'ý.' MMMM d",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy 'ý.' MMMM d H:mm",
                    F: "yyyy 'ý.' MMMM d H:mm:ss",
                    Y: "yyyy 'ý.' MMMM"
                }
            })
        }
    }, cultures["tk"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);