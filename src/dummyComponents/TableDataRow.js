import React from "react";

function TableDataRow(props) {
    return (
        <tr className="altFont">
            <td>{props.character.name}</td>
            <td>{props.character.birth_year}</td>
            <td>{props.character.heightFormatted}</td>
            <td>{props.character.weight}</td>
            <td>{props.character.homeworldName}</td>
            <td>{props.character.speciesName}</td>
        </tr>
    );
}

export default TableDataRow;
