"use strict";
exports.__esModule = true;
exports.jokes = void 0;
var axios_1 = require("axios");
var countriesAPI = 'https://restcountries.com/v3.1/all';
var Country = function (officialName, capital, region, language, population, flag) {
    return "<tr>\n        <td>".concat(officialName, "</td>\n        <td>").concat(capital, "</td>\n        <td>").concat(region, "</td>\n        <td>").concat(language, "</td>\n        <td>").concat(population, "</td>\n        <td> <img src=\"").concat(flag, "\" alt=\"Flag of ").concat(officialName, "\"></td>\n    </tr>");
};
exports.jokes = {
    getCountries: function () {
        return new Promise(function (resolve, reject) {
            axios_1["default"].get(countriesAPI)
                .then(function (res) {
                resolve(res.data);
            });
        });
    }
};
