import React, { memo } from "react";

function HeaderRow() {
    return (
        <thead>
            <tr className="table-warning" style={{ color: "black" }}>
                <th>Name</th>
                <th>Birthdate</th>
                <th>Height</th>
                <th>Weight (lb)</th>
                <th>Home Planet</th>
                <th>Species</th>
            </tr>
        </thead>
    );
}

export default memo(HeaderRow);
