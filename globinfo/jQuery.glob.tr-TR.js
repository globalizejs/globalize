(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["tr-TR"] = $.extend(true, {}, invariant, {
        name: "tr-TR",
        englishName: "Turkish (Turkey)",
        nativeName: "Türkçe (Türkiye)",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-%n","%n"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "TL"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],["Pz","Pt","Sa","Ça","Pe","Cu","Ct"]],
                months: [["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",""],["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dd MMMM yyyy dddd",
                    f: "dd MMMM yyyy dddd HH:mm",
                    F: "dd MMMM yyyy dddd HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);