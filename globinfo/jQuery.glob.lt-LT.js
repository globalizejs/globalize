(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["lt-LT"] = $.extend(true, {}, invariant, {
        name: "lt-LT",
        englishName: "Lithuanian (Lithuania)",
        nativeName: "lietuvių (Lietuva)",
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
                days: [["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],["Sk","Pr","An","Tr","Kt","Pn","Št"]],
                months: [["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis",""],["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]],
                monthsGenitive: [["sausio","vasario","kovo","balandžio","gegužės","birželio","liepos","rugpjūčio","rugsėjo","spalio","lapkričio","gruodžio",""],["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]],
                AM: "",
                PM: "",
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
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);