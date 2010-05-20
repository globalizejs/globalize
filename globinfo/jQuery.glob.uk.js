(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["uk"] = $.extend(true, {}, invariant, {
        name: "uk",
        englishName: "Ukrainian",
        nativeName: "українська",
        language: "uk",
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
                symbol: "₴"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["неділя","понеділок","вівторок","середа","четвер","п\u0027ятниця","субота"],["Нд","Пн","Вт","Ср","Чт","Пт","Сб"],["Нд","Пн","Вт","Ср","Чт","Пт","Сб"]],
                months: [["Січень","Лютий","Березень","Квітень","Травень","Червень","Липень","Серпень","Вересень","Жовтень","Листопад","Грудень",""],["Січ","Лют","Бер","Кві","Тра","Чер","Лип","Сер","Вер","Жов","Лис","Гру",""]],
                monthsGenitive: [["січня","лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня",""],["січ","лют","бер","кві","тра","чер","лип","сер","вер","жов","лис","гру",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy\u0027 р.\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy\u0027 р.\u0027 H:mm",
                    F: "d MMMM yyyy\u0027 р.\u0027 H:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy\u0027 р.\u0027"
                }
            })
        }
    }, cultures["uk"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);