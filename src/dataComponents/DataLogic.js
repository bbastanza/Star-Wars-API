import React, { useState, useEffect, useRef } from "react";
import Table from "../dummyComponents/Table";
import TableDataRow from "../dummyComponents/TableDataRow";
import StationaryComponets from "./../dummyComponents/StationaryComponents";
import axios from "axios";
import { formatData } from "./format";
import { checkDateCreated } from "./checkDateCreated";
// import { changePage } from "./chagePage";
// export { pageNumber, setPageNumber, setSearchCharacter };

export default function TableData() {
    const [characters, setCharacters] = useState([]);
    const previousCharacters = usePrevious(characters);
    const [isFetching, setIsFetching] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const prevPageNumber = usePrevious(pageNumber);
    const [searchCharacter, setSearchCharacter] = useState("");
    const previousSearchCharacter = usePrevious(searchCharacter);
    const [tableComponents, setTableComponents] = useState([]);
    const [loadingMessage, setLoadingMessage] = useState("I sense much fear in you");

    window.onload = () => {
        const cachedPage = JSON.parse(localStorage.getItem(`page${pageNumber}`));
        checkDateCreated();
        displayPage(cachedPage);
    };

    useEffect(() => {
        if (previousCharacters !== characters) {
            changeLoadingMessage();
            createTableRows();
        } else if (previousSearchCharacter !== searchCharacter) {
            if (searchCharacter.length > 0) fetchSearch(searchCharacter);
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

    function createTableRows() {
        let newComponents = characters.map(person => {
            return <TableDataRow character={person} key={person.name} />;
        });
        setTableComponents([...newComponents]);
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

    function handleSearch(searched) {
        setSearchCharacter(searched);
    }

    function changeLoadingMessage() {
        const messages = [
            "I find your lack of faith disturbing",
            "The Force will be with you. Always",
            "Do. Or do not. There is no try",
            "I sense much fear in you",
            "We must keep our faith in the Republic",
            "Chewie, we’re home",
            "I’m one with the Force. The Force is with me",
            "I am a Jedi, like my father before me",
            "When gone am I, the last of the Jedi will you be",
            "This ship that made the Kessel run in less than twelve parsecs",
        ];
        const i = Math.floor(Math.random() * messages.length);
        setLoadingMessage(messages[i]);
    }

    if (isFetching) {
        return (
            <div>
                <StationaryComponets changePage={changePage} handleSearch={handleSearch} />
                <button style={{ marginTop: 60, padding: 20, fontSize: 30 }} className="btn btn-warning">
                    {loadingMessage}
                    <span className="spinner-grow spinner-grow-sm"></span>
                </button>
            </div>
        );
    } else {
        return (
            <div>
                <StationaryComponets changePage={changePage} handleSearch={handleSearch} />
                {searchCharacter === "" ? (
                    <h4 style={{ color: "#fee71e", marginTop: 20 }}>page: {pageNumber}</h4>
                ) : null}
                <Table rows={tableComponents} />
            </div>
        );
    }
}
