/**
 * Created by naimi on 2/9/17.
 */
var path = require('path');

module.exports = {
    entry: __dirname + "/app/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve:{
        alias: {
            AppDispatcher: __dirname + '/app/flux/dispatcher/AppDispatcher.js',
            AppRegister: __dirname + '/app/flux/dispatcher/AppRegister.js',
            BaseStore: __dirname + '/app/flux/core/BaseStore.js',

            AuthentificationContainer: __dirname + '/app/components/Authentication/AuthentificationContainer.js',
            AuthentificationConstants: __dirname + '/app/flux/constants/AuthentificationConstants.js',
            AuthentificationActionsCreator: __dirname + '/app/flux/actions/AuthentificationActionsCreator.js',
            AuthenticationStore: __dirname + '/app/flux/stores/AuthenticationStore.js'
        }
    },
    devServer: {
        inline: true,
        port: 3333
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
               test: /\.js?$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               query: {
                    presets: ["es2015", "stage-0","react"]
                }
            },
            // These to include bootstrap and other css framework
            { test: /\.css$/,
              loader: "style-loader!css-loader"
            },
            {
              test   : /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
              loader : 'file-loader'
            }
        ]
    }
};
