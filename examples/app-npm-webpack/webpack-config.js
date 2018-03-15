var webpack = require( "webpack" );
var path = require("path");
var CommonsChunkPlugin = require( "webpack/lib/optimize/CommonsChunkPlugin" );
var HtmlWebpackPlugin = require( "html-webpack-plugin" );
var GlobalizePlugin = require( "globalize-webpack-plugin" );

var options = {
	production: process.env.NODE_ENV === 'production',
	globalizeCompiledDataRegex: new RegExp(/^(globalize\-compiled\-data)\-\S+$/),
};

function subLocaleNames (name) {
	return name.replace(options.globalizeCompiledDataRegex, '$1');
}

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
		path: path.join(__dirname, options.production ? "./dist" : "./tmp"),
		publicPath: options.production ? "" : "http://localhost:8080/",
		chunkFilename: '[name].js',
		filename: options.production ? "app.[hash].js" : "app.js"
	},
	resolve: {
		extensions: [ "*", ".js" ]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index-template.html",
			/* filter to a single compiled globalize language
			 * change 'en' to language of choice or remove inject all languages
			 * NOTE: last language will be set language
			 */
			chunks: ['vendor', 'globalize-compiled-data-en', 'main'],
			chunksSortMode: function (c1, c2) {
				var orderedChunks = ['vendor', 'globalize-compiled-data', 'main'];
				var o1 = orderedChunks.indexOf(subLocaleNames(c1.names[0]));
				var o2 = orderedChunks.indexOf(subLocaleNames(c2.names[0]));
				return o1 - o2;
			},
		}),
		new GlobalizePlugin({
			production: options.production,
			developmentLocale: "en",
			supportedLocales: [ "ar", "de", "en", "es", "pt", "ru", "zh" ],
			messages: "messages/[locale].json",
			output: "i18n/[locale].[hash].js"
		})
	].concat( options.production ? [
		new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.[hash].js' }),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	] : [] )
};
