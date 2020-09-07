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
    let height;
    isNaN(feet) && isNaN(inches) ? (height = "unknown") : (height = `${feet}' ${inches}"`);

    return (
        <tr className="altFont">
            <td>{props.character.name}</td>
            <td>{props.character.birth_year}</td>
            <td>{height}</td>
            <td>{weight}</td>
            <td>{props.character.homeworldName}</td>
            <td>{props.character.speciesName}</td>
        </tr>
    );
}

export default TableDataRow;
