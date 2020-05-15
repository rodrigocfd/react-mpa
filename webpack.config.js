const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const prodCfg = require('./producao.config.json');

const PAGESDIR = 'src/'; // where the *.page.js files will start being searched
const JSEXTS = ['.page.js', '.page.jsx'];
const PROXY_SERVER = 'http://localhost:8080';

/*
const entry = { // points where the bundling process starts
	'Index': './src/Index.page.js',
	'second/Second': './src/pages/second/Second.page.js'
};
const plugins: [ // generate HTML files with JS included
	new HtmlWebPackPlugin({
		chunks: ['Index', 'vendor'], // compiled JS files that will go inside this HTML
		template: 'assets/template.html', // webpack relative or absolute path to the template
		filename: 'index.html' // file to write the HTML to, relative to PAGESDIR
	}),
	new HtmlWebPackPlugin({ // for each HTML page
		chunks: ['second/Second', 'vendor'],
		template: 'assets/template.html',
		filename: 'second/second.html'
	})
];
*/

let entry = {}; // all JS files where to start the bundling process
let htmlPlugins = []; // all HTML files to be generated

for (const jsPath of enumFiles(PAGESDIR, JSEXTS)) {
	const chunkName = removeExt(jsPath, JSEXTS).substr(PAGESDIR.length); // remove extension and PAGESDIR
	entry[chunkName] = './' + jsPath; // new chunk entry

	htmlPlugins.push( // new html plugin entry
		new HtmlWebPackPlugin({
			chunks: [chunkName, 'vendor'],
			template: 'assets/template.html',
			filename: camelToKebabCase(chunkName) + '.html'
		})
	);
}

module.exports = (env, argv) => ({
	stats: isDev(argv) ? 'errors-only' : 'normal',
	entry, // each JS bundling point
	output: {
		path: path.resolve(__dirname, 'build'), // vai gerar um diretório "build"
		filename: isDev(argv) ? '[name].js' : '[name].[hash:8].js'
	},
	devtool: isDev(argv) ? 'eval-source-maps' : false,
	plugins: [
		new CopyWebpackPlugin([ // simple copy of files
			{ from: 'assets/favicon.png', to: '.' }
		]),
		new MiniCssExtractPlugin({
			filename: isDev(argv) ? '[name].css' : '[name].[hash:8].css'
		}),
		new HtmlReplaceWebpackPlugin([ // replaces strings in all HTML files
			{
				pattern: '@BASE_APP@',
				replacement: isDev(argv) ? '' : prodCfg.baseApp
			}
		]),
		...(isDev(argv) ? [] : [new CleanWebpackPlugin()]), // clean output directory before building
		...htmlPlugins // each HTML page
	],
	resolve: {
		alias: { // absolute paths available inside the app
			src: path.resolve(__dirname, 'src')
		}
	},
	devServer: {
		proxy: {
			[prodCfg.apiRest]: PROXY_SERVER
		}
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			resolve: {
				extensions: ['.js', '.jsx']
			},
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					]
				}
			}
		}, {
			test: /\.(css|sass|scss)$/,
			exclude: /node_modules/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: {
						hmr: isDev(argv)
					}
				},
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: {
							localIdentName: isDev(argv) ? '[path][name]__[local]' : '[hash:base64]'
						}
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sassOptions: {
							fiber: false,
						},
					}
				}
			],
			exclude: /node_modules/,
		}, {
			test: /\.(svg|jpg|gif|png)$/,
			exclude: /node_modules/,
			use: [{
				loader: 'file-loader',
				options: {
					name: isDev(argv) ? '[name].[ext]' : '[name].[hash:8].[ext]',
					outputPath: (url, resourcePath, context) => { // where the target file will be placed
						let relativePath = path.relative(context, resourcePath);
						if (!isDev(argv)) {
							relativePath = relativePath.substr(PAGESDIR.length); // remove o 'src/'
						}
						return `/${relativePath}`; // absolute domain path
					},
					publicPath: (url, resourcePath, context) => { // will be written in the img/src
						let relativePath = path.relative(context, resourcePath);
						if (!isDev(argv)) {
							relativePath = relativePath.substr(PAGESDIR.length); // remove o 'src/'
						}
						return isDev(argv)
							? `/${relativePath}` // absolute domain path
							: path.join(prodCfg.baseApp, `/${relativePath}`); // absolute domain path with baseUrl prefix
					}
				}
			}]
		}]
	},
	optimization: {
		minimizer: [
			new TerserJSPlugin({ extractComments: false }),
			new OptimizeCSSAssetsPlugin()
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/, // all dependencies will be placed in vendor.js file, instead of embedded in each generated JS
					chunks: "initial",
					name: "vendor",
					enforce: true
				}
			}
		}
	}
});

function isDev(argv) {
	return argv.mode === 'development'; // passed in package.json
}

function enumFiles(rootPath, fileExts) {
	let ret = []; // 'src/pages/second/Second.page.js'

	function enumRecursively(curPath) {
		for (const file of fs.readdirSync(curPath)) { // all files and folders within the directory, returns name only
			const fullPath = path.join(curPath, file);

			if (fs.statSync(fullPath).isDirectory()) {
				enumRecursively(fullPath); // recursively within subdirectories
			} else if (fs.statSync(fullPath).isFile()) {
				for (const fileExt of fileExts) {
					if (fullPath.endsWith(fileExt)) {
						ret.push(fullPath);
					}
				}
			}
		}
	}

	enumRecursively(rootPath);
	return ret;
}

function removeExt(filePath, possibleExts) {
	for (const ext of possibleExts) {
		if (filePath.endsWith(ext)) {
			return filePath.substr(0, filePath.length - ext.length);
		}
	}
	return filePath; // none of the extensions found
}

function camelToKebabCase(name) {
	return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
