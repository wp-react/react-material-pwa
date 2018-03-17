/**
 * Created by brsmith on 7/3/17.
 */
const path = require('path')
const webpack =  require('webpack')
var WebpackStrip = require('webpack-strip')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const ENV = require('./env').default


module.exports = {
    mode: 'development', 
    context: __dirname + '/src',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': ENV
        }),
        new WebpackAssetsManifest({
            output: '../public/asset-manifest.json',
            merge: true
          })
    ],

    entry: {
        javascript: './index.js'
       // html: '../public/index.html'
    },

    output: {
        filename: 'app.js',
        path: __dirname + '/public/js'
    },

    devServer: {
        contentBase: 'public'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.join(__dirname, "/src/"),
            "node_modules"
        ]

    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
              loader: 'babel-loader',
                options: {
                    presets: ["es2015", "stage-2", "stage-3", "react"],
                    plugins: ["transform-object-rest-spread", "transform-class-properties"]
                },
            }],
        }, {
            test: /\.js$/,
            use: ['react-hot-loader/webpack'],
            include: path.resolve(__dirname, './src/')
      }
    ],

    }
}
