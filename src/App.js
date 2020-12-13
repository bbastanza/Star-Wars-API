import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Table from "./components/Table";
import TableDataRow from "./components/TableDataRow";
import StationaryComponets from "./components/StationaryComponents";
import Messages from "./components/Messages";
import axios from "axios";
import { formatData } from "./functions/format";
import { checkDateCreated } from "./functions/checkDateCreated";

export default function App() {
    const [characters, setCharacters] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const prevPageNumber = usePrevious(pageNumber);
    const [searchCharacter, setSearchCharacter] = useState("");
    const previousSearchCharacter = usePrevious(searchCharacter);

    window.onload = () => {
        const cachedPage = JSON.parse(localStorage.getItem(`page${pageNumber}`));
        checkDateCreated();
        displayPage(cachedPage);
    };

    useEffect(() => {
        if (previousSearchCharacter !== searchCharacter) {
            if (searchCharacter.length > 0) fetchSearch(searchCharacter);
            else backToPage();
        } else if (prevPageNumber !== pageNumber) {
            const cachedPage = JSON.parse(localStorage.getItem(`page${pageNumber}`));
            displayPage(cachedPage);
        }
    });

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    function displayPage(cachedPage) {
        cachedPage === null ? fetchPage() : setCharacters(cachedPage.components);
    }

    function changePage(type, number) {
        setSearchCharacter("");
        switch (type) {
            case "next":
                if (pageNumber < 9) setPageNumber(prevPageNumber => prevPageNumber + 1);
                break;
            case "previous":
                if (pageNumber > 1) setPageNumber(prevPageNumber => prevPageNumber - 1);
                break;
            default:
                setPageNumber(number);
                break;
        }
    }

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
            const httpsSpecies = `https${character.species[0].substring(4)}`;
            species = axios
                .get(httpsSpecies)
                .then(response => response.data.name)
                .catch(error => console.log(error));
        }
        return species;
    }

    function fetchHomeworld(character) {
        const httpsHomeworld = `https${character.homeworld.substring(4)}`;
        return axios
            .get(httpsHomeworld)
            .then(response => response.data.name)
            .catch(error => console.log(error));
    }

    function cachePage(newPageComponents) {
        if (searchCharacter.length < 1) {
            const storageItem = {
                pageNumber: pageNumber,
                components: newPageComponents,
            };
            localStorage.setItem(`page${pageNumber}`, JSON.stringify(storageItem));
        }
        if (pageNumber === 1) localStorage.setItem("date-created", JSON.stringify(new Date().getTime()));
        setIsFetching(false);
    }

    function backToPage() {
        setSearchCharacter("");
        const cachedPage = JSON.parse(localStorage.getItem(`page${pageNumber}`));
        displayPage(cachedPage);
    }

    if (isFetching) {
        return (
            <div className="App">
                <StationaryComponets
                    isLoading={isFetching}
                    changePage={changePage}
                    handleSearch={searched => setSearchCharacter(searched)}
                />
                <Messages pageNumber={pageNumber} />
            </div>
        );
    } else {
        return (
            <div className="App">
                <StationaryComponets
                    onSearch={searchCharacter !== ""}
                    changePage={changePage}
                    handleSearch={searched => setSearchCharacter(searched)}
                    backToPage={backToPage}
                />
                {searchCharacter === "" ? <h4 style={{ color: "#fee71e", marginTop: 20 }}>Page: {pageNumber}</h4> : null}
                <Table rows={characters.map(person => <TableDataRow character={person} key={person.name} />)} />
            </div>
        );
    }
}
