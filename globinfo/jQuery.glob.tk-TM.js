(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["tk-TM"] = $.extend(true, {}, invariant, {
        name: "tk-TM",
        englishName: "Turkmen (Turkmenistan)",
        nativeName: "türkmençe (Türkmenistan)",
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
                days: [["Duşenbe","Sişenbe","Çarşenbe","Penşenbe","Anna","Şenbe","Ýekşenbe"],["Db","Sb","Çb","Pb","An","Şb","Ýb"]],
                months: [["Ýanwar","Fewral","Mart","Aprel","Maý","lýun","lýul","Awgust","Sentýabr","Oktýabr","Noýabr","Dekabr",""],["Ýan","Few","Mart","Apr","Maý","lýun","lýul","Awg","Sen","Okt","Not","Dek",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "dd.MM.yy",
                    D: "yyyy \u0027ý.\u0027 MMMM d",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy \u0027ý.\u0027 MMMM d H:mm",
                    F: "yyyy \u0027ý.\u0027 MMMM d H:mm:ss",
                    Y: "yyyy \u0027ý.\u0027 MMMM"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);