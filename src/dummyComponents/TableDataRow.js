import React from "react";

function TableDataRow(props) {
    const weight = isNaN(Math.floor(props.character.mass * 2.204623))
        ? "unknown"
        : Math.floor(props.character.mass * 2.204623);

    let feet = Math.floor((props.character.height * 0.3937008) / 12);
    let inches = Math.round((props.character.height * 0.3937008) % 12);
    if (inches === 12) {
        feet += 1;
        inches = 0;
    }
    const height = isNaN(feet) && isNaN(inches) ? "unknown" : `${feet}' ${inches}"`;

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
