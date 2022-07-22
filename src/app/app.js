"use strict";
exports.__esModule = true;
exports.addCountry = exports.countriesData = void 0;
var axios_1 = require("axios");
var countriesAPI = 'https://restcountries.com/v3.1/all';
var Country = function (officialName, capital, region, language, population, flag) {
    return "<tr>\n        <td>".concat(officialName, "</td>\n        <td>").concat(capital, "</td>\n        <td>").concat(region, "</td>\n        <td>").concat(language, "</td>\n        <td>").concat(population, "</td>\n        <td> <img src=\"").concat(flag, "\" alt=\"Flag of ").concat(officialName, "\"></td>\n    </tr>");
};
exports.countriesData = {
    getCountries: function () {
        return new Promise(function (resolve, reject) {
            axios_1["default"].get(countriesAPI)
                .then(function (res) {
                resolve(res.data);
                var countries = res.data;
                var formatedCountries = countries.map(function (country) {
                    var languagesObject = country.languages;
                    var languages = languagesObject ? (Object.values(languagesObject).join(', ')) : "No language to display";
                    var column = {
                        name: country.name.official,
                        capital: country.capital,
                        region: country.region,
                        languages: languages,
                        population: country.population,
                        flag: country.flags.png
                    };
                    (0, exports.addCountry)(column);
                    return column;
                });
                console.log(formatedCountries);
            });
        });
    }
};
var addCountry = function (country) {
    var cont = document.getElementById('countries-container-body');
    var column = document.createElement('tr');
    column.innerHTML = Country(country.name, country.capital, country.region, country.languages, country.population, country.flag);
    cont.appendChild(column);
};
exports.addCountry = addCountry;
