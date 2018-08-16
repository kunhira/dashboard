const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require("autoprefixer");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {

    mode:'development',//必須

    devtool:'eval-source-map',//ソースマップのオプション選択

    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname + '/dist'),
        filename:'main.js'
    },
    devServer:{
        contentBase: path.resolve(__dirname + '/dist')
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                use:{
                    loader:'vue-loader',
                }
            },
            {
                //css-loaderの設定
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader', 
                        options: {
                            url: false,
                        }
                    },'sass-loader',
                    { 
                        loader : 'postcss-loader',
                        options:{
                            plugins:function(){
                                return[
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }],
                })
            },
            {
                //url-loader,file-loaderの設定
                test: /\.(jpe?g|png|gif|svg|ico)(\?.+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1192,
                        name: './img/[name].[ext]'
                    }
                }
            },
            {
                test:/\.js$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                          ['env', {'modules': false}]
                        ]
                    }
          
                }
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
          vue$: 'vue/dist/vue.esm.js',
        },
    },
    plugins:[
        new ExtractTextPlugin('css/style.css'),
        new VueLoaderPlugin()
    ]

};