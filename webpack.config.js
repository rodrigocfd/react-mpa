const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pagesDir = path.join('src', 'pages', path.sep); // 'src/pages/'

// All JS files where to start the application bundling process.
const entry = filesFromDir(pagesDir, ['.js', '.jsx']).reduce((obj, jsPath) => { // all JS files in src/pages and nested
	const pageName = jsPath.replace(path.extname(jsPath), '').replace(pagesDir, ''); // remove extension and path
	obj[pageName] = `./${jsPath}`;
	return obj;
}, {});

// All HTML files that will become server pages.
const htmlPlugins = filesFromDir(pagesDir, ['.html']).map(htmlPath => { // all HTML files in src/pages and nested
	const fileName = htmlPath.replace(pagesDir, ''); // remove path
	return new HtmlWebPackPlugin({
		chunks: [fileName.replace(path.extname(fileName), ''), 'vendor'], // remove extension
		template: htmlPath,
		filename: fileName
	});
});

/*
entry: { // points where the bundling process starts
	'index': './src/index.jsx',
	'second/second': './src/pages/second/second.jsx'
},
plugins: [ // generate HTML files with JS included
	new HtmlWebPackPlugin({
		chunks: ['index', 'vendor'],
		template: 'src/pages/index.html', // webpack relative or absolute path to the template
		filename: 'index.html' // file to write the HTML to
	}),
	new HtmlWebPackPlugin({ // for each HTML page
		chunks: ['second', 'vendor'],
		template: 'src/pages/second/second.html',
		filename: 'second.html'
	})
]
*/

module.exports = (env, argv) => ({
	entry, // each JS bundling point
	output: {
		path: path.resolve(__dirname, 'deploy'),
		filename: (argv.mode === 'development') ? '[name].js' : '[name].[hash:8].js'
	},
	devtool: (argv.mode === 'production') ? false : 'eval-source-maps',
	plugins: [
		new MiniCssExtractPlugin({
			filename: (argv.mode === 'development') ? '[name].css' : '[name].[hash:8].css'
		}),
		new CleanWebpackPlugin(), // clean output directory before building
		...htmlPlugins // each HTML page
	],
	resolve: {
		alias: { // absolute paths available inside the app
			src: path.resolve(__dirname, 'src'),
			components: path.resolve(__dirname, 'src', 'components')
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
			test: /\.css$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						importLoaders: 1,
						modules: true
					}
				}
			],
			exclude: /node_modules/,
		}, {
			test: /\.(svg|jpg|gif|png)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: (argv.mode === 'development') ? '[name].[ext]' : '[name].[hash:8].[ext]',
					outputPath: (url, resourcePath, context) => { // where the target file will be placed
						if (argv.mode === 'development') {
							const relativePath = path.relative(context, resourcePath);
							return `/${relativePath}`; // in dev, use the full absolute domain path, since it's always served at localhost:3000 root
						}
						return path.dirname(path.relative(context, resourcePath).substr(pagesDir.length)) + '/' + url; // in prod, relative path to actual dir
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

function filesFromDir(dir, fileExts) {
	let filesToReturn = [];let uwu=[];

	function walkDir(currentPath) {
		for (const file of fs.readdirSync(currentPath)) { // all files and folders within the directory, returns name only
			const fullPath = path.join(currentPath, file);

			if (fs.statSync(fullPath).isDirectory()) {
				walkDir(fullPath); // recursively within subdirectories
			} else if (fs.statSync(fullPath).isFile()) {
				for (const fileExt of fileExts) {
					if (fullPath.endsWith(fileExt)) {
						filesToReturn.push(fullPath); // full path to file
					}
				}
			}
		}
	}

	walkDir(dir);
	return filesToReturn;
}
