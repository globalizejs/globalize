(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["lt-LT"] = $.extend(true, {}, invariant, {
        name: "lt-LT",
        englishName: "Lithuanian (Lithuania)",
        nativeName: "lietuvių (Lietuva)",
        language: "lt",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "Lt"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],["Sk","Pr","An","Tr","Kt","Pn","Št"],["S","P","A","T","K","Pn","Š"]],
                months: [["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis",""],["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]],
                monthsGenitive: [["sausio","vasario","kovo","balandžio","gegužės","birželio","liepos","rugpjūčio","rugsėjo","spalio","lapkričio","gruodžio",""],["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy.MM.dd",
                    D: "yyyy \u0027m.\u0027 MMMM d \u0027d.\u0027",
                    f: "yyyy \u0027m.\u0027 MMMM d \u0027d.\u0027 HH:mm",
                    F: "yyyy \u0027m.\u0027 MMMM d \u0027d.\u0027 HH:mm:ss",
                    M: "MMMM d \u0027d.\u0027",
                    Y: "yyyy \u0027m.\u0027 MMMM"
                }
            })
        }
    }, cultures["lt-LT"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);