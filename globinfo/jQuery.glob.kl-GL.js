(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["kl-GL"] = $.extend(true, {}, invariant, {
        name: "kl-GL",
        englishName: "Greenlandic (Greenland)",
        nativeName: "kalaallisut (Kalaallit Nunaat)",
        numberFormat: {
            ',': ".",
            '.': ",",
            groupSizes: [3,0],
            percent: {
                groupSizes: [3,0],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                groupSizes: [3,0],
                ',': ".",
                '.': ",",
                symbol: "kr."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["sapaat","ataasinngorneq","marlunngorneq","pingasunngorneq","sisamanngorneq","tallimanngorneq","arfininngorneq"],["sap","ata","mar","ping","sis","tal","arf"]],
                months: [["januari","februari","martsi","apriili","maaji","juni","juli","aggusti","septembari","oktobari","novembari","decembari",""],["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","dec",""]],
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