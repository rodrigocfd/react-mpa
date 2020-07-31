/**
 * Arquivo de configuração do webpack, lido automaticamente pelo NPM.
 * Consome as variáveis de: producao.config.json
 *
 * Subir ambiente em modo de desenvolvimento: npm start
 * Gerar build: npm run build
 */

const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const prodCfg = require('./producao.config.json');

const PAGESDIR = 'src/paginas/'; // onde procurar os arquivos que virarão páginas HTML
const JSEXTS = ['.page.js', '.page.jsx', '.page.ts', '.page.tsx']; // extensões que virarão páginas HTML
const PROXY_SERVER = 'http://localhost:8080'; // onde o Siorg JSF está rodando

/**
 * Arquivos JS que serão pontos de entrada do processo de bundling.
 *
 * const entry = {
 *   'Index': './src/Index.page.js',
 *   'second/Second': './src/pages/second/Second.page.js'
 * };
 */
let entry = {};

/**
 * Todos os arquivos HTML que serão gerados, e que terão JS dentro.
 *
 * const htmlPlugins: [ // este array contém uma entrada para cada página HTML que será gerada
 *   new HtmlWebPackPlugin({
 *     chunks: ['Index', 'vendor'],      // arquivos JS compilados que irão dentro deste HTML, vendor são as dependências externas
 *     template: 'assets/template.html', // caminho absoluto ou relativo para o template HTML
 *     filename: 'index.html'            // arquivo de saída do HTML, relativo a PAGESDIR
 *   }),
 *   new HtmlWebPackPlugin({
 *     chunks: ['second/Second', 'vendor'],
 *     template: 'assets/template.html',
 *     filename: 'second/second.html'
 *   })
 * ];
 */
let htmlPlugins = [];

// Varre o diretório em busca dos JS que virarão páginas HTML,
// e popula entry e htmlPlugins.
for (const jsPath of enumFilesByExt(PAGESDIR, JSEXTS)) {
	const chunkName = removeExt(jsPath, JSEXTS).substr(PAGESDIR.length); // remove extensão e PAGESDIR
	entry[chunkName] = './' + jsPath;

	htmlPlugins.push(
		new HtmlWebPackPlugin({
			chunks: [chunkName, 'vendor'],
			template: 'assets/template.html',
			filename: camelToKebabCase(chunkName) + '.html'
		})
	);
}

// Objeto que contém a configuração do webpack.
module.exports = (env, argv) => ({
	stats: (argv.mode === 'development') ? 'errors-only' : 'normal',
	entry, // todos os pontos de entrada do processo de bundling
	output: {
		path: path.resolve(__dirname, path.parse(prodCfg.baseApp).base), // caminho do diretório de saída
		filename: (argv.mode === 'development')
			? '[name].js'          // em desenvolvimento, usa o nome normal do arquivo .js
			: '[name].[hash:8].js' // em produção, adiciona um hash; útil para evitar cache no navegador
	},
	devtool: (argv.mode === 'production') ? false : 'eval-source-maps',
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{from: 'assets/favicon.png', to: '.'} // favicon movido direto para o diretório raiz
			]
		}),
		new MiniCssExtractPlugin({
			filename: (argv.mode === 'development') ? '[name].css' : '[name].[hash:8].css' // hash também é aplicado nos CSS
		}),
		new HtmlReplaceWebpackPlugin([
			{
				pattern: '@BASE_APP@', // nos HTML, este símbolo será trocado
				replacement: (argv.mode === 'production') ? prodCfg.baseApp : ''
			}
		]),
		...(argv.mode === 'development' ? [] : [new CleanWebpackPlugin()]), // limpa diretório de saída antes de começar
		...htmlPlugins // cada arquivo HTML que será gerado
	],
	resolve: {
		alias: { // caminhos absolutos disponíveis dentro da aplicação, também mapeados no tsconfig.json
			'@assets': path.resolve(__dirname, 'assets'),
			'@comum': path.resolve(__dirname, 'src/comum'),
			'@dto': path.resolve(__dirname, 'src/dto'),
			'@paginas': path.resolve(__dirname, 'src/paginas')
		}
	},
	devServer: {
		watchContentBase: true,
		proxy: {
			[prodCfg.apiRest + '/']: PROXY_SERVER
		}
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/, // o que fazer com os arquivos JS
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
			test: /\.(ts|tsx)$/, // o que fazer com os arquivos TS e TSX
			use: 'ts-loader',
			exclude: /node_modules/,
			resolve: {
				extensions: ['.ts', '.tsx']
			},
		}, {
			test: /\.(css|sass|scss)$/, // o que fazer com os arquivos CSS
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
							localIdentName: (argv.mode === 'development') // nomes das classes CSS gerados via CSS Modules
								? '[path][name]__[local]' // em desenvolvimento, gera um padrão BEM
								: '[hash:base64]'         // em produção, gera um hash
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
			test: /\.(svg|jpg|gif|png)$/, // o que fazer com arquivos de imagem
			exclude: /node_modules/,
			use: [{
				loader: 'file-loader',
				options: {
					name: (argv.mode === 'development') ? '[name].[ext]' : '[name].[hash:8].[ext]',
					outputPath: (url, resourcePath, context) => { // onde ficará o arquivo na saída
						return `assets/${url}`;
					},
					publicPath: (url, resourcePath, context) => { // o que será escrito no <img src="?">
						return (argv.mode === 'development')
							? `/assets/${url}`
							: `${prodCfg.baseApp}/assets/${url}`;
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
					test: /node_modules/, // dependências externas irão dentro de vendor.js
					chunks: "initial",
					name: "vendor",
					enforce: true
				}
			}
		}
	}
});

/**
 * Enumera todos os arquivos com as extensões informadas.
 */
function enumFilesByExt(rootPath, arrExtensions) {
	let filesFound = []; // 'src/pages/second/Second.page.js'

	function enumRecursively(curPath) {
		for (const file of fs.readdirSync(curPath)) { // todos os diretórios e arquivos dentro do diretório, retorna somente o nome
			const fullPath = path.join(curPath, file);

			if (fs.statSync(fullPath).isDirectory()) { // é um diretório
				enumRecursively(fullPath); // recursivamente nos subdiretórios
			} else if (fs.statSync(fullPath).isFile()) { // é um arquivo
				for (const fileExt of arrExtensions) {
					if (fullPath.endsWith(fileExt)) { // arquivo termina com uma das extensões informadas
						filesFound.push(fullPath);
					}
				}
			}
		}
	}

	enumRecursively(rootPath);
	return filesFound;
}

/**
 * Se o arquivo possui alguma das extensões informadas, remove a extensão.
 */
function removeExt(filePath, arrExtensions) {
	for (const ext of arrExtensions) {
		if (filePath.endsWith(ext)) { // arquivo termina com a extensão
			return filePath.substr(0, filePath.length - ext.length);
		}
	}
	return filePath; // o arquivo não termina com nenhuma das extensões informadas
}

/**
 * Converte "algumNome" para "algum-nome".
 */
function camelToKebabCase(name) {
	return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
