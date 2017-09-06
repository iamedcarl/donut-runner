module.exports = {
  entry: "./lib/donut_runner.js",
  output: {
    filename: "./lib/bundle.js"
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*']
  }
};
