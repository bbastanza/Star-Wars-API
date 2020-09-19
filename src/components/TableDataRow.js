import React from "react";

function TableDataRow({ character }) {
    return (
        <tr className="altFont">
            <td>{character.name}</td>
            <td>{character.birth_year}</td>
            <td>{character.heightFormatted}</td>
            <td>{character.weight}</td>
            <td>{character.homeworldName}</td>
            <td>{character.speciesName}</td>
        </tr>
    );
}

export default TableDataRow;
