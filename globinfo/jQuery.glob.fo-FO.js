(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["fo-FO"] = $.extend(true, {}, invariant, {
        name: "fo-FO",
        englishName: "Faroese (Faroe Islands)",
        nativeName: "føroyskt (Føroyar)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': ".",
                '.': ",",
                symbol: "kr."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["sunnudagur","mánadagur","týsdagur","mikudagur","hósdagur","fríggjadagur","leygardagur"],["sun","mán","týs","mik","hós","frí","leyg"]],
                months: [["januar","februar","mars","apríl","mai","juni","juli","august","september","oktober","november","desember",""],["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "dd-MM-yyyy",
                    D: "d. MMMM yyyy",
                    f: "d. MMMM yyyy HH:mm",
                    F: "d. MMMM yyyy HH:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);