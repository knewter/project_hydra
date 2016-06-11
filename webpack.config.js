const ExtractTextPlugin = require("extract-text-webpack-plugin")
const elmSource = __dirname + '/web/elm'

module.exports = {
  entry: [
    "./web/static/js/app.js",
    "./web/static/css/app.scss",
    "./web/elm/Main.elm"
  ],
  output: {
    path: "./priv/static",
    filename: "js/app.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css!sass?includePaths[]=" + __dirname + "/node_modules"
        )
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack?cwd=' + elmSource
      }
    ],
    noParse: [/\.elm$/]
  },

  plugins: [
    new ExtractTextPlugin("css/app.css")
  ],

  resolve: {
    modulesDirectories: [
      "node_modules",
      __dirname + "/web/static/js"
    ],
    extensions: ['', '.scss', '.css', '.js', '.elm']
  }
}
