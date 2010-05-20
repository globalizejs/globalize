(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["zh-CHS"] = $.extend(true, {}, invariant, {
        name: "zh-CHS",
        englishName: "Chinese (Simplified) Legacy",
        nativeName: "中文(简体) 旧版",
        language: "zh-CHS",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                pattern: ["$-n","$n"],
                symbol: "¥"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],["周日","周一","周二","周三","周四","周五","周六"],["日","一","二","三","四","五","六"]],
                months: [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]],
                AM: ["上午","上午","上午"],
                PM: ["下午","下午","下午"],
                eras: [{"name":"公元","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/M/d",
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
    }, cultures["zh-CHS"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);