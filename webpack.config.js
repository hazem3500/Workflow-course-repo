const path = require('path');
const babel = require('babel-core');

module.exports = {
    entry: './app/assets/scripts/app.js',
    output: {
        path: path.resolve(__dirname, './app/temp/scripts'),
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};
