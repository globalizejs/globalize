var path = require('path');
var webpack = require( "webpack" );
var CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
var GlobalizePlugin = require( "globalize-webpack-plugin" );

var options = {
	production: (process.env.NODE_ENV === "production"),
	chunks: [
		"vendor",
		"globalize-compiled-data-en",
		"main"
	]
};

module.exports = {
	entry: options.production ?  {
		main: "./app/index.js",
		vendor: [
			"globalize",
			"globalize/dist/globalize-runtime/number",
			"globalize/dist/globalize-runtime/currency",
			"globalize/dist/globalize-runtime/date",
			"globalize/dist/globalize-runtime/message",
			"globalize/dist/globalize-runtime/plural",
			"globalize/dist/globalize-runtime/relative-time",
			"globalize/dist/globalize-runtime/unit"
		]
	} : "./app/index.js",
	output: {
		path: path.resolve(__dirname, options.production ? "./dist" : "./tmp"),
		publicPath: options.production ? "" : "http://localhost:8080/",
		filename: options.production ? "[name].[chunkhash].js" : "app.js"
	},
	resolve: {
		extensions: [ "*", ".js" ]
	},
	plugins: [
		new HtmlWebpackPlugin({
			production: options.production,
			template: "./index-template.html",

			// FIXME: These 2 options are a workaround to insert i18n/[locale].[hash].js files at right spot just before main.[hash].js
			chunks: options.chunks,
			chunksSortMode: function (chunk1, chunk2) {
				const order1 = options.chunks.indexOf(chunk1.names[0]);
				const order2 = options.chunks.indexOf(chunk2.names[0]);

				if (order1 > order2) {
					return 1;
				}
				if (order1 < order2) {
					return -1;
				}
				return 0;
			}
		}),
		new GlobalizePlugin({
			production: options.production,
			developmentLocale: "en",
			supportedLocales: [ "ar", "de", "en", "es", "pt", "ru", "zh" ],
			messages: "messages/[locale].json",
			output: "i18n/[locale].[hash].js"
		})
	].concat( options.production ? [
		new CommonsChunkPlugin("vendor"),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	] : [] )
};
