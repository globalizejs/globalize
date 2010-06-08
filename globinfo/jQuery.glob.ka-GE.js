(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["ka-GE"] = $.extend(true, {}, en, {
        name: "ka-GE",
        englishName: "Georgian (Georgia)",
        nativeName: "ქართული (საქართველო)",
        language: "ka",
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
                symbol: "Lari"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
                    namesAbbr: ["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],
                    namesShort: ["კ","ო","ს","ო","ხ","პ","შ"]
                },
                months: {
                    names: ["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი",""],
                    namesAbbr: ["იან","თებ","მარ","აპრ","მაის","ივნ","ივლ","აგვ","სექ","ოქტ","ნოემ","დეკ",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "yyyy 'წლის' dd MM, dddd",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy 'წლის' dd MM, dddd H:mm",
                    F: "yyyy 'წლის' dd MM, dddd H:mm:ss",
                    M: "dd MM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["ka-GE"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);