"use strict";

const webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");

const plugins = [
	new CompressionPlugin({
		asset: "[path].gz[query]",
		algorithm: "gzip",
		test: /\.js$|\.html$/,
		threshold: 10240,
		minRatio: 0.8
	})
];
if (process.env.PRODUCTION === "TRUE") {
	plugins.unshift(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			screw_ie8: true
		},
		mangle: {
			screw_ie8: true
		},
		sourceMap: true,
	}));
}

module.exports = {
	context: __dirname + "/src",
	entry: "./index",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	plugins: plugins,
	devtool: "source-map"
};
