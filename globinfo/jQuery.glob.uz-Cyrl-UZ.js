(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["uz-Cyrl-UZ"] = $.extend(true, {}, invariant, {
        name: "uz-Cyrl-UZ",
        englishName: "Uzbek (Cyrillic, Uzbekistan)",
        nativeName: "Ўзбек (Ўзбекистон)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "сўм"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["якшанба","душанба","сешанба","чоршанба","пайшанба","жума","шанба"],["якш","дш","сш","чш","пш","ж","ш"],["я","д","с","ч","п","ж","ш"]],
                months: [["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр",""],["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]],
                monthsGenitive: [["январ","феврал","март","апрел","май","июн","июл","август","сентябр","октябр","ноябр","декабр",""],["Янв","Фев","Мар","Апр","мая","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "yyyy \u0027йил\u0027 d-MMMM",
                    f: "yyyy \u0027йил\u0027 d-MMMM HH:mm",
                    F: "yyyy \u0027йил\u0027 d-MMMM HH:mm:ss",
                    M: "d-MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);