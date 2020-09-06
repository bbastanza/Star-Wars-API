import React from "react";
import "./../App.css";
import HeaderRow from "./../dummyComponents/HeaderRow";
import TableData from "./TableData";

function Table(props) {
    let isLoading = props.isLoading;
    if (isLoading) {
        return <h1>I am your Father</h1>;
    } else {
        return (
            <div>
                <table style={{ width: "70%" }} className="table table-dark table-striped margin-top table-hover">
                    <HeaderRow />
                    <TableData isLoading={true} />
                </table>
            </div>
        );
    }
}

export default Table;
