import React, { useState, useEffect } from "react";
import Table from "../dummyComponents/Table";
import TableDataRow from "../dummyComponents/TableDataRow";
import StationaryComponets from "./../dummyComponents/StationaryComponents";
import axios from "axios";

export default function TableData() {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [searchCharacters, setSearchCharacters] = useState("");
    const [tableComponents, setTableComponents] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const cachedPage = JSON.parse(localStorage.getItem(`page${pageNumber}`));
        searchCharacters.length > 0 ? fetchSearch(searchCharacters) : displayPage(cachedPage);
    }, [pageNumber, searchCharacters]);

    useEffect(() => {
        createTableRows();
    }, [characters]);

    const displayPage = cachedPage => {
        if (cachedPage !== null) {
            setCharacters(cachedPage.components);
        } else {
            fetchPage();
        }
    };

    const changePage = (type, number) => {
        setSearchCharacters("");
        switch (type) {
            case "next":
                if (pageNumber < 9) setPageNumber(prevPageNumber => prevPageNumber + 1);
                break;
            case "previous":
                if (pageNumber > 1) setPageNumber(prevPageNumber => prevPageNumber - 1);
                break;
            case "number":
                setPageNumber(number);
                break;
        }
    };

    const fetchSearch = async searchCharacters => {
        setIsLoading(true);
        const searchResults = await axios
            .get(`https://swapi.dev/api/people/?search=${searchCharacters}`)
            .then(response => response.data.results);
        setAdditionalData(searchResults);
    };

    const fetchPage = async () => {
        const pageResults = await axios
            .get(`https://swapi.dev/api/people/?page=${pageNumber}`)
            .then(response => response.data.results)
            .catch(error => console.log(error));
        setAdditionalData(pageResults);
    };

    const setAdditionalData = async results => {
        for (let character of results) {
            character = formatData(character);
            character.speciesName = await fetchSpecies(character);
            character.homeworldName = await fetchHomeworld(character);
        }
        cachePage(results);
        setCharacters([...results]);
    };

    const formatData = character => {
        character.heightFormatted = formatHeight(character);
        character.weight = formatWeight(character);
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
        let newComponents = characters.map(person => {
            return <TableDataRow character={person} key={person.name} />;
        });
        setTableComponents([...newComponents]);
        setIsLoading(false);
    };

    const cachePage = newPageComponents => {
        if (searchCharacters.length < 1) {
            const storageItem = {
                pageNumber: pageNumber,
                components: newPageComponents,
            };
            localStorage.setItem(`page${pageNumber}`, JSON.stringify(storageItem));
        }
    };

    const handleSearch = searched => {
        setSearchCharacters(searched);
    };

    if (isLoading) {
        return <StationaryComponets changePage={changePage} handleSearch={handleSearch} />;
    } else {
        return (
            <div>
                <StationaryComponets changePage={changePage} handleSearch={handleSearch} />
                {searchCharacters === "" ? (
                    <h4 style={{ color: "#fee71e", marginTop: 20 }}>page: {pageNumber}</h4>
                ) : null}
                <Table rows={tableComponents} />
            </div>
        );
    }
}
