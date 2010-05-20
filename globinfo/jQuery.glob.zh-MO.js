(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["zh-MO"] = $.extend(true, {}, invariant, {
        name: "zh-MO",
        englishName: "Chinese (Traditional, Macao S.A.R.)",
        nativeName: "中文(澳門特別行政區)",
        language: "zh-CHT",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                symbol: "MOP"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],["週日","週一","週二","週三","週四","週五","週六"],["日","一","二","三","四","五","六"]],
                months: [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]],
                AM: ["上午","上午","上午"],
                PM: ["下午","下午","下午"],
                eras: [{"name":"公元","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy",
                    D: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 H:mm",
                    F: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 H:mm:ss",
                    M: "M\u0027月\u0027d\u0027日\u0027",
                    Y: "yyyy\u0027年\u0027M\u0027月\u0027"
                }
            })
        }
    }, cultures["zh-MO"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);