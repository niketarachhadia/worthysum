var path = require('path');

var webpack = require('webpack');

var packageData = require('./package.json');

var minify = process.argv.indexOf('--minify') != -1;
var plugins = [new webpack.DefinePlugin({
					'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
					'process.env.PORT': JSON.stringify(process.env.PORT || '3001')
				})];

var entryV= {
        "server.js": "./server.js"
    }
	
if (minify) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
	entryV= {
        "server.min.js": "./server.js"
    }
}

module.exports = {
    entry: entryV,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name]",
		 libraryTarget: 'commonjs'
    },
    devtool: 'source-map',
	module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel',
          query: {
            presets: ['es2015','react'],
			plugins: ["transform-object-rest-spread"]
          }
        },
		 { test: /\.json$/, loader: 'json-loader' }
      ]
    },
	 plugins: plugins,
	 node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
  },
  externals: [
        /^(?!\.|\/).+/i,
    ]
}
