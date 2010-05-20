(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["ka"] = $.extend(true, {}, invariant, {
        name: "ka",
        englishName: "Georgian",
        nativeName: "ქართული",
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
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],["კვირა","ორშაბათი","სამშაბათი","ოთხშაბათი","ხუთშაბათი","პარასკევი","შაბათი"],["კ","ო","ს","ო","ხ","პ","შ"]],
                months: [["იანვარი","თებერვალი","მარტი","აპრილი","მაისი","ივნისი","ივლისი","აგვისტო","სექტემბერი","ოქტომბერი","ნოემბერი","დეკემბერი",""],["იან","თებ","მარ","აპრ","მაის","ივნ","ივლ","აგვ","სექ","ოქტ","ნოემ","დეკ",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "yyyy \u0027წლის\u0027 dd MM, dddd",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy \u0027წლის\u0027 dd MM, dddd H:mm",
                    F: "yyyy \u0027წლის\u0027 dd MM, dddd H:mm:ss",
                    M: "dd MM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["ka"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);