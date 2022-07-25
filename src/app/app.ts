import axios from "axios";
import { modal  as  TingleModal}from "tingle.js";

const modal = new TingleModal();
let countrieslist = []
// const pageSize = 50;
// let curPage = 1;

const countriesAPI = 'https://restcountries.com/v3.1/'
const wikiAPI = `https://en.wikipedia.org/api/rest_v1/page/summary/`




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
    getCountries: function (){
            axios.get(countriesAPI + "all")
            .then(res => {       
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
                    return column
                });
                countrieslist = formatedCountries.sort((a, b) =>{
                    return a.name.localeCompare(b.name)
                })
                renderCountries(countrieslist)
                addModal()
            })
        }
    }


export const renderCountries =  function (countries){
        const cont = document.getElementById('countries-container-body')
        let nodes:HTMLTableRowElement[] = []
        for(let country of countries){
            let column = document.createElement('tr')
            column.innerHTML= Country(
                country.name,
                country.capital,
                country.region,
                country.languages,
                country.population,
                country.flag
                )
                nodes.push(column)
        }
        cont!.replaceChildren(...nodes)
}

const button = document.getElementById('btn');
button?.addEventListener('change', (e)=>{
    renderCountries(countrieslist.reverse())
})


const addModal = function(){
    const tableRows = document.querySelectorAll('tr')
    tableRows.forEach(element => {
        element.addEventListener('click', (e)=>{
            modal.setContent('<h1>Hello</h1>')
            modal.open()
        })
    });
}
    