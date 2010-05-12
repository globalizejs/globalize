(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["tzm-Latn-DZ"] = $.extend(true, {}, invariant, {
        name: "tzm-Latn-DZ",
        englishName: "Tamazight (Latin, Algeria)",
        nativeName: "Tamazight (Djazaïr)",
        numberFormat: {
            pattern: ["n-"],
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                symbol: "DZD"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 6,
                days: [["Acer","Arime","Aram","Ahad","Amhadh","Sem","Sedh"],["Ace","Ari","Ara","Aha","Amh","Sem","Sed"],["Ac","Ar","Ar","Ah","Am","Se","Se"]],
                months: [["Yenayer","Furar","Maghres","Yebrir","Mayu","Yunyu","Yulyu","Ghuct","Cutenber","Ktuber","Wambir","Dujanbir",""],["Yen","Fur","Mag","Yeb","May","Yun","Yul","Ghu","Cut","Ktu","Wam","Duj",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "dd MMMM, yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dd MMMM, yyyy H:mm",
                    F: "dd MMMM, yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);