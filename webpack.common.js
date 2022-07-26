const path = require("path");

module.exports = {
    entry: {
      main: "./src/index.js"
    },
    module: {
      rules: [
        {
        test: /\.html$/,
        use: ["html-loader"]
        }
      ]
    }
};