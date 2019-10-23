const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const isDebug = process.argv.indexOf('--debug') !== -1;

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, 'src/index.ts')
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle/[name].[hash].js',
        publicPath: '/',
        crossOriginLoading: 'anonymous'
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
                                            '--screen-xxs': 'screen and (max-width: 29.99em)',
                                            '--screen-xs': 'screen and (min-width: 30em) and (max-width: 39.99em)',
                                            '--screen-sm': 'screen and (min-width: 40em) and (max-width: 83.99em)',
                                            '--screen-md': 'screen and (min-width: 84em) and (max-width: 88.99em)',
                                            '--screen-lg': 'screen and (min-width: 89em) and (max-width: 119.99em)',
                                            '--screen-xlg': 'screen and (min-width: 120em)',
                                            '--screen-sm-to-xs': 'screen and (min-width: 30em) and (max-width: 83.99em)',
                                            '--screen-xs-down': 'screen and (max-width: 39.99em)',
                                            '--screen-sm-down': 'screen and (max-width: 83.99em)',
                                            '--screen-md-down': 'screen and (max-width: 88.99em)',
                                            '--screen-lg-down': 'screen and (max-width: 119.99em)',
                                            '--screen-xs-up': 'screen and (min-width: 30em)',
                                            '--screen-sm-up': 'screen and (min-width: 40em)',
                                            '--screen-md-up': 'screen and (min-width: 84em)',
                                            '--screen-lg-up': 'screen and (min-width: 89em)'
                                        }
                                    }
                                }),
                                require('postcss-mq-optimize'),
                                require('postcss-pxtorem')({
                                    rootValue: 16,
                                    propList: [
                                        'font',
                                        'font-size',
                                        'line-height',
                                        'letter-spacing',
                                        'margin',
                                        'padding',
                                        'width',
                                        'min-width',
                                        'height',
                                        'min-height',
                                        'border-radius'
                                    ],
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
        new webpack.DefinePlugin({
            'process.env.DEBUG': isDebug,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        new CleanWebpackPlugin(),

        /**
         * HTML
         */
        new SriPlugin({
            hashFuncNames: ['sha256', 'sha384'],
            enabled: process.env.NODE_ENV === 'production'
        }),

        new HtmlWebpackPlugin({
            template: 'html/index.html',
            minify: !isDebug
                ? {
                      collapseWhitespace: true,
                      removeComments: true
                  }
                : false
        }),

        /**
         * CSS
         */
        new MiniCssExtractPlugin({
            filename: 'bundle/[name].[hash].css',
            chunkFilename: '[id].[hash].css'
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
        // new CopyPlugin([{ from: 'html/', test: /\.html$/ }]),

        /**
         * Assets
         */
        new CopyPlugin([{ from: 'assets/', to: 'assets' }]),

        /**
         * CNAME
         */
        new CopyPlugin([{ from: 'CNAME', to: '.' }]),

        /**
         * SEO files
         */
        new CopyPlugin([{ from: 'robots.txt', to: '.' }]),
        new CopyPlugin([{ from: 'sitemap.xml', to: '.' }])
    ]
};
