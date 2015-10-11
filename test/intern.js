
define({
  proxyPort: 9000,
  proxyUrl: "http://localhost:9000/",
  capabilities: {},
  environments: [
    { browserName: "safari", version: [ "6" ], platform: [ "Mac 10.8" ] },
    { browserName: "chrome", version: [ "45", "44" ] },
    { browserName: "internet explorer", version: [ "11", "10", "9" ] },
    { browserName: "firefox", version: [ "41", "40" ] },
    { browserName: "opera", version: [ "12.16", "12.15" ] },
    { browserName: "iPad", platform: [ "ios" ] },
    { browserName: "iPhone", platform: [ "ios" ] },
    { browserName: "Android", platform: [ "android" ] }
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
