import React, { useState } from "react";
import "./../App.css";
import HeaderRow from "./../dummyComponents/HeaderRow";
import TableData from "./TableData";

function Table() {
    const [pageNumber, setPageNumber] = useState(1);

    const nextPage = () => {
        if (pageNumber < 6) setPageNumber(prevPageNumber => prevPageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1) setPageNumber(prevPageNumber => prevPageNumber - 1);
    };

    const isLoading = () => {};

    return (
        <div>
            <button onClick={prevPage} className="btn btn-danger">
                Previous
            </button>
            <button onClick={nextPage} className="btn btn-danger">
                Next
            </button>

            <table
                style={{ width: "80%", padding: 10 }}
                className="table table-dark table-striped margin-top table-hover shadows"
            >
                <HeaderRow />
                <TableData pageNumber={pageNumber} isLoading={isLoading} />
            </table>
        </div>
    );
}

export default Table;
