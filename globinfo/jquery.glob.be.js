(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["be"] = $.extend(true, {}, en, {
        name: "be",
        englishName: "Belarusian",
        nativeName: "Беларускі",
        language: "be",
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
                symbol: "р."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["нядзеля","панядзелак","аўторак","серада","чацвер","пятніца","субота"],
                    namesAbbr: ["нд","пн","аў","ср","чц","пт","сб"],
                    namesShort: ["нд","пн","аў","ср","чц","пт","сб"]
                },
                months: {
                    names: ["Студзень","Люты","Сакавік","Красавік","Май","Чэрвень","Ліпень","Жнівень","Верасень","Кастрычнік","Лістапад","Снежань",""],
                    namesAbbr: ["Сту","Лют","Сак","Кра","Май","Чэр","Ліп","Жні","Вер","Кас","Ліс","Сне",""]
                },
                monthsGenitive: {
                    names: ["студзеня","лютага","сакавіка","красавіка","мая","чэрвеня","ліпеня","жніўня","верасня","кастрычніка","лістапада","снежня",""],
                    namesAbbr: ["Сту","Лют","Сак","Кра","Май","Чэр","Ліп","Жні","Вер","Кас","Ліс","Сне",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy H:mm",
                    F: "d MMMM yyyy H:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["be"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);