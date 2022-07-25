"use strict";
exports.__esModule = true;
exports.renderCountries = exports.countriesData = void 0;
var axios_1 = require("axios");
var tingle_js_1 = require("tingle.js");
var modal = new tingle_js_1.modal();
var countrieslist = [];
// const pageSize = 50;
// let curPage = 1;
var countriesAPI = 'https://restcountries.com/v3.1/';
var wikiAPI = "https://en.wikipedia.org/api/rest_v1/page/summary/";
var Country = function (officialName, capital, region, language, population, flag) {
    return "<tr>\n        <td>".concat(officialName, "</td>\n        <td>").concat(capital, "</td>\n        <td>").concat(region, "</td>\n        <td>").concat(language, "</td>\n        <td>").concat(population, "</td>\n        <td> <img src=\"").concat(flag, "\" alt=\"Flag of ").concat(officialName, "\"></td>\n    </tr>");
};
exports.countriesData = {
    getCountries: function () {
        axios_1["default"].get(countriesAPI + "all")
            .then(function (res) {
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
                return column;
            });
            countrieslist = formatedCountries.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
            (0, exports.renderCountries)(countrieslist);
            addModal();
        });
    }
};
var renderCountries = function (countries) {
    var _a;
    var cont = document.getElementById('countries-container-body');
    var nodes = [];
    for (var _i = 0, countries_1 = countries; _i < countries_1.length; _i++) {
        var country = countries_1[_i];
        var column = document.createElement('tr');
        column.innerHTML = Country(country.name, country.capital, country.region, country.languages, country.population, country.flag);
        nodes.push(column);
    }
    (_a = cont).replaceChildren.apply(_a, nodes);
};
exports.renderCountries = renderCountries;
var button = document.getElementById('btn');
button === null || button === void 0 ? void 0 : button.addEventListener('change', function (e) {
    (0, exports.renderCountries)(countrieslist.reverse());
});
var addModal = function () {
    var tableRows = document.querySelectorAll('tr');
    tableRows.forEach(function (element) {
        element.addEventListener('click', function (e) {
            modal.setContent('<h1>Hello</h1>');
            modal.open();
        });
    });
};
