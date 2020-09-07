import React, { useState, useEffect } from "react";
import TableDataRow from "./../dummyComponents/TableDataRow";
import axios from "axios";

function TableData(props) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableComponents, setTableComponents] = useState([]);
    const empty = [];

    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        // delete previous components
        setIsLoading(true);
        setTableComponents([...tableComponents, ...empty]);
        setCharacters(...characters, ...empty);
        fetchData();
    }, [props.pageNumber]);

    useEffect(() => {
        if (!isLoading) createTableRows();
    }, [isLoading]);

    const fetchData = async () => {
        const allCharacters = await axios
            .get(`https://swapi.dev/api/people?search=a&page=${props.pageNumber}`)
            .then(response => response.data.results)
            .catch(error => console.log(error));

        for (const character of allCharacters) {
            character.homeworldName = await axios
                .get(character.homeworld)
                .then(response => response.data.name)
                .catch(error => console.log(error));

            let species = "Human";
            if (character.species.length > 0) {
                species = await axios
                    .get(character.species[0])
                    .then(response => response.data.name)
                    .catch(error => console.log(error));
            }
            character.speciesName = species;
            character.id = Math.random();
        }
        setCharacters([...characters, ...allCharacters]);
        setIsLoading(false);
    };

    const createTableRows = () => {
        let newComponets = characters.map(person => {
            return <TableDataRow character={person} key={person.id} />;
        });
        setTableComponents([...tableComponents, ...newComponets]);
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
