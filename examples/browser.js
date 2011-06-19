(function( $ ) {

$(function() {

    // setup sample data
    window.numbers = [
       0, 1, 10, 100, 1000, 10000, 0.1, 0.12, 0.123, 0.1234, 0.12345, 1000.123, 10000.12345,
          -1, -10, -100, -1000, -10000, -0.1, -0.12, -0.123, -0.1234, -0.12345, -1000.123, -10000.12345
    ];
    window.formats = [
       "n", "n1", "n3", "d", "d2", "d3", "p", "p1", "p3", "c", "c0"
    ];
    window.dates = $.map([
        "Jan 1, 1970 1:34 PM", "Dec 31, 1970 1:34 PM", "Apr 1, 1999 1:34 PM", "Dec 31, 1999 1:34 PM", "Jan 1, 2000 1:34 PM", "Nov 5, 1955 1:34 PM"
    ], function(d) { return d instanceof Date ? d : new Date(Date.parse(d)); } );

    window.dateFormats = [
        "d", "D", "f", "F", "M", "S", "t", "T", "Y"
    ];

    // add template extensions to format numbers and dates declaratively
    $.extend( $.tmplcmd, {
        demoFormat: {
            _default: [0,0],
            prefix: "_.push(Globalize.format(numbers[$2],formats[$1]));"
        },
        demoDateFormat: {
            _default: [0,0],
            prefix: "_.push(Globalize.format(dates[$2],typeof $1 === 'number' ? dateFormats[$1] : $1));"
        }
    });

    // activate tabs
    $(".tab").click(function() {
        $(".active").removeClass("active").addClass("inactive");
        $("#" + this.id + "content").removeClass("inactive").addClass("active");
        $(this).removeClass("inactive").addClass("active");
    });

    // fill cultures dropdown with the available cultures
    $.each(sortByName(Globalize.cultures), function(i, culture) {
        $("<option/>", {
            value: culture.name,
            text: culture.name + ": " + culture.englishName + " (" + culture.nativeName + ")"
        }).appendTo("#cultures");
    });

    // re-render templates after selecting a culture
    $("#cultures").bind("change keyup", selectCulture)
        // set default culture to Japanese in Japan
        .val("ja-JP");

    // re-render templates after selecting a calendar
    var calendars = $("#calendars").bind("change keyup", function() {
        Globalize.culture().calendar = Globalize.culture().calendars[calendars.val()] || Globalize.culture().calendars.standard;
        render();
    });

    $("#parseDate").change(function() {
        $("#parseDateResult").text(Globalize.parseDate($(this).val()).toString());
    });
    $("#parseNumber").change(function() {
        $("#parseNumberResult").text(Globalize.parseFloat($(this).val()).toString());
    });

    function sortByName(map) {
        // converts a dictionary into a sorted dictionary based on obj.name
        var arr = [];
        $.each(map, function(name, value) {
            arr.push(value);
        });
        arr.sort(function(a, b) {
            return a.name < b.name ? -1 : 1;
        });
        return arr;
    }

    function selectCulture() {
        // sets the current culture to the value specified in the cultures dropdown,
        // populates the calendars dropdown with that cultures calendars,
        // and renders the formatting templates.
        Globalize.culture($("#cultures").val());

        calendars.empty();
        $.each(sortByName(Globalize.culture().calendars), function(i, cal) {
            $("<option/>", { value: cal.name, text: cal.name }).appendTo(calendars);
        });
        calendars.val(Globalize.culture().calendar.name);

        render();
    }

    function render() {
        $("#dateformat").empty();
        $("#dateformattmpl").render({}).appendTo("#dateformat");

        $("#format").empty();
        $("#formattmpl").render({}).appendTo("#format");

        $("#englishName").text(Globalize.culture().englishName);
        $("#nativeName").text(Globalize.culture().nativeName);
        $("#isRTL").text(Globalize.culture().isRTL ? "YES" : "no");

        $("#infonumber").empty();
        $("#infonumbertmpl").render(Globalize.culture().numberFormat).appendTo("#infonumber");

        $("#infodate").empty();
        $("#infodatetmpl").render(Globalize.culture().calendar).appendTo("#infodate");
    }

    // initial rendering
    selectCulture();
});

}( jQuery ));
