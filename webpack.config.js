const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/index.ts')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle/[name].js'
    },

    devtool: isDevelopment && 'source-map',

    devServer: {
        host: '0.0.0.0',
        port: 3002,
        open: true,
        contentBase: path.join(__dirname, 'dist')
    },

    module: {
        rules: [
            /**
             * TS
             */
            {
                test: /\.ts$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'ts-loader'
                }
            },

            /**
             * CSS
             */
            {
                test: /\.(css|pcss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',

                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',

                        options: {
                            sourceMap: isDevelopment,
                            plugins: () => [
                                require('postcss-mixins')({
                                    mixinsFiles: [
                                        path.join(__dirname, 'src', 'mixin', '*.pcss'),
                                        path.join(__dirname, 'src', 'mixin', '*.js')
                                    ],
                                    mixins: {
                                        test: function(mixin, dir) {
                                            console.log(arguments);
                                            console.log('-');
                                            console.log(dir);
                                            return {
                                                '&': {
                                                    'border-raidus': '44px'
                                                }
                                            };
                                        }
                                    }
                                }),
                                require('postcss-map')({
                                    basePath: 'src/',
                                    maps: ['variables/colors.yml']
                                }),
                                require('postcss-simple-vars')({
                                    variables: {
                                        ...require('./src/variables/fonts.json'),
                                        ...require('./src/variables/grid.json')
                                    }
                                }),
                                require('postcss-assets'),
                                require('postcss-import')({
                                    root: 'src'
                                }),
                                require('postcss-nested-ancestors'),
                                require('postcss-nested'),
                                require('postcss-custom-properties')({
                                    preserve: false,
                                    importFrom: 'src/'
                                }),
                                require('postcss-calc'),
                                require('postcss-color-function'),
                                require('postcss-custom-media')({
                                    importFrom: {
                                        customMedia: {
                                            '--screen-xxs': 'screen and (max-width: 29.99rem)',
                                            '--screen-xs': 'screen and (min-width: 30rem) and (max-width: 39.99rem)',
                                            '--screen-sm': 'screen and (min-width: 40rem) and (max-width: 83.99rem)',
                                            '--screen-md': 'screen and (min-width: 84rem) and (max-width: 88.99rem)',
                                            '--screen-lg': 'screen and (min-width: 89rem) and (max-width: 119.99rem)',
                                            '--screen-xlg': 'screen and (min-width: 120rem)',
                                            '--screen-sm-to-xs': 'screen and (min-width: 30rem) and (max-width: 83.99rem)',
                                            '--screen-xs-down': 'screen and (max-width: 39.99rem)',
                                            '--screen-sm-down': 'screen and (max-width: 83.99rem)',
                                            '--screen-md-down': 'screen and (max-width: 88.99rem)',
                                            '--screen-lg-down': 'screen and (max-width: 119.99rem)',
                                            '--screen-xs-up': 'screen and (min-width: 30rem)',
                                            '--screen-sm-up': 'screen and (min-width: 40rem)',
                                            '--screen-md-up': 'screen and (min-width: 84rem)',
                                            '--screen-lg-up': 'screen and (min-width: 89rem)'
                                        }
                                    }
                                }),
                                require('postcss-mq-optimize'),
                                require('postcss-pxtorem')({
                                    rootValue: 10,
                                    replace: false,
                                    mediaQuery: true
                                }),
                                require('postcss-focus'),
                                require('autoprefixer')({
                                    browsers: ['last 2 versions']
                                }),
                                require('cssnano')({
                                    preset: ['default']
                                })
                            ]
                        }
                    }
                ]
            },

            /**
             * Images
             */
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    plugins: [
        /**
         * CSS
         */
        new MiniCssExtractPlugin({
            filename: 'bundle/[name].css',
            chunkFilename: '[id].css'
        }),
        !isDevelopment
            ? new OptimizeCssAssetsPlugin({
                  cssProcessorPluginOptions: {
                      preset: ['default', { discardComments: { removeAll: true } }]
                  }
              })
            : function() {},

        /**
         * HTML
         */
        new CopyPlugin([{ from: 'html/', test: /\.html$/ }]),

        /**
         * Assets
         */
        new CopyPlugin([{ from: 'assets/', to: 'assets' }])
    ]
};
