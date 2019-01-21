module.exports = {
    mode: 'development',
    entry: './src/js/app.js',
    output: {
        path: __dirname+'/dist',
        filename: 'bundle.js'
    },
    module:{
        rules:[
            {test:/\.css$/, 
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
        ]
    },
    {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
]
}
}