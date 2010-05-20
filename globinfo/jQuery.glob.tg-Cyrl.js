(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["tg-Cyrl"] = $.extend(true, {}, invariant, {
        name: "tg-Cyrl",
        englishName: "Tajik (Cyrillic)",
        nativeName: "Тоҷикӣ",
        language: "tg-Cyrl",
        numberFormat: {
            ',': " ",
            '.': ",",
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,0],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                groupSizes: [3,0],
                ',': " ",
                '.': ";",
                symbol: "т.р."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["Яш","Душанбе","Сешанбе","Чоршанбе","Панҷшанбе","Ҷумъа","Шанбе"],["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"],["Яш","Дш","Сш","Чш","Пш","Ҷм","Шн"]],
                months: [["Январ","Феврал","Март","Апрел","Май","Июн","Июл","Август","Сентябр","Октябр","Ноябр","Декабр",""],["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]],
                monthsGenitive: [["январи","феврали","марти","апрели","маи","июни","июли","августи","сентябри","октябри","ноябри","декабри",""],["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yy",
                    D: "d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy H:mm",
                    F: "d MMMM yyyy H:mm:ss",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["tg-Cyrl"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);