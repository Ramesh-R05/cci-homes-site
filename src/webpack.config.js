const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const production = process.env.NODE_ENV === 'production';
const isDebug = process.env.APP_DEBUG === 'true';

if (isDebug) {
    process.traceDeprecation = true;
}

const config = {
    bail: true,
    cache: false,
    devtool: 'source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr',
        './app/client.js',
        './styles/main.scss'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: `[name]${production ? '-[chunkhash]' : ''}.js`,
        hotUpdateChunkFilename: '[id].[hash].hot-update.js',
        hotUpdateMainFilename: '[hash].hot-update.json'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            /* 
                ensure there is only one instance of react when resolving modules 
                this helps with symlinks
            */
            react: path.join(__dirname, 'node_modules/react')
        }
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
                use: [
                    {
                        loader: 'css-hot-loader'
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false, // Enabling this adds around 30 seconds to build time
                            minimize: production
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            plugins: () => [
                                autoprefixer({
                                    browsers: ['last 2 versions', 'ie >= 10', 'ios >= 9', 'Android >= 4']
                                })
                            ]
                        }
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false, // Enabling this adds around 40 seconds to build time
                            outputStyle: 'compressed'
                        }
                    }
                ]
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
        new MiniCssExtractPlugin({
            fileName: `[name]${production ? '-[contenthash]' : ''}.css`
        }),
        new ManifestPlugin({
            publicPath: '',
            writeToFileEmit: true // This removes the /dist/ prefix so that @bxm/server/lib/index.js can load properly
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};

if (production) {
    config.plugins.push(
        new UglifyJsPlugin({
            sourceMap: false, // Enabling this will add around 8 seconds to build time
            parallel: true,
            uglifyOptions: {
                beautify: false,
                mangle: false, // Enabling this will add around 3 seconds to build time
                compress: false // Enabling this will add around 20 seconds to build time
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
