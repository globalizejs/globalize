
define({
	proxyPort: 9000,
	proxyUrl: "http://localhost:9000/",
	capabilities: {},
	environments: [
		{ browserName: "internet explorer", version: "11", platform: "Win8",
			name : "globalize"},
		{ browserName: "internet explorer", version: "10", platform: "Windows",
			name : "globalize"},
		{ browserName: "internet explorer", version: "9", platform: "Windows" },
		{ browserName: "firefox", version: "41", platform: ["Windows" ], name : "globalize"}
		{ browserName: "firefox", version: "40", platform: ["Windows" ], name : "globalize"}
		{ browserName: "chrome", version: "45", platform: [ "Windows" ],
			name : "globalize"},
		{ browserName: "chrome", version: "44", platform: [ "Windows" ],
			name : "globalize"},
		{ browserName: "safari", version: "7", platform: [ "mac" ], name : "globalize"},
		{ browserName: "iphone 7.1 simulator", platform: "mac", version: "7.1", deviceName: "iPhone",
			app: "safari", device: "iPhone Simulator", name: "globalize" }

		{ browserName: "android", platform: "Linux", version: "4.1", name : "globalize"},	
	],
	maxConcurrency: 3,
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
	POLL_INTERVAL: 500, // milliseconds
	defaultTimeout: 300000, // 5 minutes
	WAIT_TIMEOUT: 180000, // 3 minutes
	suites: [
		"test/unit/all",
		"test/functional/all"
	],
	unitTestsWaitForReporter: false,
	excludeInstrumentation: /^(?:node_modules|test)\//
});
