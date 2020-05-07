// https://itnext.io/building-multi-page-application-with-react-f5a338489694

const fs = require('fs');
const path = require('path');
const htmlWebPackPlugin = require('html-webpack-plugin');

const pagesDir = path.join('src', 'pages', path.sep); // src/pages

const entry = filesFromDir(pagesDir, ['.js']).reduce((obj, jsPath) => { // all JS files in src/pages
	const pageName = jsPath.replace(path.extname(jsPath), '').replace(pagesDir, ''); // remove extension and path
	obj[pageName] = `./${jsPath}`;
	return obj;
}, {});

const htmlPlugins = filesFromDir(pagesDir, ['.html']).map(htmlPath => { // all HTML files in src/pages
	const fileName = htmlPath.replace(pagesDir, ''); // remove path
	return new htmlWebPackPlugin({
		chunks: [fileName.replace(path.extname(fileName), ''), 'vendor'], // remove extension
		template: htmlPath,
		filename: fileName
	});
});

module.exports = {
	entry,
	plugins: [...htmlPlugins],
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
			components: path.resolve(__dirname, 'src', 'components')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'@babel/preset-env',
						'@babel/preset-react'
					]
				}
			}
		}]
	},
	optimization: {
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
	},
	output: {
		path: path.resolve(__dirname, 'deploy')
	}
};

function filesFromDir(dir, fileExts) {
	const filesToReturn = [];

	function walkDir(currentPath) {
		const files = fs.readdirSync(currentPath);
		for (let i in files) {
			const curFile = path.join(currentPath, files[i]);
			if (fs.statSync(curFile).isFile() && fileExts.indexOf(path.extname(curFile)) != -1) {
				filesToReturn.push(curFile);
			} else if (fs.statSync(curFile).isDirectory()) {
				walkDir(curFile);
			}
		}
	}

	walkDir(dir);
	return filesToReturn;
}
