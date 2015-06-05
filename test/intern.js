
define({
  proxyPort: 9000,
  proxyUrl: "http://localhost:9000/",
  capabilities: {},
  environments: [
    { browserName: "chrome" },
    { browserName: "internet explorer", version: [ "11", "10", "9" ] },
    { browserName: "firefox" }
  ],
  maxConcurrency: 2,
  tunnel: "BrowserStackTunnel",
  loaders: {
    "host-node": "requirejs",
    "host-browser": "external/requirejs/require.js"
  },
  loaderOptions: {
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
  excludeInstrumentation: /^(?:node_modules|test)\//
});
