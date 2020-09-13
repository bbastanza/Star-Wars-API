import axios from "axios";
import { formatData } from "./format";

async function fetchSearch(searchCharacters) {
    setIsFetching(true);
    const searchResults = await axios
        .get(`https://swapi.dev/api/people/?search=${searchCharacters}`)
        .then(response => response.data.results);
    setAdditionalData(searchResults);
}

async function fetchPage() {
    setIsFetching(true);
    const pageResults = await axios
        .get(`https://swapi.dev/api/people/?page=${pageNumber}`)
        .then(response => response.data.results)
        .catch(error => console.log(error));
    setAdditionalData(pageResults);
}

async function setAdditionalData(results) {
    for (let character of results) {
        character = formatData(character);
        character.speciesName = await fetchSpecies(character);
        character.homeworldName = await fetchHomeworld(character);
    }
    cachePage(results);
    setCharacters([...results]);
}

function fetchSpecies(character) {
    let species = "Human";
    if (character.species.length > 0) {
        species = axios
            .get(character.species[0])
            .then(response => response.data.name)
            .catch(error => console.log(error));
    }
    return species;
}

function fetchHomeworld(character) {
    return axios
        .get(character.homeworld)
        .then(response => response.data.name)
        .catch(error => console.log(error));
}

export { fetchSearch, fetchPage };
