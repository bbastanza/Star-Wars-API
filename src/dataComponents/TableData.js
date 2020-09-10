import React, { useState, useEffect } from "react";
import TableDataRow from "./../dummyComponents/TableDataRow";
import axios from "axios";

function TableData(props) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableComponents, setTableComponents] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        props.loading();
        fetchData();
    }, [props.pageNumber]);

    useEffect(() => {
        if (!isLoading) createTableRows();
    }, [isLoading]);

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

    const fetchHomeworld = character => {
        return axios
            .get(character.homeworld)
            .then(response => response.data.name)
            .catch(error => console.log(error));
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

    const fetchData = async () => {
        const returnedCharacters = await axios
            .get(`https://swapi.dev/api/people/?page=${props.pageNumber}`)
            .then(response => response.data.results)
            .catch(error => console.log(error));
        for (const character of returnedCharacters) {
            character.weight = formatWeight(character);
            character.heightFormatted = formatHeight(character);
            character.id = Math.random();
            character.speciesName = await fetchSpecies(character);
            character.homeworldName = await fetchHomeworld(character);
        }
        setCharacters([...returnedCharacters]);
        setIsLoading(false);
    };

    const createTableRows = () => {
        let newComponets = characters.map(person => {
            return <TableDataRow character={person} key={person.id} />;
        });
        setTableComponents([...newComponets]);
        props.doneLoading();
    };

    if (isLoading) {
        return (
            <tbody>
                <tr></tr>
            </tbody>
        );
    } else return <tbody>{tableComponents}</tbody>;
}

export default TableData;
