module.exports = {
	entry: './app/app.js',
	output: {
		filename: "bundle.js",
		path: __dirname + "/public"
	},
	devtool: "source-map",
	resolve: {
        alias: {
            Card: 'app/components/Card.js',
            applicationStyles: 'app/styles/app.scss'
        }
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		}, {
			enforce: "pre", test: /\.js$/, loader: "source-map-loader"
		}, {
			test: /\.scss$/,
			use: ["style-loader", "css-loader", "sass-loader"]
		}]
	}
};