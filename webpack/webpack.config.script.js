// Libraries
const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

// Files

// Configuration
module.exports = env => {
	return {
		context: path.resolve(__dirname, '../src'),
		entry: {
			app: './app.js'
		},
		output: {
			path: path.resolve(__dirname, '../dist'),
			publicPath: '',
			filename: 'assets/[name].js'
		},
		devtool: (env.NODE_ENV === 'development') ? 'source-map' : false,
		resolve: {
			modules: [path.resolve(__dirname, '../src'), 'node_modules'],
			extensions: ['.js', '.css', '.scss'],
			alias: {
				Images: path.resolve(__dirname, '../src/assets/images'), // Relative path of images
				Styles: path.resolve(__dirname, '../src/assets/styles'), // Relative path of styles
				Scripts: path.resolve(__dirname, '../src/assets/scripts'), // Relative path of scripts
			}
		},

		module: {
			rules: [
				{
					test: /\.json$/,
					loader: 'json-loader'
				},
				{
					test: /\.js$/,
					exclude: [/node_modules/],
					use: [
						{
							loader: 'babel-loader',
							options: {presets: ['@babel/preset-env']}
						}
					]
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								sourceMap: true
							},
						},
					],
				},
				{
					test: /\.scss$/,
					use: [
						'style-loader',
						{loader: 'css-loader', options: {importLoaders: 1, sourceMap: true}},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									importer: globImporter()
								},
								webpackImporter: true
							}
						}
					]
				},
				{
					test: /\.pug$/,
					use: [
						'pug-loader',
						{
							loader: 'pug-html-loader',
							options: {
								data: {
									menu: require('../src/views/data/menu.json'),
									index: require('../src/views/data/index.json'),
								}
							}
						}
					]
				},
				{
					test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: 3000,
								name: 'assets/images/[name].[hash:7].[ext]'
							}
						}
					]
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					loader: 'url-loader',
					options: {
						limit: 5000,
						name: 'assets/fonts/[name].[hash:7].[ext]'
					}
				},
				{
					test: /\.(mp4)(\?.*)?$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'assets/videos/[name].[hash:7].[ext]'
					}
				}
			]
		},

		performance: {
			hints: false,
			maxEntrypointSize: 512000,
			maxAssetSize: 512000
		},
		/*
      Loaders with configurations
    */
		optimization: {
			minimizer: [
				new TerserPlugin({
					cache: true,
					parallel: true,
					sourceMap: true,
				}),
			],
			splitChunks: {
				cacheGroups: {
					default: false,
					vendors: false,
					// vendor chunk
					vendor: {
						filename: 'assets/vendor.js',
						// sync + async chunks
						chunks: 'all',
						// import file path containing node_modules
						test: /node_modules/
					},
				}
			}
		},

		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.$': 'jquery',
				'window.jQuery': 'jquery'
			}),

			new WebpackNotifierPlugin({
				title: 'Noob__ui',
				contentImage: path.join(__dirname, '../src/assets/images/logo.png'),
			}),
		]
	};
};
