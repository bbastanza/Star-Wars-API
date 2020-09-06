import React, { useState, useEffect } from "react";
import TableDataRow from "./../dummyComponents/TableDataRow";
import Axios from "axios";

function TableData(props) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableComponents, setTableComponents] = useState([]);
    const recievedData = isLoading === false;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // delete previous components
        setIsLoading(true);
        setTableComponents([...tableComponents, ""]);
        setCharacters([]);
        fetchData();
    }, [props.pageNumber]);

    useEffect(() => {
        createTableRows();
    }, [recievedData]);

    const fetchData = async () => {
        const data = await fetch(`https://swapi.dev/api/people?search=a&page=${props.pageNumber}`).then(response =>
            response.json()
        );
        let allCharacters = data.results;

        for (const character of allCharacters) {
            const homeWorldUrl = character.homeworld;
            const planet = await fetch(homeWorldUrl).then(response => response.json());

            const speciesUrls = character.species;
            let species = "Human";
            if (speciesUrls.length > 0) {
                const speciesObject = await fetch(speciesUrls[0]).then(response => response.json());
                species = speciesObject.name;
            }

            character.homePlanet = planet.name;
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
