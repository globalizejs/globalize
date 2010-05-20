(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["sah-RU"] = $.extend(true, {}, invariant, {
        name: "sah-RU",
        englishName: "Yakut (Russia)",
        nativeName: "саха (Россия)",
        language: "sah",
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
                symbol: "с."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["баскыһыанньа","бэнидиэнньик","оптуорунньук","сэрэдэ","чэппиэр","бээтинсэ","субуота"],["Бс","Бн","Оп","Ср","Чп","Бт","Сб"],["Бс","Бн","Оп","Ср","Чп","Бт","Сб"]],
                months: [["Тохсунньу","Олунньу","Кулун тутар","Муус устар","Ыам ыйа","Бэс ыйа","От ыйа","Атырдьах ыйа","Балаҕан ыйа","Алтынньы","Сэтинньи","Ахсынньы",""],["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]],
                monthsGenitive: [["тохсунньу","олунньу","кулун тутар","муус устар","ыам ыйын","бэс ыйын","от ыйын","атырдьах ыйын","балаҕан ыйын","алтынньы","сэтинньи","ахсынньы",""],["тхс","олн","кул","мст","ыам","бэс","отй","атр","блҕ","алт","стн","ахс",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "MM.dd.yyyy",
                    D: "MMMM d yyyy \u0027с.\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "MMMM d yyyy \u0027с.\u0027 H:mm",
                    F: "MMMM d yyyy \u0027с.\u0027 H:mm:ss",
                    Y: "MMMM yyyy \u0027с.\u0027"
                }
            })
        }
    }, cultures["sah-RU"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);