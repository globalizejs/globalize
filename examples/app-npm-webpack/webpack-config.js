var webpack = require( "webpack" );
var CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
var GlobalizePlugin = require( "globalize-webpack-plugin" );
var nopt = require( "nopt" );

var options = nopt({
	production: Boolean
});

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
	debug: !options.production,
	output: {
		path: options.production ? "./dist" : "./tmp",
		publicPath: options.production ? "" : "http://localhost:8080/",
		filename: options.production ? "app.[hash].js" : "app.js"
	},
	resolve: {
		extensions: [ "", ".js" ]
	},
	plugins: [
		new HtmlWebpackPlugin({
			production: options.production,
			template: "./index-template.html"
		}),
		new GlobalizePlugin({
			production: options.production,
			developmentLocale: "en",
			supportedLocales: [ "ar", "de", "en", "es", "pt", "ru", "zh" ],
			messages: "messages/[locale].json",
			output: "i18n/[locale].[hash].js"
		})
	].concat( options.production ? [
		new webpack.optimize.DedupePlugin(),
		new CommonsChunkPlugin( "vendor", "vendor.[hash].js" ),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	] : [] )
};
