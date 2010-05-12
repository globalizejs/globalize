(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["zh-SG"] = $.extend(true, {}, invariant, {
        name: "zh-SG",
        englishName: "Chinese (Simplified, Singapore)",
        nativeName: "中文(新加坡)",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],["周日","周一","周二","周三","周四","周五","周六"],["日","一","二","三","四","五","六"]],
                months: [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]],
                patterns: {
                    d: "d/M/yyyy",
                    D: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027",
                    t: "tt h:mm",
                    T: "tt h:mm:ss",
                    f: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 tt h:mm",
                    F: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 tt h:mm:ss",
                    M: "M\u0027月\u0027d\u0027日\u0027",
                    Y: "yyyy\u0027年\u0027M\u0027月\u0027"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);