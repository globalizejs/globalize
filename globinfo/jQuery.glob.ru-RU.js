(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["ru-RU"] = $.extend(true, {}, invariant, {
        name: "ru-RU",
        englishName: "Russian (Russia)",
        nativeName: "русский (Россия)",
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
                symbol: "р."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]],
                months: [["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]],
                monthsGenitive: [["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря",""],["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy \u0027г.\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy \u0027г.\u0027 H:mm",
                    F: "d MMMM yyyy \u0027г.\u0027 H:mm:ss",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);