import React, { useState, useEffect } from "react";
import Table from "./../dummyComponents/Table";
import TableDataRow from "./../dummyComponents/TableDataRow";
import Buttons from "./../dummyComponents/Buttons";
import axios from "axios";
import SearchBar from "../dummyComponents/SearchBar";
import blueSaber from "./../Images/blueLightsaber.png";

export default function TableData() {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableComponents, setTableComponents] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchCharacters, setSearchCharacters] = useState("");

    useEffect(() => {
        setIsLoading(true);
        searchCharacters.length < 1 ? fetchPage() : fetchSearch(searchCharacters);
    }, [pageNumber, searchCharacters]);

    useEffect(() => {
        if (!isLoading) createTableRows();
    }, [isLoading]);

    const nextPage = () => {
        if (pageNumber < 9) setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1) setPageNumber(prevPageNumber => prevPageNumber - 1);
    };
    const fetchSearch = async searchCharacters => {
        const searchResult = await axios
            .get(`https://swapi.dev/api/people/?search=${searchCharacters}`)
            .then(response => response.data.results);
        for (let character of searchResult) {
            character = formatData(character);
            character.speciesName = await fetchSpecies(character);
            character.homeworldName = await fetchHomeworld(character);
        }
        setCharacters([...searchResult]);
        setIsLoading(false);
    };
    const fetchPage = async () => {
        const returnedCharacters = await axios
            .get(`https://swapi.dev/api/people/?page=${pageNumber}`)
            .then(response => response.data.results)
            .catch(error => console.log(error));
        for (let character of returnedCharacters) {
            character = formatData(character);
            character.speciesName = await fetchSpecies(character);
            character.homeworldName = await fetchHomeworld(character);
        }
        setCharacters([...returnedCharacters]);
        setIsLoading(false);
    };

    const formatData = character => {
        character.heightFormatted = formatHeight(character);
        character.weight = formatWeight(character);
        character.id = Math.random();
        return character;
    };

    const formatHeight = character => {
        let feet = Math.floor((character.height * 0.3937008) / 12);
        let inches = Math.round((character.height * 0.3937008) % 12);
        if (inches === 12) {
            feet += 1;
            inches = 0;
        }
        return isNaN(feet) && isNaN(inches) ? "unknown" : `${feet}' ${inches}"`;
    };

    const formatWeight = character => {
        return isNaN(Math.floor(character.mass * 2.204623)) ? "unknown" : Math.floor(character.mass * 2.204623);
    };

    const fetchSpecies = character => {
        let species = "Human";
        if (character.species.length > 0) {
            species = axios
                .get(character.species[0])
                .then(response => response.data.name)
                .catch(error => console.log(error));
        }
        return species;
    };

    const fetchHomeworld = character => {
        return axios
            .get(character.homeworld)
            .then(response => response.data.name)
            .catch(error => console.log(error));
    };

    const createTableRows = () => {
        let newComponets = characters.map(person => {
            return <TableDataRow character={person} key={person.id} />;
        });
        setTableComponents([...newComponets]);
    };
    const handleSearch = searched => {
        setSearchCharacters(searched);
    };

    const stationaryComponets = (
        <div>
            <SearchBar handleSearch={handleSearch} />
            <img src={blueSaber} style={{ height: 60, width: 700 }} alt="lightsaber" />
            <Buttons nextPage={nextPage} prevPage={prevPage} />
        </div>
    );

    if (isLoading) {
        return <div>{stationaryComponets}</div>;
    } else {
        return (
            <div>
                {stationaryComponets}
                <Table rows={tableComponents} />
            </div>
        );
    }
}
