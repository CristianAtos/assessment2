const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
var HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js", 
        path: path.resolve(__dirname, "dist"), 
      },
      plugins: [ 
        new HtmlWebpackPlugin(
            {template:"./src/template.html", inject:"body"
          })
        ],
        module: {
        rules: [
            {
            test: /\.scss$/,
            use: [
                "style-loader", //3rd Extract css into files
                "css-loader",  //2nd Turn css into commonjs
                "sass-loader" //1st Turn sass into css
            ] 
            }
        ]
        }
});