import axios from "axios";

const countriesAPI = 'https://restcountries.com/v3.1/all'

const Country = (officialName:string, capital:string, region:string, language:string, population:number, flag:string) => {
    return `<tr>
        <td>${officialName}</td>
        <td>${capital}</td>
        <td>${region}</td>
        <td>${language}</td>
        <td>${population}</td>
        <td> <img src="${flag}" alt="Flag of ${officialName}"></td>
    </tr>`
} 

export const jokes = {
    getCountries: function () {
        return new Promise((resolve, reject) =>{
            axios.get(countriesAPI)
            .then(res => {
                resolve(res.data)
            })
        })
    }
}