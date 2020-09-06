import React from "react";

function TableDataRow(props) {
    let weight = Math.floor(props.character.mass * 2.204623);
    if (isNaN(weight)) weight = "unknown";
    let feet = Math.floor((props.character.height * 0.3937008) / 12);
    let inches = Math.round((props.character.height * 0.3937008) % 12);
    if (inches === 12) {
        feet += 1;
        inches = 0;
    }
    return (
        <tr className="altFont">
            <td>{props.character.name}</td>
            <td>{props.character.birth_year}</td>
            <td>
                {feet}' {inches}"
            </td>
            <td>{weight}</td>
            <td>{props.character.homePlanet}</td>
            <td>{props.character.speciesName}</td>
        </tr>
    );
}

export default TableDataRow;
