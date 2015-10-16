
define({
	proxyPort: 9000,
	proxyUrl: "http://localhost:9000/",
	capabilities: {},
	environments: [
	    { browserName: "internet explorer", version: "11", platform: "WINDOWS" },
        { browserName: "internet explorer", version: "10", platform: "WINDOWS" },
        { browserName: "internet explorer", version: "9",  platform: "WINDOWS" },
        { browserName: "firefox", version: [ "41", "40" ], platform: "WINDOWS" },
        { browserName: "chrome", version: ["45", "44"], platform: "WINDOWS" },
        { browserName: "safari", version: "6",  platform: "MAC" },
        { browserName: "safari", version: "7",  platform: "MAC" }
	],
	maxConcurrency: 2,
	tunnel: "BrowserStackTunnel",
	loaders: {
		"host-node": "requirejs",
		"host-browser": "external/requirejs/require.js"
	},
	loaderOptions: {
		waitSeconds: 8,
		paths: {
			qunit: "external/qunit/qunit/qunit",
			cldr: "external/cldrjs/dist/cldr",
			"cldr-data": "external/cldr-data",
			globalize: "dist/globalize",
			json: "external/requirejs-plugins/src/json",
			src: "src",
			text: "external/requirejs-text/text"
		}
	},
	suites: [
		"test/unit/all",
		"test/functional/all"
	],
	unitTestsWaitForReporter: false,
	excludeInstrumentation: /^(?:node_modules|test)\//
});
