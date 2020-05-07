const fs = require('fs');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const pagesDir = path.join('src', 'pages', path.sep); // 'src/pages/'

const entry = filesFromDir(pagesDir, ['.js', '.jsx']).reduce((obj, jsPath) => { // all JS files in src/pages and nested
	const pageName = jsPath.replace(path.extname(jsPath), '').replace(pagesDir, ''); // remove extension and path
	obj[pageName] = `./${jsPath}`;
	console.log(`./${jsPath}`);
	return obj;
}, {});

const htmlPlugins = filesFromDir(pagesDir, ['.html']).map(htmlPath => { // all HTML files in src/pages and nested
	const fileName = htmlPath.replace(pagesDir, ''); // remove path
	return new HtmlWebPackPlugin({
		chunks: [fileName.replace(path.extname(fileName), ''), 'vendor'], // remove extension
		template: htmlPath,
		filename: fileName
	});
});

/*
entry: {
	'index': './src/index.jsx',
	'second/second': './src/pages/second/second.jsx'
},
plugins: [
	new HtmlWebPackPlugin({
		chunks: ['index', 'vendor'],
		template: 'src/pages/index.html',
		filename: 'index.html'
	}),
	new HtmlWebPackPlugin({ // for each HTML page
		chunks: ['second', 'vendor'],
		template: 'src/pages/second/second.html',
		filename: 'second.html'
	})
]
*/

module.exports = (env, argv) => ({
	entry,
	output: {
		path: path.resolve(__dirname, 'deploy'),
		filename: '[name].[hash:8].js'
	},
	devtool: argv.mode === 'production' ? false : 'eval-source-maps',
	plugins: [
		new MiniCssExtractPlugin({ filename: '[name].[hash:8].css' }),
		new CleanWebpackPlugin(),
		...htmlPlugins
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
					outputPath: (url, resourcePath, context) => {
						if (argv.mode === 'development') {
							const relativePath = path.relative(context, resourcePath);
							return `/${relativePath}`;
						}
						return path.dirname(path.relative(context, resourcePath).substr(pagesDir.length)) + '/' + url; // same dev directory
					},
					publicPath: (url, resourcePath, context) => {
						if (argv.mode === 'development') {
							const relativePath = path.relative(context, resourcePath);
							return `/${relativePath}`;
						}
						return url;
					}
				}
			}]
		}, {
			test: /\.(woff|woff2|eot|ttf|otf)$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: (argv.mode === 'development') ? '[name].[ext]' : '[name].[hash:8].[ext]',
					outputPath: (url, resourcePath, context) => {
						if (argv.mode === 'development') {
							const relativePath = path.relative(context, resourcePath);
							return `/${relativePath}`;
						}
						return `/assets/fonts/${path.basename(resourcePath)}`;
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
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					enforce: true
				}
			}
		}
	}
});

function filesFromDir(dir, fileExts) {
	const filesToReturn = [];

	function walkDir(currentPath) {
		const files = fs.readdirSync(currentPath);
		for (let i in files) {
			const curFile = path.join(currentPath, files[i]);
			if (fs.statSync(curFile).isFile() && fileExts.indexOf(path.extname(curFile)) != -1) {
				filesToReturn.push(curFile);
			} else if (fs.statSync(curFile).isDirectory()) {
				walkDir(curFile); // recursively within subdirectories
			}
		}
	}

	walkDir(dir);
	return filesToReturn;
}
