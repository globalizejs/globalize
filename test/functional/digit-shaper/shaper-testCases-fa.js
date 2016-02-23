define( [], function() {
	return [ {
		"shape" : "None",
		"textDir" : "ltr",
		"value" : "abc 123",
		"expected" : "abc 123"
	}, {
		"shape" : "None",
		"textDir" : "ltr",
		"value" : "گگ 123",
		"expected" : "گگ 123"
	}, {
		"shape" : "None",
		"textDir" : "rtl",
		"value" : "گگ 123",
		"expected" : "گگ 123"
	}, {
		"shape" : "None",
		"textDir" : "ltr",
		"value" : "گگ  123 abc 123",
		"expected" : "گگ  123 abc 123"
	}, {
		"shape" : "None",
		"textDir" : "ltr",
		"value" : "123",
		"expected" : "123"
	}, {
		"shape" : "None",
		"textDir" : "rtl",
		"value" : "123",
		"expected" : "123"
	}, {
		"shape" : "National",
		"textDir" : "ltr",
		"value" : "abc 123",
		"expected" : "abc ۱۲۳"
	}, {
		"shape" : "National",
		"textDir" : "ltr",
		"value" : "گگ  123",
		"expected" : "گگ  ۱۲۳"
	}, {
		"shape" : "National",
		"textDir" : "rtl",
		"value" : "گگ  123",
		"expected" : "گگ  ۱۲۳"
	}, {
		"shape" : "National",
		"textDir" : "ltr",
		"value" : "گگ  123 abc 123",
		"expected" : "گگ  ۱۲۳ abc ۱۲۳"
	}, {
		"shape" : "National",
		"textDir" : "ltr",
		"value" : "123",
		"expected" : "۱۲۳"
	}, {
		"shape" : "National",
		"textDir" : "rtl",
		"value" : "123",
		"expected" : "۱۲۳"
	},	{
		"shape" : "Contextual",
		"textDir" : "",
		"value" : "abc 123",
		"expected" : "abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "",
		"value" : "گگ  123",
		"expected" : "گگ  ۱۲۳"
	}, {
		"shape" : "Contextual",
		"textDir" : "",
		"value" : "گگ  123 abc 123",
		"expected" : "گگ  ۱۲۳ abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "",
		"value" : "123",
		"expected" : "123"
	},	{
		"shape" : "Contextual",
		"textDir" : "ltr",
		"value" : "abc 123",
		"expected" : "abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "ltr",
		"value" : "گگ  123",
		"expected" : "گگ  ۱۲۳"
	}, {
		"shape" : "Contextual",
		"textDir" : "ltr",
		"value" : "گگ  123 abc 123",
		"expected" : "گگ  ۱۲۳ abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "ltr",
		"value" : "123",
		"expected" : "123"
	},	{
		"shape" : "Contextual",
		"textDir" : "rtl",
		"value" : "abc 123",
		"expected" : "abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "rtl",
		"value" : "گگ  123",
		"expected" : "گگ  ۱۲۳"
	}, {
		"shape" : "Contextual",
		"textDir" : "rtl",
		"value" : "گگ  123 abc 123",
		"expected" : "گگ  ۱۲۳ abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "rtl",
		"value" : "123",
		"expected" : "۱۲۳"
	}];
});