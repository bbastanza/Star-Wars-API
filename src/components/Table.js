import React from "react";
import HeaderRow from "./HeaderRow";

export default function Table({ rows }) {
    return (
        <div>
            <table
                style={{ width: "80%", padding: 10, marginTop: 15 }}
                className="table table-dark table-striped margin-top table-hover shadows"
            >
                <HeaderRow />
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
