const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PAGESDIR = 'src/'; // where the *.page.js files will start being searched
const JSEXTS = ['.page.js', '.page.jsx'];

/*
const entry = { // points where the bundling process starts
	'Index': './src/Index.page.js',
	'second/Second': './src/pages/second/Second.page.js'
};
const plugins: [ // generate HTML files with JS included
	new HtmlWebPackPlugin({
		chunks: ['Index', 'vendor'], // compiled JS files that will go inside this HTML
		template: 'src/template.html', // webpack relative or absolute path to the template
		filename: 'index.html' // file to write the HTML to, relative to PAGESDIR
	}),
	new HtmlWebPackPlugin({ // for each HTML page
		chunks: ['second/Second', 'vendor'],
		template: 'src/template.html',
		filename: 'second/second.html'
	})
];
*/

let entry = {}; // all JS files where to start the bundling process
let htmlPlugins = []; // all HTML files to be generated

for (const jsPath of enumFiles(PAGESDIR, JSEXTS)) {
	const chunkName = removeExt(jsPath, JSEXTS).substr(PAGESDIR.length); // remove extension and PAGESDIR
	entry[chunkName] = './' + jsPath;

	htmlPlugins.push(
		new HtmlWebPackPlugin({
			chunks: [chunkName, 'vendor'],
			template: 'src/template.html',
			filename: unCapitalizeBaseName(chunkName) + '.html'
		})
	);
}

module.exports = (env, argv) => ({
	entry, // each JS bundling point
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: (argv.mode === 'development') ? '[name].js' : '[name].[hash:8].js'
	},
	devtool: (argv.mode === 'production') ? false : 'eval-source-maps',
	plugins: [
		new MiniCssExtractPlugin({
			filename: (argv.mode === 'development') ? '[name].css' : '[name].[hash:8].css'
		}),
		...(argv.mode === 'development' ? [] : [new CleanWebpackPlugin()]), // clean output directory before building
		...htmlPlugins // each HTML page
	],
	resolve: {
		alias: { // absolute paths available inside the app
			src: path.resolve(__dirname, 'src')
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
						hmr: process.env.NODE_ENV === 'development'
					}
				},
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: {
							localIdentName: (argv.mode === 'development') ? '[path][name]__[local]' : '[hash:base64]'
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
					name: (argv.mode === 'development') ? '[name].[ext]' : '[name].[hash:8].[ext]',
					outputPath: (url, resourcePath, context) => { // where the target file will be placed
						if (argv.mode === 'development') {
							const relativePath = path.relative(context, resourcePath);
							return `/${relativePath}`; // in dev, use the full absolute domain path, since it's always served at localhost:3000 root
						}
						return path.dirname(path.relative(context, resourcePath).substr(PAGESDIR.length)) + '/' + url; // in prod, relative path to actual file dir
					},
					publicPath: (url, resourcePath, context) => { // will be written in the img/src
						if (argv.mode === 'development') {
							const relativePath = path.relative(context, resourcePath);
							return `/${relativePath}`;
						}
						return url; // in prod, just the file name, to it's always relative to current dir
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

function unCapitalizeBaseName(filePath) {
	if (filePath.indexOf('/') === -1) {
		return filePath[0].toLowerCase() + filePath.slice(1);
	}
	return path.dirname(filePath) + '/' + unCapitalizeBaseName(path.basename(filePath));
}
