(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["ko"] = $.extend(true, {}, invariant, {
        name: "ko",
        englishName: "Korean",
        nativeName: "한국어",
        language: "ko",
        numberFormat: {
            currency: {
                pattern: ["-$n","$n"],
                decimals: 0,
                symbol: "₩"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],["일","월","화","수","목","금","토"],["일","월","화","수","목","금","토"]],
                months: [["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",""],["1","2","3","4","5","6","7","8","9","10","11","12",""]],
                AM: ["오전","오전","오전"],
                PM: ["오후","오후","오후"],
                eras: [{"name":"서기","start":null,"offset":0}],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy\u0027년\u0027 M\u0027월\u0027 d\u0027일\u0027 dddd",
                    t: "tt h:mm",
                    T: "tt h:mm:ss",
                    f: "yyyy\u0027년\u0027 M\u0027월\u0027 d\u0027일\u0027 dddd tt h:mm",
                    F: "yyyy\u0027년\u0027 M\u0027월\u0027 d\u0027일\u0027 dddd tt h:mm:ss",
                    M: "M\u0027월\u0027 d\u0027일\u0027",
                    Y: "yyyy\u0027년\u0027 M\u0027월\u0027"
                }
            }),
            Korean: $.extend(true, {}, standard, {
                name: "Korean",
                '/': "-",
                days: [["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],["일","월","화","수","목","금","토"],["일","월","화","수","목","금","토"]],
                months: [["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월",""],["1","2","3","4","5","6","7","8","9","10","11","12",""]],
                AM: ["오전","오전","오전"],
                PM: ["오후","오후","오후"],
                eras: [{"name":"단기","start":null,"offset":-2333}],
                twoDigitYearMax: 4362,
                patterns: {
                    d: "gg yyyy-MM-dd",
                    D: "gg yyyy\u0027년\u0027 M\u0027월\u0027 d\u0027일\u0027 dddd",
                    t: "tt h:mm",
                    T: "tt h:mm:ss",
                    f: "gg yyyy\u0027년\u0027 M\u0027월\u0027 d\u0027일\u0027 dddd tt h:mm",
                    F: "gg yyyy\u0027년\u0027 M\u0027월\u0027 d\u0027일\u0027 dddd tt h:mm:ss",
                    M: "M\u0027월\u0027 d\u0027일\u0027",
                    Y: "gg yyyy\u0027년\u0027 M\u0027월\u0027"
                }
            })
        }
    }, cultures["ko"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);