(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["tr-TR"] = $.extend(true, {}, en, {
        name: "tr-TR",
        englishName: "Turkish (Turkey)",
        nativeName: "Türkçe (Türkiye)",
        language: "tr",
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
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],
                    namesAbbr: ["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],
                    namesShort: ["Pz","Pt","Sa","Ça","Pe","Cu","Ct"]
                },
                months: {
                    names: ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık",""],
                    namesAbbr: ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "dd MMMM yyyy dddd",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "dd MMMM yyyy dddd HH:mm",
                    F: "dd MMMM yyyy dddd HH:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["tr-TR"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);