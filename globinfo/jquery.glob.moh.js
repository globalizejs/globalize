(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["moh"] = $.extend(true, {}, en, {
        name: "moh",
        englishName: "Mohawk",
        nativeName: "Kanien'kéha",
        language: "moh",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                groupSizes: [3,0]
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Awentatokentì:ke","Awentataón'ke","Ratironhia'kehronòn:ke","Soséhne","Okaristiiáhne","Ronwaia'tanentaktonhne","Entákta"],
                    namesShort: ["S","M","T","W","T","F","S"]
                },
                months: {
                    names: ["Tsothohrkó:Wa","Enniska","Enniskó:Wa","Onerahtókha","Onerahtohkó:Wa","Ohiari:Ha","Ohiarihkó:Wa","Seskéha","Seskehkó:Wa","Kenténha","Kentenhkó:Wa","Tsothóhrha",""]
                }
            })
        }
    }, cultures["moh"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);