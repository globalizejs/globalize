(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["mn-MN"] = $.extend(true, {}, invariant, {
        name: "mn-MN",
        englishName: "Mongolian (Cyrillic, Mongolia)",
        nativeName: "Монгол хэл (Монгол улс)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n$","n$"],
                ',': " ",
                '.': ",",
                symbol: "₮"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"],["Ня","Да","Мя","Лх","Пү","Ба","Бя"]],
                months: [["1 дүгээр сар","2 дугаар сар","3 дугаар сар","4 дүгээр сар","5 дугаар сар","6 дугаар сар","7 дугаар сар","8 дугаар сар","9 дүгээр сар","10 дугаар сар","11 дүгээр сар","12 дугаар сар",""],["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]],
                monthsGenitive: [["1 дүгээр сарын","2 дугаар сарын","3 дугаар сарын","4 дүгээр сарын","5 дугаар сарын","6 дугаар сарын","7 дугаар сарын","8 дугаар сарын","9 дүгээр сарын","10 дугаар сарын","11 дүгээр сарын","12 дугаар сарын",""],["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "yy.MM.dd",
                    D: "yyyy \u0027оны\u0027 MMMM d",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy \u0027оны\u0027 MMMM d H:mm",
                    F: "yyyy \u0027оны\u0027 MMMM d H:mm:ss",
                    M: "d MMMM",
                    Y: "yyyy \u0027он\u0027 MMMM"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);