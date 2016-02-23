define( [], function() {
	return [ {
		"shape" : "None",
		"textDir" : "ltr",
		"value" : "abc 123",
		"expected" : "abc 123"
	}, {
		"shape" : "None",
		"textDir" : "ltr",
		"value" : "اول 123",
		"expected" : "اول 123"
	}, {
		"shape" : "None",
		"textDir" : "rtl",
		"value" : "اول 123",
		"expected" : "اول 123"
	}, {
		"shape" : "None",
		"textDir" : "ltr",
		"value" : "اول 123 abc 123",
		"expected" : "اول 123 abc 123"
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
		"expected" : "abc ١٢٣"
	}, {
		"shape" : "National",
		"textDir" : "ltr",
		"value" : "اول 123",
		"expected" : "اول ١٢٣"
	}, {
		"shape" : "National",
		"textDir" : "rtl",
		"value" : "اول 123",
		"expected" : "اول ١٢٣"
	}, {
		"shape" : "National",
		"textDir" : "ltr",
		"value" : "اول 123 abc 123",
		"expected" : "اول ١٢٣ abc ١٢٣"
	}, {
		"shape" : "National",
		"textDir" : "ltr",
		"value" : "123",
		"expected" : "١٢٣"
	}, {
		"shape" : "National",
		"textDir" : "rtl",
		"value" : "123",
		"expected" : "١٢٣"
	},	{
		"shape" : "Contextual",
		"textDir" : "",
		"value" : "abc 123",
		"expected" : "abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "",
		"value" : "اول 123",
		"expected" : "اول ١٢٣"
	}, {
		"shape" : "Contextual",
		"textDir" : "",
		"value" : "اول 123 abc 123",
		"expected" : "اول ١٢٣ abc 123"
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
		"value" : "اول 123",
		"expected" : "اول ١٢٣"
	}, {
		"shape" : "Contextual",
		"textDir" : "ltr",
		"value" : "اول 123 abc 123",
		"expected" : "اول ١٢٣ abc 123"
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
		"value" : "اول 123",
		"expected" : "اول ١٢٣"
	}, {
		"shape" : "Contextual",
		"textDir" : "rtl",
		"value" : "اول 123 abc 123",
		"expected" : "اول ١٢٣ abc 123"
	}, {
		"shape" : "Contextual",
		"textDir" : "rtl",
		"value" : "123",
		"expected" : "١٢٣"
	}];
});