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

export const countriesData = {
    getCountries: function () {
        return new Promise((resolve, reject) =>{
            axios.get(countriesAPI)
            .then(res => {
                resolve(res.data)           
                const countries = res.data
                const formatedCountries = countries.map((country) => {
                    const languagesObject: string | object = country.languages
                    const languages :string = languagesObject ? (Object.values(languagesObject).join(', ')) : "No language to display"
                    const column = {
                        name: country.name.official,
                        capital: country.capital,
                        region: country.region,
                        languages,
                        population: country.population,
                        flag : country.flags.png
                    }
                    addCountry(column);
                    return column
                });
                console.log(formatedCountries)
            })
        })
    }
}

export const addCountry =  function (country){
        const cont = document.getElementById('countries-container-body')
        let column = document.createElement('tr')
        column.innerHTML= Country(
            country.name,
            country.capital,
            country.region,
            country.languages,
            country.population,
            country.flag
        )
        cont!.appendChild(column)
    }
