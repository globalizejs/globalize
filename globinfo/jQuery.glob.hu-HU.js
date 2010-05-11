(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["hu-HU"] = $.extend(true, {}, invariant, {
        name: "hu-HU",
        englishName: "Hungarian (Hungary)",
        nativeName: "magyar (Magyarország)",
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
                symbol: "Ft"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["vasárnap","hétfő","kedd","szerda","csütörtök","péntek","szombat"],["V","H","K","Sze","Cs","P","Szo"]],
                months: [["január","február","március","április","május","június","július","augusztus","szeptember","október","november","december",""],["jan.","febr.","márc.","ápr.","máj.","jún.","júl.","aug.","szept.","okt.","nov.","dec.",""]],
                AM: "de.",
                PM: "du.",
                eras: [{"name":"i.sz.","start":null,"offset":0}],
                patterns: {
                    d: "yyyy.MM.dd.",
                    D: "yyyy. MMMM d.",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy. MMMM d. H:mm",
                    F: "yyyy. MMMM d. H:mm:ss",
                    M: "MMMM d.",
                    Y: "yyyy. MMMM"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);