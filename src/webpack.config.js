var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var production = (process.env.NODE_ENV === 'production');

var config = {
    bail: true,
    devtool: 'source-map',
    entry: ['./app/client.js', './styles/main.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: `[name]${production ? '-[chunkhash]' : ''}.js`
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react', 'stage-1'],
                        plugins: ['transform-decorators-legacy']
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true, minimize: (process.env.NODE_ENV === 'production') } },
                        { loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [autoprefixer({
                                    browsers: ['last 2 versions', 'ie >= 10', 'ios >= 9', 'Android >= 4']
                                })]
                            }
                        },
                        'resolve-url-loader',
                        { loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                outputStyle: 'compressed'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin(`[name]${production ? '-[chunkhash]' : ''}.css`),
        new ManifestPlugin()
    ]
};

if (production) {
    config.plugins.push(new WebpackMd5Hash());
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            comments: false,
            compress: {
                warnings: false,
                comparisons: false,
                screw_ie8: true
            }
        })
    );
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    );
}

module.exports = config;
