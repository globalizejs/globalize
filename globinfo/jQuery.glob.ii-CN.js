(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["ii-CN"] = $.extend(true, {}, invariant, {
        name: "ii-CN",
        englishName: "Yi (PRC)",
        nativeName: "ꆈꌠꁱꂷ (ꍏꉸꏓꂱꇭꉼꇩ)",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,0]
            },
            currency: {
                pattern: ["$-n","$n"],
                symbol: "¥"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["ꑭꆏꑍ","ꆏꊂ꒔","ꆏꊂꑍ","ꆏꊂꌕ","ꆏꊂꇖ","ꆏꊂꉬ","ꆏꊂꃘ"],["ꑭꆏ","ꆏ꒔","ꆏꑍ","ꆏꌕ","ꆏꇖ","ꆏꉬ","ꆏꃘ"],["ꆏ","꒔","ꑍ","ꌕ","ꇖ","ꉬ","ꃘ"]],
                months: [["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""],["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""]],
                AM: ["ꂵꆪꈌꈐ","ꂵꆪꈌꈐ","ꂵꆪꈌꈐ"],
                PM: ["ꂵꆪꈌꉈ","ꂵꆪꈌꉈ","ꂵꆪꈌꉈ"],
                eras: [{"name":"ꇬꑼ","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy\u0027ꈎ\u0027 M\u0027ꆪ\u0027 d\u0027ꑍ\u0027",
                    t: "tt h:mm",
                    T: "H:mm:ss",
                    f: "yyyy\u0027ꈎ\u0027 M\u0027ꆪ\u0027 d\u0027ꑍ\u0027 tt h:mm",
                    F: "yyyy\u0027ꈎ\u0027 M\u0027ꆪ\u0027 d\u0027ꑍ\u0027 H:mm:ss",
                    M: "M\u0027ꆪ\u0027 d\u0027ꑍ\u0027",
                    Y: "yyyy\u0027ꈎ\u0027 M\u0027ꆪ\u0027"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);